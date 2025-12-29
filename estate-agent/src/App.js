import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Favourites from './components/Favourites';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import properties from './data/properties.json';
import './index.css';

export default function App() {
  const [view, setView] = useState('search'); // 'search' or 'property'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favourites, setFavourites] = useState([]);
  
  // Search State
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBeds: '',
    maxBeds: '',
    dateAdded: 'any', 
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });

  // Derived State: Filtered Properties
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Type Filter
      if (filters.type !== 'any' && prop.type !== filters.type) return false;
      
      // Price Filter
      if (filters.minPrice && prop.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && prop.price > parseInt(filters.maxPrice)) return false;
      
      // Beds Filter
      if (filters.minBeds && prop.bedrooms < parseInt(filters.minBeds)) return false;
      if (filters.maxBeds && prop.bedrooms > parseInt(filters.maxBeds)) return false;
      
      // Postcode Filter
      if (filters.postcode && !prop.postcodeArea.toLowerCase().includes(filters.postcode.toLowerCase())) return false;

      // Date Filter
      if (filters.dateAdded !== 'any') {
         // Using simulated current date (Jan 15, 2023) for data consistency
         const today = new Date(2023, 0, 15);
         const diffTime = Math.abs(today - prop.dateObj);
         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
         
         if (filters.dateAdded === 'last30' && diffDays > 30) return false;
         if (filters.dateAdded === 'last90' && diffDays > 90) return false;
      }
      
      // Custom Date Range
      if (filters.dateFrom && prop.dateObj < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && prop.dateObj > new Date(filters.dateTo)) return false;

      return true;
    });
  }, [filters]);

  // Handlers
  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("propertyId", propertyId);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const propertyToAdd = properties.find(p => p.id === propertyId);
    if (propertyToAdd && !favourites.find(f => f.id === propertyId)) {
      setFavourites([...favourites, propertyToAdd]);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const toggleFavourite = (property) => {
    if (favourites.find(f => f.id === property.id)) {
      setFavourites(favourites.filter(f => f.id !== property.id));
    } else {
      setFavourites([...favourites, property]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter(f => f.id !== id));
  };

  const clearFavourites = () => setFavourites([]);

  const viewDetails = (property) => {
    setSelectedProperty(property);
    setView('property');
    window.scrollTo(0,0);
  };

  const goBack = () => {
    setView('search');
    setSelectedProperty(null);
  };

  return (
    <div className="app-root">
      <Header onHomeClick={goBack} />

      <main className="main-content">
        {view === 'search' ? (
          <div className="container layout-grid">
            
            {/* Sidebar */}
            <aside className="sidebar">
              <SearchForm filters={filters} setFilters={setFilters} />
              <Favourites 
                favourites={favourites}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onRemove={removeFavourite}
                onClear={clearFavourites}
              />
            </aside>

            {/* Main Results */}
            <section className="content-area">
              <div className="results-header">
                <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0}}>Properties For Sale</h1>
                <span className="badge">
                  {filteredProperties.length} Results
                </span>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="no-results">
                  <h3>No properties found</h3>
                  <p>Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="property-grid">
                  {filteredProperties.map(prop => (
                    <PropertyCard 
                      key={prop.id} 
                      property={prop} 
                      onViewDetails={viewDetails}
                      onDragStart={handleDragStart}
                      isFavourite={!!favourites.find(f => f.id === prop.id)}
                      onToggleFav={toggleFavourite}
                    />
                  ))}
                </div>
              )}
            </section>

          </div>
        ) : (
          <PropertyDetails 
            property={selectedProperty}
            onBack={goBack}
            isFavourite={!!favourites.find(f => f.id === selectedProperty.id)}
            onToggleFav={toggleFavourite}
          />
        )}
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