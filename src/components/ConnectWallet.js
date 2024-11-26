import React, { useState } from 'react';
import Web3 from 'web3';

const ConnectWallet = ({ account, setAccount }) => {
  const [error, setError] = useState(null);

  // Create an instance of Web3
  let web3;

  // Function to connect the wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Create a new Web3 instance using the current provider (MetaMask)
        web3 = new Web3(window.ethereum);

        // Request account access from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]); // Set the connected account
        setError(null); // Reset any previous error

        // Optionally, set up an event listener to track account or network changes
        window.ethereum.on('accountsChanged', (accounts) => {
          setAccount(accounts[0]);
        });

        window.ethereum.on('chainChanged', () => {
          // Handle network change (reload the page or update the state as needed)
          window.location.reload();
        });
      } catch (err) {
        setError('Failed to connect wallet');
      }
    } else {
      setError('MetaMask is not installed');
    }
  };

  // Function to disconnect the wallet
  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={connectWallet}>Connect Wallet</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
