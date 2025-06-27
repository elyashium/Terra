import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    // Don't render the header on the CarbonCalculator page
    if (location.pathname === '/CarbonCalculator') {
        return null;
    }
    
    const scrollToSection = (id) => {
        setMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <header className="header">
            <div className="logo">
                <a href="#home" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('home');
                }}>
                    <img src="/src/images/logo.png" alt="Terra Logo" />
                </a>
            </div>
            
            <div className="mobile-menu-icon" onClick={toggleMenu}>
                <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            
            <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <a href="#home" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('home');
                }}>
                    Home
                </a>
                <a href="#timeline" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('timeline');
                }}>
                    Timeline
                </a>
                <a href="#learn" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('learn');
                }}>
                    Learn
                </a>
                <a href="#events" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('events');
                }}>
                    Events
                </a>
            </nav>
        </header>
    );
}