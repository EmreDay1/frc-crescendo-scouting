// App.js
import React from 'react';
import './App.css';
import ScoutingForm from './ScoutingForm'; 
import AutonForm from './AutonForm';
import TeleopForm from './Teleoperated'; 
import EndgameForm from './EndgameForm';
import EvaluationForm from './Additive';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChartComponent from './charter';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ScoutingForm />} />
          <Route path="/Auton" element={<AutonForm />} />
          <Route path="/Teleop" element={<TeleopForm />} /> 
          <Route path="/EndGame" element={<EndgameForm />} /> 
          <Route path="/Fin" element={<EvaluationForm />} /> 
          <Route path="/C" element={<ChartComponent />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

