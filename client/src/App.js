import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';
import ViewerPage from './ViewerPage';
import Homepage from './Homepage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/viewer" element={<ViewerPage />} />
            </Routes>
        </Router>
    );
}

export default App;
