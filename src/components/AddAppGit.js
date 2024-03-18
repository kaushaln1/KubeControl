import React, { useState } from 'react';
import '../assets/AppStyle.css';
import axios from "axios";
import {createDeployment, gitCreateDeployment} from "../appConfig";
import '../App.css'
import { useNavigate } from "react-router-dom";

const AddAppsGit = () => {
    const [appName, setAppName] = useState('');
    const [gitURL, setGitURL] = useState('');
    const [appType, setAppType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Basic URL validation
            if (!validateURL(gitURL)) {
                throw new Error('Invalid Git URL. Please enter a valid URL.');
            }

            const response = await axios.post(gitCreateDeployment, {
                appName,
                gitURL,
                appType,
            });

            console.log('Response from backend:', response.data);
            // Handle success (e.g., show success message)
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'An error occurred. Please try again.'); // Set error state
        } finally {
            setLoading(false);
        }
    };

    const handleBackToMainPage = () => {
        navigate('/');
    };

    // Basic URL validation function
    const validateURL = (url) => {
        const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return pattern.test(url);
    };

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
                    <label htmlFor="gitURL">Git URL:</label>
                    <input
                        type="text"
                        id="gitURL"
                        value={gitURL}
                        onChange={(e) => setGitURL(e.target.value)}
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
                {loading && <p className="loading-message">Loading...</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
            <button className="back-button" onClick={handleBackToMainPage}>Back to Main Page</button>
        </div>
    );
};

export default AddAppsGit;
