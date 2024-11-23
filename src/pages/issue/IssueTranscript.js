import React, { useState, useEffect } from 'react';
import Blockchain from '../../components/Blockchain.js';
import styles from './IssueTranscript.module.css';


//----------------------------------------------------------
//download ipfs: https://github.com/ipfs/kubo/releases
//put the ipfs file into /usr/local/bin folder
//terminal:   ipfs init   , then     ipfs daemon     to start

const ipfsHttpClient = require('ipfs-http-client');

const ipfs = ipfsHttpClient('http://127.0.0.1:5002'); 
//----------------------------------------------------------


function IssueTranscript() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [transcriptId, setTranscriptId] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    studentID: '',
    transcriptDetails: ''
  });
  const [error, setError] = useState(null);
  const [cid, setCid] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!formData.studentName || !formData.dateOfBirth || !formData.studentID || !formData.transcriptDetails) {
      setError('Please fill in all fields');
      return;
    }

    try {
    
      const ipfsData = JSON.stringify(formData);
      const added = await ipfs.add(ipfsData);
      const cid = added.path;
      console.log("Data stored on IPFS, cid = ", cid);
      setCid(cid);
    
          
      const result = await Blockchain.issueTranscript(cid);
      setTranscriptId(result);
      console.log('Transcript issued:', result);
      
      // Clear form after successful submission
      setFormData({
        studentName: '',
        dateOfBirth: '',
        studentID: '',
        transcriptDetails: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to issue transcript. Please try again.');
    }
  };

  return (
    <div className={styles['issue-container']}>
      <h1 className={styles.title}>Issue Transcript</h1>
      <div className={styles.status}>
        Status: {isInitialized ? 'Connected to blockchain' : 'Initializing...'}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['form-group']}>
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            placeholder="Enter student name"
            disabled={!isInitialized}
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isInitialized}
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="studentID">Student ID:</label>
          <input
            type="text"
            id="studentID"
            name="studentID"
            value={formData.studentID}
            onChange={handleInputChange}
            placeholder="Enter student ID"
            disabled={!isInitialized}
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="transcriptDetails">Transcript Details:</label>
          <textarea
            id="transcriptDetails"
            name="transcriptDetails"
            value={formData.transcriptDetails}
            onChange={handleInputChange}
            placeholder="Enter transcript details (e.g., Course: Grade)"
            disabled={!isInitialized}
            rows={5}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button 
          type="submit" 
          disabled={!isInitialized}
          className={styles.button}
        >
          Issue Transcript
        </button>
      </form>
      
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