// Import the Web3 library
const Web3 = require('web3').default;
// Connect to an Ethereum provider (e.g., Infura or a local node)
const web3 = new Web3('http://127.0.0.1:7546');
// Function to get and display all accounts with their balances
async function getAccountsAndBalances() {
try {
// Retrieve the list of accounts
const accounts = await web3.eth.getAccounts();
console.log("Accounts and balances available in Ganache:");
// Loop through each account
for (const [index, account] of accounts.entries()) {
// Get the balance of each account in Wei
const balanceInWei = await web3.eth.getBalance(account);
// Convert the balance from Wei to Ether
const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
// Display the account and balance
console.log(`Account ${index + 1}: ${account} - Balance: ${balanceInEther}
ETH`);
}
} catch (error) {
console.error('Error fetching accounts and balances:', error);
}
}
// Call the function
getAccountsAndBalances();
