import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-logo">
          <div className="logo-badge-img-wrapper">
            <img src="/semco_logo.png" alt="SEMCO Logo" className="navbar-logo-img" />
          </div>
          <div>
            <div className="brand-title">SEMCORP</div>
            <div className="brand-subtitle">Enterprise Common Portal</div>
          </div>
        </div>

        <div className="nav-actions">
          <button 
            className="icon-btn" 
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
