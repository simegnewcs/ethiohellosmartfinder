import { useState, useMemo } from "react";
import { pharmacies } from "../data/pharmacies";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
 
  Pill,
  Clock,
  Truck,
  Phone,
 
  SlidersHorizontal,
  Grid,
  List,
  Star,
  
  AlertCircle,
} from "lucide-react";

const Pharmacies = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);

  const ethiopianCities = [
    "Addis Ababa", "Bahir Dar", "Hawassa", "Gonder", "Dessie",
    "Adama", "Jimma", "Dire Dawa", "Mekelle", "Shashamane", "Nekemte"
  ].sort();

  const pharmacyTypesList = [
    "Community Pharmacy", "Hospital Pharmacy", "Retail Pharmacy",
    "Online Pharmacy", "24 Hour Pharmacy", "Specialty Pharmacy",
    "Compounding Pharmacy", "Clinic Pharmacy"
  ].sort();

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const filteredPharmacies = useMemo(() => {
    let filtered = pharmacies.filter((pharmacy) => {
      const matchesSearch =
        pharmacy.name.toLowerCase().includes(search.toLowerCase()) ||
        pharmacy.city.toLowerCase().includes(search.toLowerCase()) ||
        pharmacy.description?.toLowerCase().includes(search.toLowerCase());

      const matchesLocation = location === "" || pharmacy.city === location;
      const matchesCategory = category === "" || pharmacy.category === category;
      const matchesPrice = pharmacy.rating >= priceRange[0] && pharmacy.rating <= priceRange[1];
      
      const matchesServices =
        selectedServices.length === 0 ||
        selectedServices.every((service) =>
          service === "24hours" ? pharmacy.is24Hours :
          service === "delivery" ? pharmacy.hasDelivery :
          service === "emergency" ? pharmacy.hasEmergency : false
        );

      return matchesSearch && matchesLocation && matchesCategory && matchesPrice && matchesServices;
    });

    switch (sortBy) {
      case "rating-asc": filtered.sort((a, b) => a.rating - b.rating); break;
      case "rating-desc": filtered.sort((a, b) => b.rating - a.rating); break;
      case "name": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [search, location, category, priceRange, selectedServices, sortBy]);

  const clearAllFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("");
    setPriceRange([0, 5]);
    setSelectedServices([]);
    setSortBy("rating-desc");
  };

  const activeFiltersCount = [
    location && true, category && true, selectedServices.length > 0 && true, priceRange[1] < 5 && true
  ].filter(Boolean).length;

  return (
    <div className="pharmacy-pages-full">
      {/* HERO */}
      <div className="hero-full">
        <div className="hero-full-content">
          <span className="hero-badge">💊 ETHIOPIA • HEALTHCARE</span>
          <h1 className="hero-title">Discover Best Pharmacies</h1>
          <p className="hero-description">
            Find trusted pharmacies, medicine delivery, and healthcare services across Ethiopia
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
                  <button type="button" className="clear-filters-btn" onClick={(e) => { e.stopPropagation(); clearAllFilters(); }}>
                    Clear all
                  </button>
                )}
                <button type="button" className="collapse-btn">{isFilterCollapsed ? "▼" : "▲"}</button>
              </div>
            </div>

            <div className={`filter-bar-body ${isFilterCollapsed ? "collapsed" : "expanded"}`}>
              <div className="filters-grid-full">
                <div className="filter-field">
                  <label className="field-label"><Search size={16} /> Search</label>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pharmacies..." className="field-input" />
                </div>

                <div className="filter-field">
                  <label className="field-label"><MapPin size={16} /> City</label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="field-select">
                    <option value="">All cities</option>
                    {ethiopianCities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>

                <div className="filter-field">
                  <label className="field-label"><Pill size={16} /> Pharmacy Type</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="field-select">
                    <option value="">All types</option>
                    {pharmacyTypesList.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>

                <div className="filter-field">
                  <label className="field-label"><Star size={16} /> Min Rating: {priceRange[1]}</label>
                  <input type="range" min="0" max="5" step="0.5" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])} className="price-slider-full" />
                  <div className="price-range-labels">
                    <span>★ 0</span>
                    <span>★ 1</span>
                    <span>★ 2</span>
                    <span>★ 3</span>
                    <span>★ 4</span>
                    <span>★ 5</span>
                  </div>
                </div>

                <div className="filter-field">
                  <label className="field-label">Services</label>
                  <div className="amenities-group-full">
                    <button type="button" className={`amenity-chip-full ${selectedServices.includes("24hours") ? "active" : ""}`} onClick={() => toggleService("24hours")}>
                      <Clock size={16} /> 24 Hours
                    </button>
                    <button type="button" className={`amenity-chip-full ${selectedServices.includes("delivery") ? "active" : ""}`} onClick={() => toggleService("delivery")}>
                      <Truck size={16} /> Delivery
                    </button>
                    <button type="button" className={`amenity-chip-full ${selectedServices.includes("emergency") ? "active" : ""}`} onClick={() => toggleService("emergency")}>
                      <AlertCircle size={16} /> Emergency
                    </button>
                  </div>
                </div>
              </div>

              <div className="controls-full">
                <div className="sort-section">
                  <label className="sort-label">Sort:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select-full">
                    <option value="rating-desc">Highest Rated</option>
                    <option value="rating-asc">Lowest Rated</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                <div className="view-section">
                  <button type="button" className={`view-btn-full ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}><Grid size={16} /></button>
                  <button type="button" className={`view-btn-full ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}><List size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="results-count-full">
          <span className="count-number">{filteredPharmacies.length}</span> pharmacies found
        </div>

        <div className={`results-container-full ${viewMode}`}>
          {filteredPharmacies.length > 0 ? (
            filteredPharmacies.map((pharmacy, index) => (
              <div key={pharmacy.id} className={`result-card-full ${viewMode}`} style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="card-image-area-full">
                  <img src={pharmacy.image} alt={pharmacy.name} className="card-img-full" />
                  <span className="rating-badge-full"><Star size={14} /> {pharmacy.rating}</span>
                  <span className="category-badge-full">{pharmacy.category || "Pharmacy"}</span>
                  {pharmacy.is24Hours && <span className="hours-badge-full"><Clock size={12} /> 24/7</span>}
                </div>
                <div className="card-details-full">
                  <h3 className="hotel-title-full">{pharmacy.name}</h3>
                  <p className="hotel-location-full"><MapPin size={14} /> {pharmacy.city}, Ethiopia</p>
                  <div className="hotel-features-full">
                    {pharmacy.hasDelivery && <span className="feature-full"><Truck size={12} /> Delivery</span>}
                    {pharmacy.hasEmergency && <span className="feature-full"><AlertCircle size={12} /> Emergency</span>}
                    {pharmacy.is24Hours && <span className="feature-full"><Clock size={12} /> 24/7 Service</span>}
                  </div>
                  <p className="hotel-description-full">{pharmacy.description?.slice(0, 90)}...</p>
                  <div className="card-footer-full">
                    <div className="contact-info">
                      {pharmacy.phone && (
                        <span className="phone-number"><Phone size={12} /> {pharmacy.phone}</span>
                      )}
                    </div>
                    <Link to={`/pharmacy/${pharmacy.id}`} className="details-link-full">View →</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state-full">
              <Pill size={30} />
              <h3>No pharmacies found</h3>
              <p>Try adjusting your filters or search criteria</p>
              <button type="button" onClick={clearAllFilters} className="empty-btn-full">Clear filters</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .pharmacy-pages-full {
          --font-serif: "Times New Roman", Times, Georgia, "EB Garamond", serif;
          --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          --gold: #b8860b;
          --gold-light: #d4af37;
          --gold-dim: #faf4e8;
          --dark: #1e2a2e;
          --gray: #5a6b6f;
          --gray-light: #e2ddd0;
          --bg: #fefcf8;
          --white: #ffffff;
          --green: #2e7d32;
          --green-light: #4caf50;
          --green-dim: #e8f5e9;
          --shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          --shadow-hover: 0 12px 32px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* HERO SECTION */
        .hero-full {
          width: 100%;
          background: linear-gradient(135deg, #1a2a1a 0%, #0f1a0f 100%);
          background-image: url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&h=400&fit=crop');
          background-size: cover;
          background-position: center 30%;
          position: relative;
          padding: 4rem 1rem;
          text-align: center;
        }
        
        .hero-full::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
        }
        
        .hero-full-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .hero-badge {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--green-light);
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

        /* MAIN CONTENT */
        .main-full {
          width: 100%;
          background: var(--bg);
        }

        /* FILTER BAR */
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
          background: rgba(0, 0, 0, 0.01);
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
          background: var(--green);
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
          color: var(--green);
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
          display: flex;
          align-items: center;
          gap: 0.3rem;
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
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
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
          background: var(--green);
          cursor: pointer;
        }
        
        .price-range-labels {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          color: var(--gray);
          margin-top: 0.25rem;
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
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        
        .amenity-chip-full.active {
          background: var(--green-dim);
          border-color: var(--green);
          color: var(--green);
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
          background: var(--green);
          border-color: var(--green);
          color: white;
        }
        
        /* RESULTS COUNT */
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
          color: var(--green);
        }
        
        /* RESULTS CONTAINER */
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
        
        /* CARDS */
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
          background: var(--green);
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.2rem;
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
        
        .hours-badge-full {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          gap: 0.2rem;
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
          display: flex;
          align-items: center;
          gap: 0.2rem;
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
          padding: 0.2rem 0.5rem;
          background: var(--green-dim);
          border-radius: 20px;
          color: var(--green);
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
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
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .phone-number {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--green);
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
        
        .details-link-full {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          text-decoration: none;
          color: var(--dark);
          transition: var(--transition);
        }
        
        .details-link-full:hover {
          color: var(--green);
          transform: translateX(4px);
        }
        
        /* EMPTY STATE */
        .empty-state-full {
          text-align: center;
          padding: 3rem;
          background: var(--white);
          border-radius: 20px;
        }
        
        .empty-state-full h3 {
          font-family: var(--font-serif);
          margin: 0.5rem 0;
        }
        
        .empty-state-full p {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--gray);
        }
        
        .empty-btn-full {
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background: none;
          border: 1px solid var(--green);
          border-radius: 30px;
          color: var(--green);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .empty-btn-full:hover {
          background: var(--green);
          color: white;
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
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
          
          .card-footer-full {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Pharmacies;