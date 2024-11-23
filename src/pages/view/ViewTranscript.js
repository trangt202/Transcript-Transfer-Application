// src/pages/view/ViewTranscript.js

import React, { useState, useEffect } from 'react';
import Blockchain from '../../components/Blockchain';
import styles from './ViewTranscript.module.css';

function ViewTranscript() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [transcriptId, setTranscriptId] = useState('');
  const [transcript, setTranscript] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        await Blockchain.initialize();
        setIsInitialized(true);
        console.log('Web3 initialized successfully!');
      } catch (error) {
        console.error('Failed to initialize blockchain:', error);
        setError('Failed to connect to blockchain');
      }
    };

    initBlockchain();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setTranscript(null);

    if (!transcriptId.trim()) {
      setError('Please enter a transcript ID');
      return;
    }

    try {
      const result = await Blockchain.getTranscript(transcriptId);
      setTranscript({
        studentName: result.studentName,
        dateOfBirth: result.dateOfBirth,
        studentID: result.studentID,
        transcriptDetails: result.transcriptDetails,
        timestamp: new Date(Number(result.timestamp) * 1000).toLocaleString(),
        isValid: result.isValid
      });
    } catch (error) {
      console.error('Error fetching transcript:', error);
      setError('Failed to fetch transcript. Please check the ID and try again.');
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
          value={transcriptId}
          onChange={(e) => setTranscriptId(e.target.value)}
          placeholder="Enter Transcript ID"
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
