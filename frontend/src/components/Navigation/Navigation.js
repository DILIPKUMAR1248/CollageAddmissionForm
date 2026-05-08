/**
 * Navigation Component
 * Main navigation header for the College Admission System
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Close mobile menu when link is clicked
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * Check if the current route matches the given path
   * @param {string} path - Route path to check
   * @returns {boolean} - True if current route matches
   */
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo/Brand */}
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <h1>College Admission System</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/applicants" 
                className={`nav-link ${isActive('/applicants') ? 'active' : ''}`}
              >
                Applicants
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/courses" 
                className={`nav-link ${isActive('/courses') ? 'active' : ''}`}
              >
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/education" 
                className={`nav-link ${isActive('/education') ? 'active' : ''}`}
              >
                Education
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle">
          <button 
            className="menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li className="mobile-nav-item">
            <Link 
              to="/" 
              className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link 
              to="/applicants" 
              className={`mobile-nav-link ${isActive('/applicants') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Applicants
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link 
              to="/courses" 
              className={`mobile-nav-link ${isActive('/courses') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Courses
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link 
              to="/education" 
              className={`mobile-nav-link ${isActive('/education') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Education
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
