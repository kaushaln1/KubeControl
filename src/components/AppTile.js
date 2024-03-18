import React from 'react';

const AppTile = ({ app, onClick }) => {
  return (
    <div className="app-tile" onClick={() => onClick(app.id)}>
      <h3>{app.name}</h3>
      <p>{app.description}</p>
    </div>
  );
};

export default AppTile;