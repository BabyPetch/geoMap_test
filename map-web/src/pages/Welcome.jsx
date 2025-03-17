import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import '../App.css';

function Welcome() {
    return (
        <div className="welcome">
            <div className="welcome-content">
                <h1>Welcome to Our Map Website</h1>
                <p>Let try to discover excited location on our map</p>
                <Link to="/map" className="welcome-button">Explore the Map</Link>
            </div>
        </div>
    );
}

export default Welcome;
