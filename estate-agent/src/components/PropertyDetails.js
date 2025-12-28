import React, { useState } from 'react';
import { ChevronLeft, Layout, Image as ImageIcon, Map as MapIcon, MapPin, Heart } from 'lucide-react';
import Tabs from './Tabs';
import '../index.css';

export default function PropertyDetails({ property, onBack, isFavourite, onToggleFav }) {
  const [mainImage, setMainImage] = useState(property.images[0]);

  // Tab Content Definitions
  const tabData = [
    {
      label: "Description",
      icon: <Layout size={18} />,
      content: (
        <div className="tab-inner-content">
          <h3 className="tab-heading">Property Description</h3>
          <p className="description-text">{property.description}</p>
          <div className="details-grid">
            <div className="detail-box">
              <span className="detail-label">Type</span>
              <span className="detail-value">{property.type}</span>
            </div>
            <div className="detail-box">
              <span className="detail-label">Tenure</span>
              <span className="detail-value">{property.tenure}</span>
            </div>
            <div className="detail-box">
               <span className="detail-label">Date Added</span>
               <span className="detail-value">{property.added.day} {property.added.month} {property.added.year}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      label: "Floor Plan",
      icon: <ImageIcon size={18} />,
      content: (
        <div className="placeholder-container">
           <ImageIcon size={48} className="placeholder-icon" />
           <p className="placeholder-text">Floor plan visual placeholder</p>
           <p className="placeholder-sub">Interactive floorplans would appear here</p>
        </div>
      )
    },
    {
      label: "Map",
      icon: <MapIcon size={18} />,
      content: (
        <div className="map-placeholder">
           <div className="map-overlay">
             <div className="map-center">
               <MapPin size={40} className="map-pin" />
               <p className="map-address">{property.location}</p>
               <p className="map-sub">Google Maps API Integration</p>
             </div>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="details-container">
      <button 
        onClick={onBack}
        className="btn-back"
      >
        <ChevronLeft size={20} /> Back to Search
      </button>

      <div className="details-layout">
        {/* Main Content */}
        <div className="details-main">
          {/* Gallery */}
          <div className="gallery-section">
            <div className="main-image-frame">
              <img src={mainImage} alt="Main" className="main-image" />
              <div className="price-tag">
                £{property.price.toLocaleString()}
              </div>
            </div>
            <div className="thumbnail-row">
              {property.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)} 
                  className={`thumb-btn ${mainImage === img ? 'active' : ''}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
              {/* Fallback placeholders */}
              {[...Array(4)].map((_, i) => (
                 <div key={i+10} className="thumb-placeholder">
                   <ImageIcon size={24} />
                 </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-wrapper card">
             <Tabs tabs={tabData} />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="details-sidebar">
           <div className="info-card card">
             <h1 className="prop-title">{property.type}</h1>
             <p className="prop-loc">
               <MapPin size={18} /> {property.location}
             </p>

             <div className="quick-stats">
                <div className="stat-item">
                  <span className="stat-val">{property.bedrooms}</span>
                  <span className="stat-label">Bedrooms</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-val">{property.type}</span>
                  <span className="stat-label">Type</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-val">{property.tenure === 'Freehold' ? 'FH' : 'LH'}</span>
                  <span className="stat-label">Tenure</span>
                </div>
             </div>

             <button 
               onClick={() => onToggleFav(property)}
               className={`btn-fav-large ${isFavourite ? 'fav-active' : 'fav-inactive'}`}
             >
               <Heart size={20} fill={isFavourite ? "currentColor" : "none"} />
               {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}