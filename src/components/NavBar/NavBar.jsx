import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    state = {}
    render() {
        return (
            <div className="navbar-container">
                <Link to="/" className="navbar-text">TestNow</Link>
            </div>
        );
    }
}

export default NavBar;