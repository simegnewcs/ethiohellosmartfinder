import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Search, 
  Star, 
  MapPin, 
  Hotel, 
  UtensilsCrossed, 
  Coffee,
  ShoppingCart,
  Building2,
  ArrowRight,
  TrendingUp,
  Award,
  Shield,
  Clock,
  Cake,
  Pill,
  Dumbbell,
  ShoppingBag,
  Wine,
  Hospital,
  ChevronRight,
  Sparkles,
  Heart,
} from "lucide-react";

interface HomeContext {
  activeCategory: string;
  setActiveCategory?: (category: string) => void;
}

const Home = () => {
  const { activeCategory } = useOutletContext<HomeContext>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Places");

  // Mock featured data for all categories
  const featuredItems = {
    hotels: [
      {
        id: 1,
        name: "Sheraton Addis",
        location: "Addis Ababa",
        price: 250,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        type: "hotel",
        path: "/hotel/1"
      },
      {
        id: 2,
        name: "Hyatt Regency",
        location: "Addis Ababa",
        price: 220,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
        type: "hotel",
        path: "/hotel/2"
      },
      {
        id: 3,
        name: "Hilton Addis",
        location: "Addis Ababa",
        price: 200,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
        type: "hotel",
        path: "/hotel/3"
      },
      {
        id: 4,
        name: "Radisson Blu",
        location: "Addis Ababa",
        price: 180,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
        type: "hotel",
        path: "/hotel/4"
      }
    ],
    restaurants: [
      {
        id: 1,
        name: "Habesha Restaurant",
        location: "Addis Ababa",
        cuisine: "Ethiopian",
        rating: 4.6,
        price: 25,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
        type: "restaurant",
        path: "/restaurant/1"
      },
      {
        id: 2,
        name: "Kategna Restaurant",
        location: "Addis Ababa",
        cuisine: "Traditional",
        rating: 4.5,
        price: 30,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
        type: "restaurant",
        path: "/restaurant/2"
      }
    ],
    coffee: [
      {
        id: 1,
        name: "Tomoca Coffee",
        location: "Addis Ababa",
        rating: 4.9,
        price: 5,
        image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop",
        type: "coffee",
        path: "/coffee-house/1"
      }
    ],
    supermarkets: [
      {
        id: 1,
        name: "Edna Mall Supermarket",
        location: "Addis Ababa",
        rating: 4.5,
        price: 3,
        image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=400&h=300&fit=crop",
        type: "supermarket",
        path: "/supermarket/1"
      }
    ]
  };

  const cities = [
    "All Places",
    "Addis Ababa",
    "Dire Dawa",
    "Bahir Dar",
    "Gondar",
    "Hawassa",
    "Mekelle",
    "Jimma",
    "Harar"
  ];

  const categories = [
    { id: "all", name: "All Places", icon: <Building2 size={24} />, path: "/", color: "#006747" },
    { id: "hotels", name: "Hotels", icon: <Hotel size={24} />, path: "/hotels", color: "#006747" },
    { id: "restaurants", name: "Restaurants", icon: <UtensilsCrossed size={24} />, path: "/restaurants", color: "#006747" },
    { id: "coffee", name: "Coffee Houses", icon: <Coffee size={24} />, path: "/coffee-houses", color: "#006747" },
    { id: "cakes", name: "Cake Shops", icon: <Cake size={24} />, path: "/cake-shops", color: "#E27AC0" },
    { id: "supermarkets", name: "Supermarkets", icon: <ShoppingCart size={24} />, path: "/supermarkets", color: "#006747" },
    { id: "pharmacies", name: "Pharmacies", icon: <Pill size={24} />, path: "/pharmacies", color: "#006747" },
    { id: "gyms", name: "Gyms", icon: <Dumbbell size={24} />, path: "/gyms", color: "#006747" },
    { id: "shopping", name: "Shopping Centers", icon: <ShoppingBag size={24} />, path: "/shopping-centers", color: "#006747" },
    { id: "bars", name: "Bars & Nightclubs", icon: <Wine size={24} />, path: "/bars", color: "#E27AC0" },
    { id: "hospitals", name: "Hospitals", icon: <Hospital size={24} />, path: "/hospitals", color: "#006747" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const cityParam = selectedCity === "All Places" ? "" : `&city=${encodeURIComponent(selectedCity)}`;
      navigate(`/search?q=${encodeURIComponent(searchQuery)}${cityParam}`);
    }
  };

  const handleCategoryClick = (categoryPath: string) => {
    navigate(categoryPath);
  };

  return (
    <div className="home-page">
      {/* HERO SECTION with Search */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-label">
              {activeCategory !== "all" ? `Explore ${activeCategory}` : "Welcome to HelloET"}
            </span>
            <h1 className="hero-title">
              Discover The Best <br />
              <span className="hero-accent">
                {activeCategory !== "all" ? activeCategory : "Places in Ethiopia"}
              </span>
            </h1>
            <p className="hero-description">
              Find and discover the finest hotels, restaurants, coffee houses, and services across Ethiopia.
              <strong> HelloET.com</strong> makes it easy to find your perfect place.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hero-search-form">
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder={`Search for ${activeCategory !== "all" ? activeCategory : "hotels, restaurants, coffee houses"} in ${selectedCity}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="hero-search-input"
                />
              </div>
              <select 
                className="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <button type="submit" className="search-btn-hero">
                Search
              </button>
            </form>
            
            <div className="hero-buttons">
              <Link to="/hotels" className="btn btn-primary">
                Explore Now <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn btn-secondary">
                List Your Business
              </Link>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Hotels</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">300+</span>
              <span className="stat-label">Restaurants</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Coffee Houses</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Browse By Category</span>
            <h2 className="section-title">Explore Places by Category</h2>
            <p className="section-subtitle">Find exactly what you're looking for</p>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-card ${activeCategory === category.id ? "active" : ""}`}
                onClick={() => handleCategoryClick(category.path)}
                style={{ "--category-color": category.color } as React.CSSProperties}
              >
                <div className="category-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h3 className="category-name">{category.name}</h3>
                <ChevronRight size={16} className="category-arrow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED HOTELS SECTION */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Top Rated</span>
            <h2 className="section-title">Featured Hotels</h2>
            <p className="section-subtitle">Discover the most luxurious stays in Ethiopia</p>
          </div>
          <div className="featured-grid">
            {featuredItems.hotels.map((hotel) => (
              <Link to={hotel.path} key={hotel.id} className="featured-card">
                <div className="card-image">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="card-rating">
                    <Star size={14} fill="#006747" stroke="#006747" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{hotel.name}</h3>
                  <div className="card-location">
                    <MapPin size={14} />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="card-price">
                    <span className="price">${hotel.price}</span>
                    <span className="per-night">/ night</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="view-all">
            <Link to="/hotels" className="view-all-link">
              View All Hotels <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED RESTAURANTS SECTION */}
      <section className="restaurants-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Popular Eateries</span>
            <h2 className="section-title">Top Restaurants</h2>
            <p className="section-subtitle">Experience authentic Ethiopian cuisine</p>
          </div>
          <div className="featured-grid">
            {featuredItems.restaurants.map((restaurant) => (
              <Link to={restaurant.path} key={restaurant.id} className="featured-card">
                <div className="card-image">
                  <img src={restaurant.image} alt={restaurant.name} />
                  <div className="card-rating">
                    <Star size={14} fill="#006747" stroke="#006747" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{restaurant.name}</h3>
                  <div className="card-location">
                    <MapPin size={14} />
                    <span>{restaurant.location}</span>
                  </div>
                  <div className="card-cuisine">
                    <span>{restaurant.cuisine} Cuisine</span>
                  </div>
                  <div className="card-price">
                    <span className="price">${restaurant.price}</span>
                    <span className="per-night">/ avg meal</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="view-all">
            <Link to="/restaurants" className="view-all-link">
              View All Restaurants <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="why-choose-section">
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-choose-content">
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">Your Trusted Discovery Platform</h2>
              <p className="section-subtitle">
                We help you discover the best places with confidence and ease
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Award size={24} />
                  </div>
                  <div className="feature-text">
                    <h4>Verified Businesses</h4>
                    <p>All businesses are thoroughly verified for authenticity</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Shield size={24} />
                  </div>
                  <div className="feature-text">
                    <h4>Secure & Reliable</h4>
                    <p>Safe and secure information with verified contacts</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="feature-text">
                    <h4>Best Price Guarantee</h4>
                    <p>We help you find the best deals available</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Clock size={24} />
                  </div>
                  <div className="feature-text">
                    <h4>24/7 Support</h4>
                    <p>Round-the-clock customer service assistance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-choose-image">
              <img 
                src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=500&fit=crop" 
                alt="Travel Experience"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>List Your Business With Us</h2>
            <p>Join hundreds of businesses already growing with HelloET.com</p>
            <Link to="/register" className="btn btn-primary">
              Register Your Business <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        /* CSS Variables - New Brand Colors */
        .home-page {
          --font-serif: "Times New Roman", Times, Georgia, Garamond, serif;
          --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          
          /* NEW BRAND COLORS */
          --color-primary: #006747;
          --color-primary-light: #008060;
          --color-primary-dim: #E6F4EF;
          --color-secondary: #EEF578;
          --color-secondary-dark: #E0E865;
          --color-accent: #E27AC0;
          --color-accent-light: #E895CD;
          --color-accent-dim: #FCE9F6;
          --color-mint: #D1EFE4;
          --color-mint-dark: #B8E0D0;
          
          --color-dark: #1a1a1a;
          --color-charcoal: #2c2c2c;
          --color-cream: #FAF9F5;
          --color-white: #ffffff;
          --color-gray: #6b7b7e;
          --color-gray-light: #e8e2d4;
          
          --shadow-sm: 0 4px 20px rgba(0, 103, 71, 0.08);
          --shadow-md: 0 8px 30px rgba(0, 103, 71, 0.12);
          --shadow-lg: 0 20px 40px rgba(0, 103, 71, 0.15);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Container */
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-label {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--color-primary);
          background: var(--color-primary-dim);
          padding: 0.3rem 1rem;
          border-radius: 40px;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-dark);
          margin-bottom: 0.75rem;
        }

        .section-subtitle {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-gray);
        }

        /* HERO SECTION */
        .hero-section {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #003d2d 0%, #006747 100%);
          background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=900&fit=crop');
          background-size: cover;
          background-position: center 30%;
          color: var(--color-white);
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 103, 71, 0.85) 0%,
            rgba(0, 61, 45, 0.9) 100%
          );
        }

        .hero-container {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          width: 90%;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .hero-content {
          max-width: 680px;
          text-align: left;
          animation: fadeInUp 0.8s ease-out;
        }

        .hero-label {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--color-secondary);
          background: rgba(238, 245, 120, 0.15);
          padding: 0.4rem 1rem;
          border-radius: 40px;
          margin-bottom: 1.5rem;
          font-weight: 500;
          backdrop-filter: blur(4px);
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: 4rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 1.25rem 0;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .hero-accent {
          color: var(--color-secondary);
          border-bottom: 3px solid var(--color-secondary);
          display: inline-block;
          padding-bottom: 4px;
        }

        .hero-description {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.92;
          max-width: 560px;
          color: rgba(255, 255, 255, 0.92);
        }

        .hero-description strong {
          font-weight: 700;
          color: var(--color-secondary);
        }

        /* Hero Search Form */
        .hero-search-form {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          flex: 2;
          display: flex;
          align-items: center;
          background: white;
          border-radius: 60px;
          padding: 0.2rem 1rem;
          gap: 0.5rem;
        }

        .search-icon {
          color: var(--color-primary);
        }

        .hero-search-input {
          flex: 1;
          border: none;
          padding: 0.8rem 0;
          font-family: var(--font-sans);
          font-size: 1rem;
          outline: none;
          background: transparent;
        }

        .city-select {
          padding: 0 1rem;
          border: none;
          border-radius: 60px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          background: white;
          cursor: pointer;
          outline: none;
          color: var(--color-dark);
        }

        .search-btn-hero {
          padding: 0.8rem 2rem;
          background: var(--color-secondary);
          color: var(--color-primary);
          border: none;
          border-radius: 60px;
          font-family: var(--font-sans);
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
        }

        .search-btn-hero:hover {
          background: var(--color-secondary-dark);
          transform: translateY(-2px);
        }

        .hero-buttons {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 1rem;
          padding: 0.85rem 2rem;
          border-radius: 48px;
          text-decoration: none;
          transition: var(--transition);
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background-color: var(--color-secondary);
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        .btn-primary:hover {
          background-color: var(--color-secondary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .btn-secondary {
          background-color: transparent;
          color: white;
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(4px);
        }

        .btn-secondary:hover {
          border-color: var(--color-secondary);
          background-color: rgba(238, 245, 120, 0.1);
          transform: translateY(-2px);
        }

        .hero-stats {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-secondary);
        }

        .stat-label {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0.8;
        }

        /* Categories Section */
        .categories-section {
          padding: 5rem 0;
          background: var(--color-white);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        .category-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: var(--color-white);
          border: 1px solid var(--color-gray-light);
          border-radius: 20px;
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }

        .category-card.active {
          border-color: var(--color-primary);
          background: var(--color-primary-dim);
        }

        .category-icon {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
        }

        .category-name {
          flex: 1;
          font-family: var(--font-serif);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-dark);
          margin: 0;
        }

        .category-arrow {
          opacity: 0;
          transition: var(--transition);
          color: var(--color-primary);
        }

        .category-card:hover .category-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        /* Featured Sections */
        .featured-section,
        .restaurants-section {
          padding: 4rem 0;
          background: var(--color-mint);
        }

        .restaurants-section {
          background: var(--color-white);
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .featured-card {
          background: var(--color-white);
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }

        .featured-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .card-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }

        .featured-card:hover .card-image img {
          transform: scale(1.05);
        }

        .card-rating {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--color-primary);
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: white;
          font-family: var(--font-sans);
          font-size: 0.8rem;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-content h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--color-dark);
        }

        .card-location {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-gray);
          margin-bottom: 0.5rem;
        }

        .card-price {
          margin-top: 0.75rem;
        }

        .price {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .per-night {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--color-gray);
        }

        .card-cuisine span {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--color-primary);
          background: var(--color-primary-dim);
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
        }

        .view-all {
          text-align: center;
          margin-top: 3rem;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-primary);
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition);
        }

        .view-all-link:hover {
          gap: 0.8rem;
          color: var(--color-primary-light);
        }

        /* Why Choose Us */
        .why-choose-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #FAF9F5 0%, #F5F4EF 100%);
        }

        .why-choose-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .feature-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          background: var(--color-mint);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
        }

        .feature-text h4 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          margin-bottom: 0.3rem;
          color: var(--color-dark);
        }

        .feature-text p {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-gray);
        }

        .why-choose-image img {
          width: 100%;
          border-radius: 30px;
          box-shadow: var(--shadow-lg);
        }

        /* CTA Section */
        .cta-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, var(--color-primary) 0%, #004d33 100%);
          text-align: center;
        }

        .cta-content h2 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: white;
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }

        .cta-content .btn-primary {
          background: var(--color-secondary);
          color: var(--color-primary);
        }

        .cta-content .btn-primary:hover {
          background: var(--color-secondary-dark);
          transform: translateY(-2px);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 968px) {
          .why-choose-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .why-choose-image {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-container {
            padding: 3rem 1.5rem;
          }

          .hero-stats {
            gap: 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .hero-search-form {
            flex-direction: column;
          }
          
          .search-input-wrapper,
          .city-select,
          .search-btn-hero {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.8rem;
          }

          .container {
            padding: 0 1rem;
          }

          .featured-grid {
            grid-template-columns: 1fr;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }

          .hero-stats {
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .stat-number {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;