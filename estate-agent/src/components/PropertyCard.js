import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import '../index.css';

export default function PropertyCard({ property, onViewDetails, onDragStart, isFavourite, onToggleFav }) {
  return (
    <div 
      draggable="true"
      onDragStart={(e) => onDragStart(e, property.id)}
      className="card property-card"
    >
      <div className="card-image-container">
        <img 
          src={property.images[0]} 
          alt={property.type} 
          className="card-img"
        />
        <div className="card-overlay-btn">
           <button 
            onClick={(e) => { e.stopPropagation(); onToggleFav(property); }}
            className={`fav-btn-circle ${isFavourite ? 'active' : ''}`}
           >
             <Heart size={20} fill={isFavourite ? "currentColor" : "none"} />
           </button>
        </div>
        <div className="card-price-overlay">
          <p>£{property.price.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="card-body">
        <div className="card-header-row">
          <h3 className="card-title">{property.type}</h3>
          <span className="card-badge">{property.bedrooms} Beds</span>
        </div>
        <div className="card-location">
          <MapPin size={16} className="icon-small" />
          {property.location}
        </div>
        <p className="card-desc">
          {property.description}
        </p>
        <button 
          onClick={() => onViewDetails(property)}
          className="btn btn-primary btn-full"
        >
          View Details
        </button>
      </div>
    </div>
  );
}