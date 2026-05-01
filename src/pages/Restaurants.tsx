import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Tag,
  DollarSign,
  Wifi,
  Car,
  UtensilsCrossed,
  Coffee,
  SlidersHorizontal,
  Grid,
  List,
  Star,
} from "lucide-react";

const restaurantData = [
  {
    id: 1,
    name: "Addis Garden Restaurant",
    city: "Addis Ababa",
    category: "Restaurant",
    price: 35,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    description: "Luxury dining experience with Ethiopian and international dishes. Enjoy stunning garden views and authentic flavors.",
    wifi: true,
    parking: true,
    breakfast: true,
    coffee: true,
  },
  {
    id: 2,
    name: "Lake View Café",
    city: "Bahir Dar",
    category: "Cafe",
    price: 20,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    description: "Beautiful café with lake views, fresh coffee, and breakfast. Perfect for relaxation and remote work.",
    wifi: true,
    parking: false,
    breakfast: true,
    coffee: true,
  },
  {
    id: 3,
    name: "Harar Traditional House",
    city: "Harar",
    category: "Restaurant",
    price: 25,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    description: "Traditional Ethiopian cultural food and coffee experience in the historic city of Harar.",
    wifi: false,
    parking: true,
    breakfast: false,
    coffee: true,
  },
  {
    id: 4,
    name: "Sishu Restaurant",
    city: "Addis Ababa",
    category: "Fine Dining",
    price: 55,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    description: "Upscale international cuisine with Ethiopian fusion. Award-winning chefs and premium ingredients.",
    wifi: true,
    parking: true,
    breakfast: false,
    coffee: true,
  },
  {
    id: 5,
    name: "Hawassa Fish Market",
    city: "Hawassa",
    category: "Restaurant",
    price: 18,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    description: "Fresh catch of the day served with stunning lake views. Local fish specialties.",
    wifi: false,
    parking: true,
    breakfast: false,
    coffee: false,
  },
];

const Restaurants = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);

  const ethiopianCities = [
    "Addis Ababa", "Adama", "Bahir Dar", "Hawassa", "Harar", "Dire Dawa",
    "Mekelle", "Jimma", "Gondar", "Debre Birhan", "Arba Minch", "Shashemene",
    "Dessie", "Nekemte", "Assosa", "Jijiga", "Semera", "Axum", "Lalibela", "Wolaita Sodo",
  ];

  const categoriesList = ["Restaurant", "Cafe", "Coffee Shop", "Fine Dining", "Traditional Food"];

  const amenitiesList = ["wifi", "parking", "breakfast", "coffee"];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]
    );
  };

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurantData.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(search.toLowerCase());

      const matchesLocation = location === "" || restaurant.city.toLowerCase() === location.toLowerCase();
      const matchesCategory = category === "" || restaurant.category.toLowerCase() === category.toLowerCase();
      const matchesPrice = restaurant.price >= priceRange[0] && restaurant.price <= priceRange[1];

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) => restaurant[amenity as keyof typeof restaurant] === true);

      return matchesSearch && matchesLocation && matchesCategory && matchesPrice && matchesAmenities;
    });

    switch (sortBy) {
      case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
      case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
      case "name": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [search, location, category, priceRange, selectedAmenities, sortBy]);

  const clearAllFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("");
    setPriceRange([0, 150]);
    setSelectedAmenities([]);
    setSortBy("rating");
    setViewMode("grid");
  };

  const activeFiltersCount = [
    location && true, category && true, selectedAmenities.length > 0 && true,
    (priceRange[0] > 0 || priceRange[1] < 150) && true,
  ].filter(Boolean).length;

  return (
    <div className="restaurants-page-full">
      <div className="hero-full">
        <div className="hero-full-content">
          <span className="hero-badge">✦ ETHIOPIA • RESTAURANTS</span>
          <h1 className="hero-title">Discover Amazing Restaurants</h1>
          <p className="hero-description">
            Explore top restaurants, cafés, and coffee shops across Ethiopia
          </p>
        </div>
      </div>

      <div className="main-full">
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
                  <button className="clear-filters-btn-small" onClick={(e) => { e.stopPropagation(); clearAllFilters(); }}>
                    Clear all
                  </button>
                )}
                <button className="collapse-btn">{isFilterCollapsed ? "▼" : "▲"}</button>
              </div>
            </div>

            <div className={`filter-bar-body ${isFilterCollapsed ? "collapsed" : "expanded"}`}>
              <div className="filters-grid-full">
                <div className="filter-field">
                  <label className="field-label"><Search size={16} /> Search</label>
                  <input type="text" placeholder="Restaurant name..." value={search} onChange={(e) => setSearch(e.target.value)} className="field-input" />
                </div>

                <div className="filter-field">
                  <label className="field-label"><MapPin size={16} /> Location</label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="field-select">
                    <option value="">All Cities</option>
                    {ethiopianCities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>

                <div className="filter-field">
                  <label className="field-label"><Tag size={16} /> Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="field-select">
                    <option value="">All Types</option>
                    {categoriesList.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>

                <div className="filter-field">
                  <label className="field-label"><DollarSign size={16} /> Max Price: ${priceRange[1]}</label>
                  <input type="range" min="0" max="150" step="5" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="price-slider-full" />
                </div>
              </div>

              <div className="amenities-group-full">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    className={`amenity-chip-full ${selectedAmenities.includes(amenity) ? "active" : ""}`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity === "wifi" && <Wifi size={16} />}
                    {amenity === "parking" && <Car size={16} />}
                    {amenity === "breakfast" && <UtensilsCrossed size={16} />}
                    {amenity === "coffee" && <Coffee size={16} />}
                    {amenity}
                  </button>
                ))}
              </div>

              <div className="controls-full">
                <div className="sort-section">
                  <span className="sort-label">Sort by:</span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select-full">
                    <option value="rating">Rating (Highest)</option>
                    <option value="price-asc">Price Low to High</option>
                    <option value="price-desc">Price High to Low</option>
                    <option value="name">Name A to Z</option>
                  </select>
                </div>

                <div className="view-section">
                  <button className={`view-btn-full ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
                    <Grid size={16} /> Grid
                  </button>
                  <button className={`view-btn-full ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
                    <List size={16} /> List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="results-count-full">
          <span className="count-number">{filteredRestaurants.length}</span> restaurants found
        </div>

        <div className={`results-container-full ${viewMode}`}>
          {filteredRestaurants.map((restaurant, index) => (
            <div key={restaurant.id} className={`result-card-full ${viewMode}`} style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="card-image-area-full">
                <img src={restaurant.image} alt={restaurant.name} className="card-img-full" />
                <span className="rating-badge-full"><Star size={14} /> {restaurant.rating}</span>
                <span className="category-badge-full">{restaurant.category}</span>
              </div>
              <div className="card-details-full">
                <h3 className="hotel-title-full">{restaurant.name}</h3>
                <p className="hotel-location-full"><MapPin size={15} /> {restaurant.city}</p>
                <div className="hotel-features-full">
                  {restaurant.wifi && <span className="feature-full"><Wifi size={12} /> Wi-Fi</span>}
                  {restaurant.parking && <span className="feature-full"><Car size={12} /> Parking</span>}
                  {restaurant.coffee && <span className="feature-full"><Coffee size={12} /> Coffee</span>}
                </div>
                <p className="hotel-description-full">{restaurant.description.substring(0, 100)}...</p>
                <div className="card-footer-full">
                  <div>
                    <span className="price-amount-full">${restaurant.price}</span>
                    <span className="price-period-full"> /meal</span>
                  </div>
                  <Link to={`/restaurant/${restaurant.id}`} className="details-link-full">View Details →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .restaurants-page-full {
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

        /* HERO */
        .hero-full {
          width: 100%;
          background: linear-gradient(135deg, #003d2d 0%, #006747 100%);
          padding: 4rem 1rem;
          text-align: center;
        }

        .hero-full-content {
          max-width: 800px;
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
          font-size: clamp(2rem, 5vw, 3rem);
          color: white;
          margin: 0.8rem 0 1rem;
          font-weight: 700;
        }

        .hero-description {
          font-family: var(--font-serif);
          font-size: 1rem;
          color: rgba(255,255,255,0.85);
          line-height: 1.7;
        }

        /* MAIN */
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
          font-size: 1rem;
          font-weight: 600;
          color: var(--dark);
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

        .clear-filters-btn-small {
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
          color: var(--primary);
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
          padding: 1.5rem;
        }

        .filters-grid-full {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.2rem;
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
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .amenity-chip-full {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--gray-light);
          border-radius: 30px;
          background: var(--white);
          cursor: pointer;
          font-size: 0.8rem;
          font-family: var(--font-sans);
          transition: var(--transition);
        }

        .amenity-chip-full:hover {
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-2px);
        }

        .amenity-chip-full.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .controls-full {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid var(--gray-light);
        }

        .sort-section {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .sort-label {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
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
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 1rem;
          border: 1px solid var(--gray-light);
          border-radius: 30px;
          background: var(--white);
          cursor: pointer;
          transition: var(--transition);
          font-family: var(--font-sans);
        }

        .view-btn-full:hover {
          border-color: var(--primary);
        }

        .view-btn-full.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        /* RESULTS COUNT */
        .results-count-full {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem;
          border-bottom: 1px solid var(--gray-light);
          text-align: right;
          font-family: var(--font-sans);
        }

        .count-number {
          color: var(--primary);
          font-size: 1.1rem;
          font-weight: 700;
        }

        /* RESULTS */
        .results-container-full {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .results-container-full.grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 1.5rem;
        }

        .results-container-full.list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* CARD */
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

        .result-card-full.list {
          display: flex;
        }

        .result-card-full.list .card-image-area-full {
          width: 280px;
          min-width: 280px;
          height: auto;
        }

        .card-image-area-full {
          position: relative;
          height: 220px;
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

        .card-details-full {
          padding: 1rem;
          flex: 1;
        }

        .hotel-title-full {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 0.3rem;
        }

        .hotel-location-full {
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
          font-size: 0.65rem;
          padding: 0.2rem 0.5rem;
          background: var(--primary-dim);
          border-radius: 20px;
          color: var(--primary);
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
        }

        .hotel-description-full {
          font-size: 0.8rem;
          color: var(--gray);
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .card-footer-full {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--gray-light);
        }

        .price-amount-full {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--primary);
          font-family: var(--font-serif);
        }

        .price-period-full {
          font-size: 0.7rem;
          color: var(--gray);
        }

        .details-link-full {
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8rem;
          color: var(--dark);
          transition: var(--transition);
        }

        .details-link-full:hover {
          color: var(--primary);
          transform: translateX(4px);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .results-container-full.grid {
            grid-template-columns: 1fr;
          }

          .result-card-full.list {
            flex-direction: column;
          }

          .result-card-full.list .card-image-area-full {
            width: 100%;
            min-width: 100%;
            height: 220px;
          }

          .controls-full {
            flex-direction: column;
            align-items: stretch;
          }

          .sort-section {
            justify-content: space-between;
          }

          .view-section {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.8rem;
          }

          .hero-description {
            font-size: 0.9rem;
          }

          .filter-title {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Restaurants;