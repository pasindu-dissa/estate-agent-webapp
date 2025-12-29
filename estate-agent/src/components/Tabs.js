import React, { useState } from 'react';
import '../index.css';

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            <div className="tab-label-content">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}