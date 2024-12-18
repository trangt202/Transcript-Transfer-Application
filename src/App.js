import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';


import './App.css';
import IssueTranscript from './pages/issue/IssueTranscript';
import ViewTranscript from './pages/view/ViewTranscript';
import ConnectWallet from './components/ConnectWallet';

function App() {
  const [account, setAccount] = useState(null);

  return (
    <Router>
      <div className="App">
        <ConnectWallet account={account} setAccount={setAccount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/issue" element={<IssueTranscript />} />
          <Route path="/view" element={<ViewTranscript />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


