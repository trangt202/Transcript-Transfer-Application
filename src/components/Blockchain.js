import Web3 from 'web3';
import TranscriptContract from '../build/contracts/TranscriptContract.json';

class Blockchain{
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.accounts = null;
    
    //added
    this.adminAdr = null;
    this.verifierAdr = null;
  }
  
  

  async initialize() {
    try {
      // Connect to local Ganache instance
      this.web3 = new Web3('http://127.0.0.1:8545'); //comment this line
        
      
      //this.web3 = new Web3(window.ethereum); //uncomment this line
      // Get accounts
      this.accounts = await this.web3.eth.getAccounts();
      
      
      /* active account */
      //create: manually switch from account 0 (can create) to 1 (cannot create)
      //view: manually switch from 0 or 2 (can view) manually switch to 3 (cannot view)
      this.account = this.accounts[0]; 
      
      
      this.adminAdr = this.accounts[0]; //admin at index 0
      this.verifierAdr = this.accounts[2]; //verifier at index 2 
      
      
      
      console.log("Connected to account: ", this.account);

      // Deploy contract if not already deployed
      const networkId = await this.web3.eth.net.getId();
      const deployedNetwork = TranscriptContract.networks[networkId];

      if (deployedNetwork) {
        // Contract is already deployed
        this.contract = new this.web3.eth.Contract(
          TranscriptContract.abi,
          deployedNetwork.address
        );
      } else {
        // Deploy new contract
        const Contract = new this.web3.eth.Contract(TranscriptContract.abi);
        const deploy = Contract.deploy({
          data: TranscriptContract.bytecode,
        });

        this.contract = await deploy.send({
          from: this.adminAdr,
          gas: 1500000
        });
      }


      //set verifier
      await this.contract.methods
      .setVerifier(this.verifierAdr)
      .send({from: this.adminAdr});
      console.log('Verifier set: ', this.verifierAdr);
      

      
      
      //metamask
      //window.ethereum.on('accountsChanged', (accounts) => {
      //	this.account = accounts[0];
      //	console.log('Switched to account: ', this.account);
      //})
      
      

      return {
        web3: this.web3,
        contract: this.contract,
        accounts: this.accounts,
        
      };
    } catch (error) {
      console.error('Blockchain initialization error:', error);
      throw error;
    }
  }

  async issueTranscript(cid) {
    
    try {
    
      console.log("Trying to create transcript from account: ", this.account);
      
      const gasPrice = await this.web3.eth.getGasPrice();
      
      
      if(this.account !== this.adminAdr){
      	alert('Not authorized to create a transcript');
      	return;
      }
      
      
      const result = await this.contract.methods
        .issueTranscript(cid)
        .send({
          from: this.account,
          gas: 1500000,
          gasPrice,
        });
      
      // Return the transcriptId from the event
      const transcriptId = result.events.TranscriptIssued.returnValues.cid;
      console.log('TranscriptID: ', transcriptId);
      
      return transcriptId;
    } catch (error) {
      console.error('Error issuing transcript:', error);
      throw error;
    }
  }
  
  
  async viewTranscript(cid) {
    try {
    
    
      
      if(this.account !== this.adminAdr && this.account !== this.verifierAdr){
      	alert('Not authorized to view a transcript');
      	return;
      }
      
      const tr = await this.contract.methods
        .getTranscript(cid)
        .call({
          from: this.account,
        });

      console.log('Transcript: ', tr);
      return tr;
    } catch (error) {
      console.error('Error viewing transcript:', error);
      throw error;
    }
  }



  
}

export default new Blockchain();