import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import './index.css';

export default function App() {
  return (
    <div className="app-root">
      <Header />

      <main className="main-content">
      </main>

      <footer className="app-footer">
        <div className="container">
           <p>© 2026 Estate Agent. Your trusted property partner.</p>
           <p style={{fontSize: '0.875rem', opacity: 0.5, margin: 0}}>Developed by Pasindu Dissanayake.</p>
        </div>
      </footer>
    </div>
  );
}