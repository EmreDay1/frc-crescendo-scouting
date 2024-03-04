import React, { useState, useEffect } from 'react';
import './Additive.css';
import { useNavigate } from 'react-router-dom';

const EvaluationForm = () => {

  const getInitialFormData = () => {
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      localStorageData[key] = localStorage.getItem(key);
    }
    return localStorageData;
  };

  const [formData, setFormData] = useState(getInitialFormData);

  const navigate = useNavigate();


  useEffect(() => {
    for (const key in formData) {
      localStorage.setItem(key, formData[key]);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    navigate('/C');
  };

  const handlePrevious = () => {
    navigate('/EndGame'); 
  };


 
  const downloadLocalStorage = async () => {
  
      const localStorageData = {};
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          localStorageData[key.replace(/\//g, ' ')] = localStorage.getItem(key);
      }
      
      
      const json = JSON.stringify(localStorageData);
  
      
      try {
          const response = await fetch('http://localhost:3001/data', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: json,
          });
  
          if (response.ok) {
              console.log('Data sent successfully to MongoDB');
              // Reset localStorage
              localStorage.clear();
              // Navigate back to '/'
              navigate('/');
          } else {
              console.error('Failed to send data', response.statusText);
          }
      } catch (error) {
          console.error('Error sending data', error);
      }
  };
  

  return (
    <div className="eval-data-entry-screen">
      <form onSubmit={handleSubmit} className="eval-form-container">
        <h2 className="eval-form-title">MISCELLANEOUS</h2>
        
        <div className="eval-input-field">
  <p className="eval-score-label">Driver Skill</p>
  <label className="eval-check-label">
    <input type="radio" name="driverSkill" value="Not Effective" checked={formData.driverSkill === 'Not Effective'} onChange={handleChange} />
    Not Effective
  </label>
  <label className="eval-check-label">
    <input type="radio" name="driverSkill" value="Average" checked={formData.driverSkill === 'Average'} onChange={handleChange} />
    Average
  </label>
  <label className="eval-check-label">
    <input type="radio" name="driverSkill" value="Very Effective" checked={formData.driverSkill === 'Very Effective'} onChange={handleChange} />
    Very Effective
  </label>
</div>

{/* Defense Rating Section */}
<div className="eval-input-field">
  <p className="eval-score-label">Defense Rating</p>
  <label className="eval-check-label">
    <input type="radio" name="defenseRating" value="Below Average" checked={formData.defenseRating === 'Below Average'} onChange={handleChange} />
    Below Average
  </label>
  <label className="eval-check-label">
    <input type="radio" name="defenseRating" value="Average" checked={formData.defenseRating === 'Average'} onChange={handleChange} />
    Average
  </label>
  <label className="eval-check-label">
    <input type="radio" name="defenseRating" value="Good" checked={formData.defenseRating === 'Good'} onChange={handleChange} />
    Good
  </label>
  <label className="eval-check-label">
    <input type="radio" name="defenseRating" value="Excellent" checked={formData.defenseRating === 'Excellent'} onChange={handleChange} />
    Excellent
  </label>
</div>

{/* Speed Rating Section */}
<div className="eval-score-section">
  <p className="eval-score-label">Speed Rating</p>
  <label className="eval-check-label">
    <input type="radio" name="speedRating" value="1" checked={formData.speedRating === '1'} onChange={handleChange} />
    1 (slow)
  </label>
  <label className="eval-check-label">
    <input type="radio" name="speedRating" value="2" checked={formData.speedRating === '2'} onChange={handleChange} />
    2
  </label>
  <label className="eval-check-label">
    <input type="radio" name="speedRating" value="3" checked={formData.speedRating === '3'} onChange={handleChange} />
    3
  </label>
  <label className="eval-check-label">
    <input type="radio" name="speedRating" value="4" checked={formData.speedRating === '4'} onChange={handleChange} />
    4
  </label>
  <label className="eval-check-label">
    <input type="radio" name="speedRating" value="5" checked={formData.speedRating === '5'} onChange={handleChange} />
    5 (fast)
  </label>
</div>

        {/* Checkbox Section */}
        <div className="eval-check-section">
          <label className="eval-check-label">
            <input
              type="checkbox"
              name="diedOrImmobilized"
              checked={formData.diedOrImmobilized}
              onChange={handleChange}
            />
            Died/Immobilized
          </label>
          <label className="eval-check-label">
            <input
              type="checkbox"
              name="tippy"
              checked={formData.tippy}
              onChange={handleChange}
            />
            Tippy (almost tipped over)
          </label>
          <label className="eval-check-label">
            <input
              type="checkbox"
              name="droppedNotes"
              checked={formData.droppedNotes}
              onChange={handleChange}
            />
            Dropped Notes (if +2)
          </label>
          <label className="eval-check-label">
            <input
              type="checkbox"
              name="goodAlliancePartner"
              checked={formData.goodAlliancePartner}
              onChange={handleChange}
            />
            Make good alliance partner?
          </label>
        </div>

        <div className="eval-input-field">
          <label className="eval-score-label">Comments</label>
          <textarea
            className="eval-input-field"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          ></textarea>
        </div>


        <div className="eval-nav-buttons">
          <button type="button" className="eval-action-button" onClick={handlePrevious}>Prev</button>
          <button type="button" className="eval-action-button" onClick={downloadLocalStorage}>Next</button>
        </div>
        <div className="eval-nav-buttons">
          <button type="button" className="eval-action-button" onClick={handleSubmit}>To see stats (Don't click if scouter)</button>
         
        </div>
      </form>
    </div>
  );

  
};

export default EvaluationForm;
