import React from 'react';
import { Home } from 'lucide-react';
import '../index.css';

export default function Header({ onHomeClick }) {
  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="logo-section" onClick={onHomeClick}>
          <div className="logo-icon">
            <Home strokeWidth={2.25} />
          </div>
          <span className="logo-text">Estate<span className="logo-accent">Agent</span></span>
        </div>
        <div className="header-info">
          <b>Find your dream property with EstateAgent</b>
        </div>
      </div>
    </header>
  );
}
