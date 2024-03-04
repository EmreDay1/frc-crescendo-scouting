import React, { useState, useEffect } from 'react';
import './ScoutingForm.css';
import { useNavigate } from 'react-router-dom';

const ScoutingForm = () => {
  const [scouterInitials, setScouterInitials] = useState('');
  const [eventName, setEventName] = useState('');
  const [matchLevel, setMatchLevel] = useState('quals');
  const [matchNumber, setMatchNumber] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [autonPosition, setAutonPosition] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loadFormData = () => {
      const formData = {
        scouterInitials: localStorage.getItem('scouterInitials'),
        eventName: localStorage.getItem('eventName'),
        matchLevel: localStorage.getItem('matchLevel'),
        matchNumber: localStorage.getItem('matchNumber'),
        selectedTeam: localStorage.getItem('selectedTeam'),
        teamNumber: localStorage.getItem('teamNumber'),
        autonPosition: localStorage.getItem('autonPosition'),
      };

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          switch (key) {
            case 'scouterInitials':
              setScouterInitials(JSON.parse(value));
              break;
            case 'eventName':
              setEventName(JSON.parse(value));
              break;
            case 'matchLevel':
              setMatchLevel(JSON.parse(value));
              break;
            case 'matchNumber':
              setMatchNumber(JSON.parse(value));
              break;
            case 'selectedTeam':
              setSelectedTeam(JSON.parse(value));
              break;
            case 'teamNumber':
              setTeamNumber(JSON.parse(value));
              break;
            case 'autonPosition':
              setAutonPosition(JSON.parse(value));
              break;
          }
        }
      });
    };

    loadFormData();
  }, []);

  const navigateToAuton = () => {
    const formData = {
      scouterInitials,
      eventName,
      matchLevel,
      matchNumber,
      selectedTeam,
      teamNumber,
      autonPosition,
    };

    Object.keys(formData).forEach(key => {
      localStorage.setItem(key, JSON.stringify(formData[key]));
    });

    navigate('/Auton');
  };

  return (
    <div className="scouting-form">
      <div className="form-container">
        <h1 className="title">CRESCENDO</h1>
        <input
          type="text"
          placeholder="Scouter Initials"
          value={scouterInitials}
          onChange={(e) => setScouterInitials(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <div className="radio-section">
          Match Level:
          <label>
            <input
              type="radio"
              name="matchLevel"
              value="quals"
              checked={matchLevel === 'quals'}
              onChange={(e) => setMatchLevel(e.target.value)}
            />
            Quals
          </label>
          <label>
            <input
              type="radio"
              name="matchLevel"
              value="semifinals"
              checked={matchLevel === 'semifinals'}
              onChange={(e) => setMatchLevel(e.target.value)}
            />
            Semifinals
          </label>
          <label>
            <input
              type="radio"
              name="matchLevel"
              value="finals"
              checked={matchLevel === 'finals'}
              onChange={(e) => setMatchLevel(e.target.value)}
            />
            Finals
          </label>
        </div>
        <input
          type="number"
          placeholder="Match Number"
          value={matchNumber}
          onChange={(e) => setMatchNumber(e.target.value)}
        />
        <div className="radio-section">
          Robot:
          {['red-1', 'red-2', 'red-3', 'blue-1', 'blue-2', 'blue-3'].map((team) => (
            <label key={team}>
              <input
                type="radio"
                name="teamPosition"
                value={team}
                checked={selectedTeam === team}
                onChange={(e) => setSelectedTeam(e.target.value)}
              />
              {team.toUpperCase()}
            </label>
          ))}
        </div>
        <input
          type="number"
          placeholder="Team Number"
          value={teamNumber}
          onChange={(e) => setTeamNumber(e.target.value)}
        />
        <div className="radio-section">
          Auton Position:
          <label>
            <input
              type="radio"
              name="autonPosition"
              value="left"
              checked={autonPosition === 'left'}
              onChange={(e) => setAutonPosition(e.target.value)}
            />
            Left
          </label>
          <label>
            <input
              type="radio"
              name="autonPosition"
              value="center"
              checked={autonPosition === 'center'}
              onChange={(e) => setAutonPosition(e.target.value)}
            />
            Center
          </label>
          <label>
            <input
              type="radio"
              name="autonPosition"
              value="right"
              checked={autonPosition === 'right'}
              onChange={(e) => setAutonPosition(e.target.value)}
            />
            Right
          </label>
        </div>
        <button type="button" onClick={navigateToAuton}>Next</button>
      </div>
    </div>
  );
};

export default ScoutingForm;
