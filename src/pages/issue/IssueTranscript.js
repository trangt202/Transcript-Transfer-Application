import React, { useState, useEffect } from 'react';
import Blockchain from '../../components/Blockchain.js';
import styles from './IssueTranscript.module.css';

function IssueTranscript() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [transcriptId, setTranscriptId] = useState(null);

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        await Blockchain.initialize();
        setIsInitialized(true);
        console.log('Web3 initialized successfully!');
      } catch (error) {
        console.error('Failed to initialize blockchain:', error);
      }
    };

    initBlockchain();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await Blockchain.issueTranscript({
        studentName: "Jane Doe",
        dateOfBirth: "2000-01-01",
        studentID: "502702682",
        transcriptDetails: "CSC 196D: A\n CSC 133: A\n CSC 135: A\n GPA: 3.9"
      });
      
      setTranscriptId(result);
      console.log('Transcript issued:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles['issue-container']}>
      <h1 className={styles.title}>Issue Transcript</h1>
      <div className={styles.status}>
        Status: {isInitialized ? 'Connected to blockchain' : 'Initializing...'}
      </div>
      <button 
        onClick={handleSubmit} 
        disabled={!isInitialized}
        className={styles.button}
      >
        Test Issue Transcript
      </button>
      
      {transcriptId && (
        <div className={styles['transcript-id']}>
          <h3>Transcript ID:</h3>
          <p>{transcriptId}</p>
          <p className={styles['helper-text']}>
            Save this ID to view the transcript later
          </p>
        </div>
      )}
    </div>
  );
}

export default IssueTranscript;
