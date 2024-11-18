//verify-web3.js
// Replace with your deployed contract's address
const Web3 = require('web3').default;
// Connect to Ethereum provider (update the URL if needed)

const web3 = new Web3('http://127.0.0.1:7546'); //run ganache-cli --port 7546 in terminal //network id is 5776

const contractAddress = '0x8F57Ece2bC8556f98FF5C8DfCc7857010AEC6B7f'; //manual
//const contractAddress = require('./build/contracts/TranscriptVerification.json').networks['5776'];


// Replace with your deployed contract's ABI
const contractABI = require('./build/contracts/TranscriptVerification.json').abi;
// Create a contract instance
const verifyContract = new web3.eth.Contract(contractABI, contractAddress);


// Example account (replace with a valid account from Ganache or your provider)
const account = '0x76211432DF3f0033F1811cD4D76CBD159886CE03'; //1st //manual



// Functions


async function getAccount() {
	try{
		const accounts = await web3.eth.getAccounts();
		return accounts[0]; //get first acccount
			
	}catch(error){
		console.error('Error getting account: ', error);
		throw error;
	}
};    


async function createTranscript(studentAddress, ipfsHash) {
    try {
    
        const tx = await verifyContract.methods.createTranscript(studentAddress, ipfsHash).send({
            from: account,
            gas: 500000,
            gasPrice: web3.utils.toWei('20', 'gwei')
        });
        console.log(`Transcript created for student ${studentAddress}. Transaction Hash: ${tx.transactionHash}`);
    } catch (error) {
        console.error('Error creating transcript:', error);
    }
}

// Function to authorize an entity (only callable by students)
async function authorizeEntity(entityAddress) {
    try {
    	
    	const account = await getAccount();
    	
        const tx2 = await verifyContract.methods.authorize(entityAddress).send({
            from: account,
            gas: 50000,
            gasPrice: web3.utils.toWei('20', 'gwei')
        });
        console.log(`Entity ${entityAddress} authorized. Transaction Hash: ${tx2.transactionHash}`);
    } catch (error) {
        console.error('Error authorizing entity:', error);
    }
}

// Function to verify a transcript (only callable by authorized entities)
async function verifyTranscript(studentAddress) {
    try {
        const ipfsHash = await verifyContract.methods.verifyTranscript(studentAddress).call({
            from: account
        });
        console.log(`Verified transcript for student ${studentAddress}. IPFS Hash: ${ipfsHash}`);
    } catch (error) {
        console.error('Error verifying transcript:', error);
    }
}

// Example usage
(async () => {

//authorize entity
const entityAdr = '0x75c4440BA8e132A950a7529D0aE5b25E23ac0ADF'; //3rd
await authorizeEntity(entityAdr);

const studentAdr = '0x6390661A24ad6fE60c5949ad4A87E7Fc986C4c2d'; //1st 


})()
