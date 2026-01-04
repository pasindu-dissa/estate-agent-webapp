import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // Using the real library
import { ChevronLeft, Layout, Image as ImageIcon, Map as MapIcon, MapPin, Heart } from 'lucide-react';

export default function PropertyDetails({ property, onBack, isFavourite, onToggleFav }) {
  const [mainImage, setMainImage] = useState(property.images[0]);

  // Fallback image for floorplan
  const floorPlanImage = "https://images.unsplash.com/photo-1721244654210-a505a99661e9?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="details-container">
      <button onClick={onBack} className="btn-back">
        <ChevronLeft size={20} /> Back to Search
      </button>

      <div className="details-layout">
        {/* Left Column */}
        <div className="details-main">
          
          {/* Gallery */}
          <div className="gallery-section">
            <div className="main-image-frame">
              <img src={mainImage} alt="Main Property" className="main-image" />
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
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* React Tabs Section */}
          <div className="tabs-wrapper card">
             <Tabs>
                <TabList>
                  <Tab>
                    <div className="tab-label-content"><Layout size={16}/> Description</div>
                  </Tab>
                  <Tab>
                    <div className="tab-label-content"><ImageIcon size={16}/> Floor Plan</div>
                  </Tab>
                  <Tab>
                    <div className="tab-label-content"><MapIcon size={16}/> Map</div>
                  </Tab>
                </TabList>

                {/* Tab 1: Description */}
                <TabPanel>
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
                        <span className="detail-value">
                          {property.added.day} {property.added.month} {property.added.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                {/* Tab 2: Floor Plan */}
                <TabPanel>
                   <div className="floorplan-container">
                      <h3 className="tab-heading">Floor Plan</h3>
                      <div className="floorplan-viewer">
                        <img src={floorPlanImage} alt="Floor Plan" />
                        <div className="floorplan-overlay">
                          <p>Illustrative Floor Plan</p>
                        </div>
                      </div>
                   </div>
                </TabPanel>

                {/* Tab 3: Google Map */}
                <TabPanel>
                   <div className="map-container-wrapper">
                      <h3 className="tab-heading">Location</h3>
                      <div className="map-frame">
                        <iframe 
                          title="Property Location"
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          scrolling="no" 
                          marginHeight="0" 
                          marginWidth="0" 
                          loading="lazy"
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        >
                        </iframe>
                      </div>
                      <p className="map-note">
                        <MapPin size={14} style={{display:'inline', marginRight: 4, verticalAlign: 'middle'}}/>
                        <span style={{verticalAlign: 'middle'}}>{property.location}</span>
                      </p>
                   </div>
                </TabPanel>
             </Tabs>
          </div>
        </div>

        {/* Right Column: Sidebar */}
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