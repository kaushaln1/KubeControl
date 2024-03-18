import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import AppDisplay from './components/AppDisplay';
import AddApps from "./components/AddApp";
import AddAppsGit from "./components/AddAppGit";
import add from "./assets/add.png"
import node from "./assets/nodejs.png"
import python from "./assets/python.png"
import './App.css'


const TileLink = ({to, text,description, backgroundImage}) => (
    <div style={{textAlign: 'center'}}>
        <Link to={to} style={{textDecoration:'aqua', color: 'black'}}>
            <div style={{
                width: '200px',
                height: '200px',
                backgroundColor: 'gray',
                borderRadius: '10px',
                padding: '20px', cursor: 'pointer',
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            </div>
            <div>
                <p>{description} </p>
            </div>


        </Link>
    </div>
);

const MainPage = () => {
    return (

        <div style={{ minHeight: '100vh', color: 'black'}}>
            <h1>Kube Control App </h1>
            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '10%'}}>
                <TileLink to="/node" text="Node.js" description = "See Node apps " backgroundImage={node}/>
                <TileLink to="/python" text="python" description = "See python apps " backgroundImage={python}/>
                <TileLink to="/add" text="Create New App" description = "Deploy apps " backgroundImage={add}/>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route path="/node" element={<AppDisplay appType="node" />} />
                <Route path="/python" element={<AppDisplay appType="python" />} />
                <Route path="/add" element={<AddAppsGit />} />
            </Routes>
        </Router>
    );
};

export default App;
