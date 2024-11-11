import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Homepage() {
    return (
        <div className="homepage-container">
            <h1>Welcome to PDF Co-Viewer</h1>
            <p>Choose your role to get started:</p>
            <div className="role-buttons">
                <Link to="/admin" className="button admin-button">Admin</Link>
                <Link to="/viewer" className="button viewer-button">Viewer</Link>
            </div>
        </div>
    );
}

export default Homepage;
