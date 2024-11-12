import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles['home-container']}>
      <h1 className={styles['home-title']}>Transcript Viewing and Verification</h1>
      <p className={styles['home-subtitle']}>A safe and reliable way to view and issue transcripts</p>
      
      <div className={styles['button-container']}>
        <div className={styles['button-group']}>
          <button className={styles['home-button']} onClick={() => navigate('/issue')}>
            Issue Transcript
          </button>
          <p className={styles['button-description']}>Requires login, University staff only</p>
        </div>
        <div className={styles['button-group']}>
          <button className={styles['home-button']} onClick={() => navigate('/view')}>
            View Transcript
          </button>
          <p className={styles['button-description']}>Students, employers, other</p>
        </div>
      </div>
    </div>
  );
}

export default Home;


