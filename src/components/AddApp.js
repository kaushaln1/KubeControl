import React, { useState } from 'react';
import '../assets/AppStyle.css';
import axios from "axios";
import {createDeployment} from "../appConfig";
import '../App.css'
import {useNavigate} from "react-router-dom";
const AddApps = () => {
  const [appName, setAppName] = useState('');
  const [dockerImage, setDockerImage] = useState('');
  const [appType, setAppType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setError(null);
      try {
          const response = await axios.post(createDeployment, {
              appName,
              dockerImage,
              appType,
          });
          console.log('Response from backend:', response.data);
          // Handle success (e.g., show success message)
      } catch (error) {
          console.error('Error:', error);
          setError('An error occurred. Please try again.'); // Set error state
      } finally {
          setLoading(false);
      }
  };
   const handleBackToMainPage = () => {
     navigate('/');
  }

  return (

      <div className="add-apps-container">

          <h2>Add App</h2>

          <form onSubmit={handleSubmit} className="add-apps-form">
              <div className="form-group">
                  <label htmlFor="appName">App Name:</label>
                  <input
                      type="text"
                      id="appName"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="dockerImage">Docker Image:</label>
                  <input
                      type="text"
                      id="dockerImage"
                      value={dockerImage}
                      onChange={(e) => setDockerImage(e.target.value)}
                      required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="appType">App Type:</label>
                  <select
                      id="appType"
                      value={appType}
                      onChange={(e) => setAppType(e.target.value)}
                      required
                  >
                      <option value="">Select App Type</option>
                      <option value="Python">Python</option>
                      <option value="Node.js">Node.js</option>
                  </select>
              </div>
              <button type="submit" className="deploy-button" disabled={loading}>
                  {loading ? 'Deploying...' : 'Deploy'}
              </button>
              {error && <p className="error-message">{error}</p>}
          </form>
          <button className="back-button" onClick={handleBackToMainPage}>Back to Main Page</button>
      </div>
  );
};

export default AddApps;
