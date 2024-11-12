// src/pages/view/ViewTranscript.js

import React, { useState, useEffect } from 'react';
import styles from './ViewTranscript.module.css';

function ViewTranscript() {
  const [transcriptData, setTranscriptData] = useState({
    studentName: 'Alice Doe',
    dateOfBirth: '08/30/1999',
    studentID: 'S4277804',
    courses: [
      { term: 'Fall 2021', course: 'CSC 1960', grade: 'A+' },
      { term: 'Spring 2022', course: 'MATH 2020', grade: 'A' },
      // Add more courses as needed
    ],
  });


  return (
    <div className={styles['view-container']}>
      <h1 className={styles['view-title']}>Transcript for {transcriptData.studentName}</h1>

      <div className={styles['transcript-details']}>
        <p><strong>Student ID:</strong> {transcriptData.studentID}</p>
        <p><strong>Date of Birth:</strong> {transcriptData.dateOfBirth}</p>
      </div>

      <div className={styles['courses-container']}>
        <h2 className={styles['courses-title']}>Courses</h2>
        {transcriptData.courses.map((course, index) => (
          <div key={index} className={styles['course-entry']}>
            <p><strong>Term:</strong> {course.term}</p>
            <p><strong>Course:</strong> {course.course}</p>
            <p><strong>Grade:</strong> {course.grade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTranscript;
