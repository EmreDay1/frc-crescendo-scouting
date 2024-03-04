import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Teleoperated.css';

const TeleopForm = () => {

  const [ampScores, setAmpScores] = useState(() => JSON.parse(localStorage.getItem('teleopAmpScores')) || 0);
  const [speakerScores, setSpeakerScores] = useState(() => JSON.parse(localStorage.getItem('teleopSpeakerScores')) || 0);
  const [timesAmplified, setTimesAmplified] = useState(() => JSON.parse(localStorage.getItem('teleopTimesAmplified')) || 0);
  const [pickupFrom, setPickupFrom] = useState(() => localStorage.getItem('teleopPickupFrom') || 'notAttempted');

  const navigate = useNavigate();


  useEffect(() => {
    localStorage.setItem('teleopAmpScores', JSON.stringify(ampScores));
    localStorage.setItem('teleopSpeakerScores', JSON.stringify(speakerScores));
    localStorage.setItem('teleopTimesAmplified', JSON.stringify(timesAmplified));
    localStorage.setItem('teleopPickupFrom', pickupFrom);
  }, [ampScores, speakerScores, timesAmplified, pickupFrom]);

  const navigateToPrev = () => {
    navigate('/Auton');
  };

  const navigateToNext = () => {
    navigate('/EndGame');
  };

  return (
    <div className="performance-form">
      <div className="entry-wrapper">
        <h1 className="header-title">CRESCENDO TELEOP</h1>
        <div className="tally-section">
          <label className="tally-label">Amp Scores</label>
          <button className="interactive-button" onClick={() => setAmpScores(Math.max(0, ampScores - 1))}>-</button>
          <span className="tally-number">{ampScores}</span>
          <button className="interactive-button" onClick={() => setAmpScores(ampScores + 1)}>+</button>
        </div>
        <div className="tally-section">
          <label className="tally-label">Speaker Scores</label>
          <button className="interactive-button" onClick={() => setSpeakerScores(Math.max(0, speakerScores - 1))}>-</button>
          <span className="tally-number">{speakerScores}</span>
          <button className="interactive-button" onClick={() => setSpeakerScores(speakerScores + 1)}>+</button>
        </div>
        <div className="tally-section">
          <label className="tally-label">Times Amplified</label>
          <button className="interactive-button" onClick={() => setTimesAmplified(Math.max(0, timesAmplified - 1))}>-</button>
          <span className="tally-number">{timesAmplified}</span>
          <button className="interactive-button" onClick={() => setTimesAmplified(timesAmplified + 1)}>+</button>
        </div>
        <div className="selection-group">
          <label className="selection-label">
            <input
              className="selection-input"
              type="radio"
              name="pickupFrom"
              value="source"
              checked={pickupFrom === 'source'}
              onChange={() => setPickupFrom('source')}
            />
            Source
          </label>
          <label className="selection-label">
            <input
              className="selection-input"
              type="radio"
              name="pickupFrom"
              value="floor"
              checked={pickupFrom === 'floor'}
              onChange={() => setPickupFrom('floor')}
            />
            Floor
          </label>
          <label className="selection-label">
            <input
              className="selection-input"
              type="radio"
              name="pickupFrom"
              value="both"
              checked={pickupFrom === 'both'}
              onChange={() => setPickupFrom('both')}
            />
            Both
          </label>
          <label className="selection-label">
            <input
              className="selection-input"
              type="radio"
              name="pickupFrom"
              value="notAttempted"
              checked={pickupFrom === 'notAttempted'}
              onChange={() => setPickupFrom('notAttempted')}
            />
            Not Attempted
          </label>
        </div>
        <div className="footer-buttons">
          <button className="interactive-button" onClick={navigateToPrev}>Prev</button>
          <button className="interactive-button" onClick={navigateToNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default TeleopForm;
