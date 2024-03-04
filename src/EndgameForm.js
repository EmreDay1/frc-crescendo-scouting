import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EndgameForm.css';

const EndgameForm = () => {
 
  const [timer, setTimer] = useState(() => localStorage.getItem('endgameTimer') || '');
  const [finalStatus, setFinalStatus] = useState(() => localStorage.getItem('endgameFinalStatus') || 'notAttempted');
  const [noteInTrap, setNoteInTrap] = useState(() => {
    const storedNoteInTrap = localStorage.getItem('endgameNoteInTrap');
    return storedNoteInTrap ? storedNoteInTrap === 'true' : false;
  });

  const navigate = useNavigate();

  
  useEffect(() => {
    localStorage.setItem('endgameTimer', timer);
    localStorage.setItem('endgameFinalStatus', finalStatus);
    localStorage.setItem('endgameNoteInTrap', noteInTrap.toString());
  }, [timer, finalStatus, noteInTrap]);

  const handleTimerChange = (event) => {
    setTimer(event.target.value);
  };

  const handleStatusChange = (event) => setFinalStatus(event.target.value);
  const handleNoteChange = () => setNoteInTrap(!noteInTrap);
  const handlePrevClick = () => navigate('/Teleop');
  const handleNextClick = () => navigate('/Fin'); 

  return (
    <div className="green-zone-container">
      <div className="green-zone-form">
        <h1 className="form-heading">CRESCENDO ENDGAME</h1>
        <div className="timer-section">
          <input
            type="text"
            className="timer-input"
            placeholder="Enter time"
            value={timer}
            onChange={handleTimerChange}
          />
        </div>
        <div className="selection-group">
          {['Parked', 'Onstage', 'OnstageSpotlit', 'Harmony', 'AttemptedButFailed', 'NotAttempted'].map((status) => (
            <label key={status} className="selection-label">
              <input
                type="radio"
                name="finalStatus"
                value={status}
                checked={finalStatus === status}
                onChange={handleStatusChange}
              />
              {status.replace(/([A-Z])/g, ' $1').trim()} 
            </label>
          ))}
        </div>
        <div className="note-checkbox-section">
          <label className="note-checkbox-label">
            <input
              type="checkbox"
              checked={noteInTrap}
              onChange={handleNoteChange}
            />
            Note in Trap (checked = Yes)
          </label>
        </div>
        <div className="navigation-controls">
          <button className="control-button" onClick={handlePrevClick}>Prev</button>
          <button className="control-button" onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default EndgameForm;
