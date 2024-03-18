import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_NAME, getDeployment } from "../appConfig";
import '../App.css';
import  '../assets/AppStyle.css';
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AppDisplay = ({appType}) => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      let namespace = appType === 'node' ? 'node' : 'python';
      const response = await axios.get(API_NAME, {
        params: {
          namespace: namespace,
        }
      });
      setApps(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching apps:', error);
      setLoading(false);
    }
  };

  const handleTileClick = async (appName) => {
    try {
       let namespace = appType === 'node' ? 'node' : 'python';
      const response = await axios.get(getDeployment, {
        params: {
          namespace: namespace,
          name: appName
        }
      });
      setSelectedApp(response.data);
    } catch (error) {
      console.error('Error fetching app details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedApp(null);
  };

  const handleClickLink = (e) => {
    e.preventDefault();
    window.open(`http://${selectedApp.ips}:${selectedApp.ports[0].port}`, '_blank');
  }
 const handleBackToMainPage = () => {
     navigate('/');
  }
  const handleClickImageUrl= (e) =>{
      e.preventDefault();
      window.open(`https://hub.docker.com/r/${selectedApp.image}`,'_blank');
       }

  return (
      <div>
        <div style={{minHeight: '100vh', color: 'white'}}>
          <h2>{appType.toUpperCase()} Apps</h2>
          <button className="back-button" onClick={handleBackToMainPage}>Back to Main Page</button>
          <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '50px'}}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                apps.map((app) => (
                    <div key={app.uid} onClick={() => handleTileClick(app.name)}>
                      <TileLink text={app.name}/>
                    </div>
                ))
            )}
          </div>
          {selectedApp && (
              <div className="modal-mask" onClick={handleCloseModal}>
                <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                  <h3>{selectedApp.name}</h3>
                  <p><strong>Image: </strong> <Link to="#" onClick={handleClickImageUrl}> {selectedApp.image}</Link> </p>
                  <p><strong>CreationTimeStamp:</strong> {selectedApp.CreationTimeStamp}</p>
                  <p><strong>uid:</strong> {selectedApp.uid}</p>
                  <p><strong>ReadyState:</strong> {selectedApp.readyState}</p>
                  <p><strong>Labels:</strong> {selectedApp.labels}</p>
                  <p><strong>Port:</strong> {selectedApp.ports[0].port}</p>
                  <p><strong>Url:</strong> {selectedApp.ips}</p>
                  <p><strong> Clickable Url: </strong><Link to="#" onClick={handleClickLink}>AppUrl</Link></p>

                  <button className="deploy-button" onClick={handleCloseModal}>Close</button>
                </div>
              </div>
          )}
        </div>

      </div>
  );
};

const TileLink = ({text}) => (
    <div style={{textAlign: 'center'}}>
      <div style={{
      width: '200px',
      height: '200px',
      backgroundColor: 'gray',
      borderRadius: '10px',
      padding: '20px',
      cursor: 'pointer'
    }}>
      {text}
    </div>
  </div>
);

export default AppDisplay;
