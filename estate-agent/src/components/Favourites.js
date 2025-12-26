import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import '../index.css';

export default function Favourites({ favourites, onDragOver, onDrop, onRemove, onClear }) {
  return (
    <div 
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="favourites-card"
    >
      <div className="fav-header">
         <h2 className="fav-title">
          <Heart size={20} className="icon-heart" fill="currentColor" /> Favourites
        </h2>
        {favourites.length > 0 && (
          <button onClick={onClear} className="btn-clear">Clear All</button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="fav-empty">
          <p>Drag properties here</p>
          <span className="fav-empty-sub">or click the heart icon</span>
        </div>
      ) : (
        <div className="fav-list">
          {favourites.map(fav => (
            <div key={fav.id} className="fav-item">
               <img src={fav.images[0]} alt="" className="fav-thumb" />
               <div className="fav-info">
                 <p className="fav-name">{fav.type}</p>
                 <p className="fav-price">£{fav.price.toLocaleString()}</p>
               </div>
               <button 
                onClick={() => onRemove(fav.id)}
                className="btn-remove-fav"
               >
                 <Trash2 size={16} />
               </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}