import Web3 from 'web3';
import TranscriptContract from '../build/contracts/TranscriptContract.json';

class Blockchain{
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.accounts = null;
  }
  
  

  async initialize() {
    try {
      // Connect to local Ganache instance
      this.web3 = new Web3('http://127.0.0.1:8545');
      
      // Get accounts
      this.accounts = await this.web3.eth.getAccounts();

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
          data: TranscriptContract.bytecode
        });

        this.contract = await deploy.send({
          from: this.accounts[0],
          gas: 1500000
        });
      }

      return {
        web3: this.web3,
        contract: this.contract,
        accounts: this.accounts
      };
    } catch (error) {
      console.error('Blockchain initialization error:', error);
      throw error;
    }
  }

  async issueTranscript(cid) {
    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      const result = await this.contract.methods
        .issueTranscript(cid)
        .send({
          from: this.accounts[0],
          gas: 1500000,
          gasPrice,
        });
      
      // Return the transcriptId from the event
      const transcriptId = result.events.TranscriptIssued.returnValues.cid;
      console.log('TranscriptID: ', cid);
      return transcriptId;
    } catch (error) {
      console.error('Error issuing transcript:', error);
      throw error;
    }
  }



  
}

export default new Blockchain();