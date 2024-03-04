// AutonForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AutonForm.css';

const AutonForm = () => {
 
  const [leaveStartingZone, setLeaveStartingZone] = useState(JSON.parse(localStorage.getItem('leaveStartingZone')) || false);
  const [ampScores, setAmpScores] = useState(JSON.parse(localStorage.getItem('ampScores')) || 0);
  const [speakerScores, setSpeakerScores] = useState(JSON.parse(localStorage.getItem('speakerScores')) || 0);

  const navigate = useNavigate();


  useEffect(() => {
    localStorage.setItem('leaveStartingZone', leaveStartingZone);
    localStorage.setItem('ampScores', ampScores);
    localStorage.setItem('speakerScores', speakerScores);
  }, [leaveStartingZone, ampScores, speakerScores]);

  const decreaseScore = (score, setScore) => {
    setScore(Math.max(0, score - 1));
  };

  const increaseScore = (score, setScore) => {
    setScore(score + 1);
  };

  const handlePrevious = () => {
    navigate('/');
  };

  const handleNext = () => {

    navigate('/Teleop');
  };
  
  return (
    <div className="data-entry-screen">
      <div className="data-form-container">
        <h1 className="form-title">CRESCENDO AUTON</h1>
        <div className="check-section">
          <label className="check-label">
            <input
              type="checkbox"
              className="input-field"
              checked={leaveStartingZone}
              onChange={(e) => setLeaveStartingZone(e.target.checked)}
            />
            Leave Starting Zone (checked = Yes)
          </label>
        </div>
        <div className="score-area">
          <label className="score-label">
            Amp Scores
            <button className="action-button" onClick={() => decreaseScore(ampScores, setAmpScores)}>-</button>
            <span className="value-text">{ampScores}</span>
            <button className="action-button" onClick={() => increaseScore(ampScores, setAmpScores)}>+</button>
          </label>
          <label className="score-label">
            Speaker Scores
            <button className="action-button" onClick={() => decreaseScore(speakerScores, setSpeakerScores)}>-</button>
            <span className="value-text">{speakerScores}</span>
            <button className="action-button" onClick={() => increaseScore(speakerScores, setSpeakerScores)}>+</button>
          </label>
        </div>
        <div className="nav-buttons">
          <button className="action-button" onClick={handlePrevious}>Prev</button>
          <button className="action-button" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AutonForm;
