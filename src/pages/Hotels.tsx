import { useState, useMemo } from "react";
import { hotels } from "../data/hotels";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Tag,
  DollarSign,
  Wifi,
  Car,
  Waves,
  UtensilsCrossed,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  X,
} from "lucide-react";

const Hotels = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const amenitiesList = ["wifi", "parking", "swimmingPool", "breakfast"];

  const ethiopianCities = [
    "Addis Ababa", "Bahir Dar", "Hawassa", "Gonder", "Dessie",
    "Debre Birhan", "Debre Markos", "Adama", "Jimma", "Arba Minch",
    "Lalibela", "Axum", "Harar", "Dire Dawa", "Mekelle", "Shashamane",
    "Soddo", "Wolaita Sodo", "Nekemte", "Assosa", "Gambela", "Jijiga",
    "Semera", "Bule Hora", "Dilla", "Hossana", "Debre Tabor", "Debre Berhan",
    "Sebeta", "Burayu", "Ambo", "Woldia", "Kombolcha", "Bati", "Kemise",
    "Mettu", "Bedele", "Gimbi", "Shire", "Adigrat", "Adwa", "Humera",
  ].sort();

  const categoriesList = [
    "Hotel", "Resort", "Lodge", "Restaurant", "Cafe", "Coffee Shop",
    "Guest House", "Bed & Breakfast", "Boutique Hotel", "Eco Lodge",
    "Spa & Wellness", "Motel", "Apartment", "Vacation Rental", "Camping Site",
  ].sort();

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const filteredHotels = useMemo(() => {
    let filtered = hotels.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.city.toLowerCase().includes(search.toLowerCase()) ||
        hotel.description?.toLowerCase().includes(search.toLowerCase());

      const matchesLocation = location === "" || hotel.city.toLowerCase() === location.toLowerCase();
      const matchesCategory = category === "" || hotel.category.toLowerCase() === category.toLowerCase();
      const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) => hotel[amenity as keyof typeof hotel] === true);

      return matchesSearch && matchesLocation && matchesCategory && matchesPrice && matchesAmenities;
    });

    switch (sortBy) {
      case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
      case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
      case "name": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [search, location, category, priceRange, selectedAmenities, sortBy]);

  const clearAllFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("");
    setPriceRange([0, 500]);
    setSelectedAmenities([]);
    setSortBy("default");
  };

  const activeFiltersCount = [
    location && true, category && true, selectedAmenities.length > 0 && true,
    (priceRange[0] > 0 || priceRange[1] < 500) && true,
  ].filter(Boolean).length;

  return (
    <div className="hotels-page-full">
      {/* HERO */}
      <div className="hero-full">
        <div className="hero-full-content">
          <span className="hero-badge">✦ ኢትዮጵያ • ETHIOPIA</span>
          <h1 className="hero-title">Discover Exceptional Places</h1>
          <p className="hero-description">
            Explore hand-picked hotels, resorts, restaurants, and cafés across
            Ethiopia's most beautiful cities
          </p>
        </div>
      </div>

      <div className="main-full">
        {/* FILTER BAR */}
        <div className="filter-bar-full">
          <div className="filter-bar-container">
            <div className="filter-bar-header" onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}>
              <div className="filter-info">
                <SlidersHorizontal size={18} />
                <span className="filter-title">Filters & Sorting</span>
                {activeFiltersCount > 0 && <span className="filter-badge">{activeFiltersCount} active</span>}
              </div>
              <div className="filter-controls">
                {activeFiltersCount > 0 && (
                  <button className="clear-filters-btn" onClick={(e) => { e.stopPropagation(); clearAllFilters(); }}>
                    Clear all
                  </button>
                )}
                <button className="collapse-btn">{isFilterCollapsed ? "▼" : "▲"}</button>
              </div>
            </div>

            <div className={`filter-bar-body ${isFilterCollapsed ? "collapsed" : "expanded"}`}>
              <div className="filters-grid-full">
                {/* Search */}
                <div className="filter-field">
                  <label className="field-label"><Search size={16} /> Search</label>
                  <input type="text" placeholder="Hotel name, city, or description..." value={search} onChange={(e) => setSearch(e.target.value)} className="field-input" />
                </div>

                {/* Location */}
                <div className="filter-field">
                  <label className="field-label"><MapPin size={16} /> Location (Ethiopia)</label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="field-select">
                    <option value="">All Ethiopian cities</option>
                    {ethiopianCities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>

                {/* Category */}
                <div className="filter-field">
                  <label className="field-label"><Tag size={16} /> Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="field-select">
                    <option value="">All types</option>
                    {categoriesList.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                {/* Price */}
                <div className="filter-field price-field">
                  <label className="field-label"><DollarSign size={16} /> Max Price: ${priceRange[1]}</label>
                  <input type="range" min="0" max="500" step="10" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="price-slider-full" />
                </div>

                {/* Amenities */}
                <div className="filter-field amenities-field">
                  <label className="field-label">Amenities</label>
                  <div className="amenities-group-full">
                    {amenitiesList.map((amenity) => (
                      <button key={amenity} className={`amenity-chip-full ${selectedAmenities.includes(amenity) ? "active" : ""}`} onClick={() => toggleAmenity(amenity)}>
                        {amenity === "wifi" && <><Wifi size={16} /> Wi-Fi</>}
                        {amenity === "parking" && <><Car size={16} /> Parking</>}
                        {amenity === "swimmingPool" && <><Waves size={16} /> Pool</>}
                        {amenity === "breakfast" && <><UtensilsCrossed size={16} /> Breakfast</>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sort + View */}
              <div className="controls-full">
                <div className="sort-section">
                  <label className="sort-label">Sort by:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select-full">
                    <option value="rating">Rating (Highest)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
                <div className="view-section">
                  <button className={`view-btn-full ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}><Grid size={16} /> Grid</button>
                  <button className={`view-btn-full ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}><List size={16} /> List</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="results-count-full">
          <span className="count-number">{filteredHotels.length}</span>
          <span className="count-text"> places found across Ethiopia</span>
        </div>

        <div className={`results-container-full ${viewMode}`}>
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel, index) => (
              <div key={hotel.id} className={`result-card-full ${viewMode}`} style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="card-image-area-full">
                  <img src={hotel.image} alt={hotel.name} className="card-img-full" />
                  {hotel.rating >= 4.5 && <span className="rating-badge-full"><Star size={14} /> {hotel.rating}</span>}
                  <span className="category-badge-full">{hotel.category}</span>
                </div>
                <div className="card-details-full">
                  <h3 className="hotel-title-full">{hotel.name}</h3>
                  <p className="hotel-location-full"><MapPin size={15} /> {hotel.city}, Ethiopia</p>
                  <div className="hotel-features-full">
                    {hotel.wifi && <span className="feature-full"><Wifi size={14} /> Wi-Fi</span>}
                    {hotel.parking && <span className="feature-full"><Car size={14} /> Parking</span>}
                    {hotel.swimmingPool && <span className="feature-full"><Waves size={14} /> Pool</span>}
                    {hotel.breakfast && <span className="feature-full"><UtensilsCrossed size={14} /> Breakfast</span>}
                  </div>
                  {hotel.description && (
                    <p className="hotel-description-full">
                      {hotel.description.substring(0, viewMode === "grid" ? 80 : 120)}...
                    </p>
                  )}
                  <div className="card-footer-full">
                    <div className="price-wrapper-full">
                      <span className="price-amount-full">${hotel.price}</span>
                      <span className="price-period-full">/night</span>
                    </div>
                    <Link to={`/hotel/${hotel.id}`} className="details-link-full">View Details →</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state-full">
              <div className="empty-icon-full"><Search size={30} /></div>
              <h3>No places found</h3>
              <p>Try adjusting your filters</p>
              <button onClick={clearAllFilters} className="empty-btn-full">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SHEET */}
      {isMobileFilterOpen && (
        <div className="mobile-sheet-overlay" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="mobile-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sheet-header">
              <h3>Filters</h3>
              <button className="close-sheet" onClick={() => setIsMobileFilterOpen(false)}><X size={20} /></button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BUTTON */}
      <button className="mobile-filter-trigger" onClick={() => setIsMobileFilterOpen(true)}>
        <SlidersHorizontal size={18} />
        <span>Filters</span>
        {activeFiltersCount > 0 && <span className="trigger-badge">{activeFiltersCount}</span>}
      </button>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hotels-page-full {
          --font-serif: "Times New Roman", Times, Georgia, "EB Garamond", serif;
          --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          
          /* NEW BRAND COLORS */
          --primary: #006747;
          --primary-light: #008060;
          --primary-dim: #E6F4EF;
          --secondary: #EEF578;
          --secondary-dark: #E0E865;
          --accent: #E27AC0;
          --mint: #D1EFE4;
          
          --dark: #1e2a2e;
          --gray: #5a6b6f;
          --gray-light: #e2ddd0;
          --bg: var(--mint);
          --white: #ffffff;
          --shadow: 0 4px 20px rgba(0, 103, 71, 0.08);
          --shadow-hover: 0 12px 32px rgba(0, 103, 71, 0.12);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* HERO FULL WIDTH */
        .hero-full {
          width: 100%;
          background: linear-gradient(135deg, #003d2d 0%, #006747 100%);
          padding: 3rem 1rem;
          text-align: center;
        }

        .hero-full-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .hero-badge {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--secondary);
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 600;
          color: white;
          margin: 0.5rem 0 1rem;
        }

        .hero-description {
          font-family: var(--font-serif);
          font-size: clamp(0.9rem, 3vw, 1rem);
          color: rgba(255, 255, 255, 0.85);
        }

        /* MAIN - NO PADDING/MARGIN */
        .main-full {
          width: 100%;
          background: var(--bg);
        }

        /* COLLAPSIBLE FILTER BAR */
        .filter-bar-full {
          width: 100%;
          background: var(--white);
          border-bottom: 1px solid var(--gray-light);
        }

        .filter-bar-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .filter-bar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .filter-bar-header:hover {
          background: rgba(0, 103, 71, 0.02);
        }

        .filter-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .filter-title {
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: 1rem;
        }

        .filter-badge {
          background: var(--primary);
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
        }

        .filter-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .clear-filters-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          cursor: pointer;
          text-decoration: underline;
        }

        .collapse-btn {
          background: none;
          border: none;
          font-size: 0.8rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .filter-bar-body {
          overflow: hidden;
          transition: max-height 0.4s ease-out, opacity 0.3s ease, padding 0.3s ease;
        }

        .filter-bar-body.collapsed {
          max-height: 0;
          opacity: 0;
          padding: 0;
        }

        .filter-bar-body.expanded {
          max-height: 800px;
          opacity: 1;
          padding: 1.5rem 1rem;
        }

        .filters-grid-full {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-label {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--gray);
        }

        .field-input, .field-select {
          padding: 0.7rem;
          border: 1px solid var(--gray-light);
          border-radius: 12px;
          font-family: var(--font-serif);
          font-size: 0.9rem;
          transition: var(--transition);
        }

        .field-input:focus, .field-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0, 103, 71, 0.1);
        }

        .price-slider-full {
          width: 100%;
          height: 4px;
          border-radius: 5px;
          background: var(--gray-light);
          outline: none;
          -webkit-appearance: none;
        }

        .price-slider-full::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
        }

        .amenities-group-full {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .amenity-chip-full {
          padding: 0.4rem 1rem;
          border: 1px solid var(--gray-light);
          border-radius: 30px;
          background: var(--white);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .amenity-chip-full.active {
          background: var(--primary-dim);
          border-color: var(--primary);
          color: var(--primary);
          transform: scale(1.02);
        }

        .controls-full {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--gray-light);
        }

        .sort-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sort-label {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--gray);
        }

        .sort-select-full {
          padding: 0.4rem 1rem;
          border: 1px solid var(--gray-light);
          border-radius: 30px;
          font-family: var(--font-sans);
          background: var(--white);
        }

        .view-section {
          display: flex;
          gap: 0.5rem;
        }

        .view-btn-full {
          padding: 0.4rem 1rem;
          border: 1px solid var(--gray-light);
          border-radius: 30px;
          background: var(--white);
          cursor: pointer;
          transition: var(--transition);
        }

        .view-btn-full.active {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        /* Results Count */
        .results-count-full {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem;
          text-align: right;
          font-family: var(--font-sans);
          border-bottom: 1px solid var(--gray-light);
        }

        .count-number {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--primary);
        }

        /* Results Container */
        .results-container-full {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .results-container-full.grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .results-container-full.list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Cards */
        .result-card-full {
          background: var(--white);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: var(--transition);
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .result-card-full:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }

        .result-card-full.grid .card-image-area-full {
          height: 220px;
        }

        .result-card-full.list {
          display: flex;
        }

        .result-card-full.list .card-image-area-full {
          width: 240px;
          height: 180px;
          flex-shrink: 0;
        }

        .card-image-area-full {
          position: relative;
          overflow: hidden;
        }

        .card-img-full {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .result-card-full:hover .card-img-full {
          transform: scale(1.05);
        }

        .rating-badge-full {
          position: absolute;
          top: 10px;
          right: 10px;
          background: var(--primary);
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
        }

        .category-badge-full {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          color: white;
          padding: 0.2rem 0.7rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
        }

        .card-details-full {
          padding: 1rem;
        }

        .hotel-title-full {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.25rem;
        }

        .hotel-location-full {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--gray);
          margin-bottom: 0.5rem;
        }

        .hotel-features-full {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .feature-full {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--primary);
        }

        .hotel-description-full {
          font-family: var(--font-serif);
          font-size: 0.8rem;
          color: var(--gray);
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .card-footer-full {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--gray-light);
        }

        .price-amount-full {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--primary);
        }

        .price-period-full {
          font-size: 0.7rem;
          color: var(--gray);
        }

        .details-link-full {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          text-decoration: none;
          color: var(--dark);
          transition: var(--transition);
        }

        .details-link-full:hover {
          color: var(--primary);
          transform: translateX(4px);
        }

        /* Empty State */
        .empty-state-full {
          text-align: center;
          padding: 3rem;
          background: var(--white);
          border-radius: 20px;
        }

        .empty-icon-full {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-btn-full {
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background: none;
          border: 1px solid var(--primary);
          border-radius: 30px;
          color: var(--primary);
          cursor: pointer;
          transition: var(--transition);
        }

        .empty-btn-full:hover {
          background: var(--primary);
          color: white;
        }

        /* Mobile Filter Trigger */
        .mobile-filter-trigger {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: none;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          font-family: var(--font-sans);
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 100;
          transition: var(--transition);
        }

        .mobile-filter-trigger:hover {
          transform: scale(1.05);
        }

        .trigger-badge {
          background: white;
          color: var(--primary);
          border-radius: 20px;
          padding: 0.1rem 0.5rem;
          font-size: 0.7rem;
        }

        /* Mobile Bottom Sheet */
        .mobile-sheet-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .mobile-sheet {
          background: var(--white);
          width: 100%;
          max-height: 85vh;
          border-radius: 24px 24px 0 0;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .mobile-sheet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--gray-light);
        }

        .close-sheet {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .mobile-filter-trigger {
            display: flex;
          }

          .results-container-full.grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .result-card-full.list {
            flex-direction: column;
          }

          .result-card-full.list .card-image-area-full {
            width: 100%;
            height: 200px;
          }

          .filters-grid-full {
            grid-template-columns: 1fr;
          }

          .controls-full {
            flex-direction: column;
            align-items: stretch;
          }

          .sort-section {
            justify-content: space-between;
          }
        }

        @media (max-width: 480px) {
          .filter-info {
            gap: 0.5rem;
          }

          .filter-title {
            font-size: 0.9rem;
          }

          .filter-badge {
            font-size: 0.6rem;
          }

          .clear-filters-btn {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Hotels;