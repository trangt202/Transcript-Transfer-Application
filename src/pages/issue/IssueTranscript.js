// src/pages/issue/IssueTranscript.js
import React, { useState } from 'react';
import styles from './IssueTranscript.module.css';

function IssueTranscript() {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    studentID: '',
    transcriptDetails: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic here (e.g., send data to a server or blockchain)
    console.log('Form data submitted:', formData);
  };

  return (
    <div className={styles['issue-container']}>
      <h1 className={styles['form-title']}>Create Transcript</h1>
      <form className={styles['issue-form']} onSubmit={handleSubmit}>
        <label className={styles['form-label']}>Student Name</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          className={styles['form-input']}
          placeholder="Alice Doe"
        />

        <label className={styles['form-label']}>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={styles['form-input']}
        />

        <label className={styles['form-label']}>Student ID</label>
        <input
          type="text"
          name="studentID"
          value={formData.studentID}
          onChange={handleChange}
          className={styles['form-input']}
          placeholder="S4277804"
        />

        <label className={styles['form-label']}>Transcript Details</label>
        <textarea
          name="transcriptDetails"
          value={formData.transcriptDetails}
          onChange={handleChange}
          className={styles['form-textarea']}
          placeholder="Fall 2021 - CSC 1960 - A+"
        />

        <button type="submit" className={styles['submit-button']}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default IssueTranscript;

