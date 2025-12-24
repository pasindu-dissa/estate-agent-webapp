import React from 'react';
import { Search } from 'lucide-react';
import '../index.css';

export default function SearchForm({ filters, setFilters }) {
  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="search-card">
      <h2 className="search-title">
        <Search size={20} /> Property Search
      </h2>
      
      <div className="search-fields">
        <div className="form-group">
          <label>Type</label>
          <select 
            value={filters.type}
            onChange={e => handleChange('type', e.target.value)}
          >
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Bungalow">Bungalow</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Min Price</label>
            <input 
              type="number" 
              placeholder="£"
              value={filters.minPrice}
              onChange={e => handleChange('minPrice', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Max Price</label>
            <input 
              type="number" 
              placeholder="£"
              value={filters.maxPrice}
              onChange={e => handleChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Min Beds</label>
            <input 
              type="number" 
              value={filters.minBeds}
              onChange={e => handleChange('minBeds', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Max Beds</label>
            <input 
              type="number" 
              value={filters.maxBeds}
              onChange={e => handleChange('maxBeds', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Postcode Area</label>
          <input 
            type="text" 
            placeholder="e.g. BR1, SE20"
            value={filters.postcode}
            onChange={e => handleChange('postcode', e.target.value)}
          />
        </div>

        <div className="date-section">
          <div className="form-group">
            <label>Date Added</label>
            <select 
              value={filters.dateAdded}
              onChange={e => handleChange('dateAdded', e.target.value)}
            >
              <option value="any">Anytime</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
            </select>
          </div>
          
          <div className="form-row date-range">
            <div>
               <span>From:</span>
               <input type="date" onChange={e => handleChange('dateFrom', e.target.value)} />
            </div>
            <div>
               <span>To:</span>
               <input type="date" onChange={e => handleChange('dateTo', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}