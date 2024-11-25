// src/pages/view/ViewTranscript.js

import React, { useState, useEffect } from 'react';
import Blockchain from '../../components/Blockchain';
import styles from './ViewTranscript.module.css';
import {Buffer} from 'buffer';

const ipfsHttpClient = require('ipfs-http-client');
const ipfs = ipfsHttpClient('http://127.0.0.1:5002');

function ViewTranscript() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [transcriptId, setTranscriptId] = useState('');
  const [cid, setCid] = useState('');
  const [transcript, setTranscript] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        await Blockchain.initialize();
        setIsInitialized(true);
      } catch (error) {
        setError('Failed to connect to blockchain');
      }
    };

    initBlockchain();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setTranscript(null);

    if (!cid.trim()) {
      setError('Please enter a CID');
      return;
    }

    try {
      
      const fields = [];
      //get input for every field of the transcript form
      for await (const field of ipfs.cat(cid)){
        fields.push(field);
      }
      //create a single json file with all of the data
      const data = JSON.parse(Buffer.concat(fields).toString());
     
      console.log('Fetched transcript data from IPFS: ', data);
      setTranscript(data);
      
    } catch (error) {
      setError('Failed to fetch transcript. Please check the CID and try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>View Transcript</h1>
      
      <div className={styles.status}>
        Status: {isInitialized ? 'Connected to blockchain' : 'Initializing...'}
      </div>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          placeholder="Enter CID"
          className={styles.input}
          disabled={!isInitialized}
        />
        <button type="submit" disabled={!isInitialized} className={styles.button}>
          Search
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {transcript && (
        <div className={styles.transcriptContainer}>
          <h2 className={styles.detailsTitle}>Transcript Details</h2>
          <div className={styles.transcriptDetails}>
            <div className={styles.row}>
              <span className={styles.label}>Student Name:</span>
              <span className={styles.value}>{transcript.studentName}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Date of Birth:</span>
              <span className={styles.value}>{transcript.dateOfBirth}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Student ID:</span>
              <span className={styles.value}>{transcript.studentID}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Transcript Details:</span>
              <span className={styles.value}>{transcript.transcriptDetails}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Issue Date:</span>
              <span className={styles.value}>{transcript.timestamp}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Status:</span>
              <span className={`${styles.value} ${styles.status}`}>
                {transcript.isValid ? 'Valid' : 'Invalid'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewTranscript;