// Login.js
import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Transcript Transfer</h1>

        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

        <div className={styles.inputContainer}>
          <input type="text" className={styles.inputBox} placeholder="Username" />
        </div>

        <div className={styles.inputContainer}>
          <input type="password" className={styles.inputBox} placeholder="Password" />
        </div>

        <button 
          onClick={handleLogin} 
          className={styles.loginButton}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>

        <div className={styles.registerContainer}>
          <p className={styles.registerText}>New to our application?</p>
          <a href="/register" className={styles.registerLink}>Create an Account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;





