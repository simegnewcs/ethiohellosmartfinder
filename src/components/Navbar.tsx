import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Search,
  User,
  ChevronDown,
  Moon,
  Sun,
  Bell,
  MapPin,
  ChevronRight,
  LayoutGrid,
  Building2,
  X,
  Menu,
} from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Places");
  const location = useLocation();

  const locations = [
    "All Places",
    "Addis Ababa",
    "Dire Dawa",
    "Bahir Dar",
    "Gondar",
    "Hawassa",
    "Mekelle",
    "Jimma",
    "Harar",
    "Adama",
    "Dessie",
    "Lalibela",
    "Axum",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsLocationOpen(false);
    setIsSearchOpen(false);
    setIsHamburgerOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const cityParam =
        selectedLocation === "All Places"
          ? ""
          : `&city=${encodeURIComponent(selectedLocation)}`;
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}${cityParam}`;
    }
  };

  // Helper function to apply location filter from mobile drawer
  const applyLocationFilter = (city: string) => {
    setIsHamburgerOpen(false);
    if (city === "All Places") {
      window.location.href = "/search";
    } else {
      window.location.href = `/search?city=${encodeURIComponent(city)}`;
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo Section */}
          <Link to="/" className="logo-wrapper">
            <div className="logo-icon">
              <img src="/logo.jpg" alt="HelloET Logo" className="logo-img" />
            </div>
            
          </Link>

          {/* Desktop Categories Button - visible on desktop only */}
          <button className="nav-categories-btn desktop-only" onClick={onMenuClick}>
            <LayoutGrid size={20} />
            <span>Browse Categories</span>
          </button>

          {/* Location Selector - desktop only */}
          <div className="location-selector-wrapper desktop-only">
            <button
              className="location-selector-btn"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <MapPin size={16} />
              <span className="location-text">{selectedLocation}</span>
              <ChevronDown size={14} className={`location-chevron ${isLocationOpen ? "rotated" : ""}`} />
            </button>
            {isLocationOpen && (
              <div className="location-dropdown">
                <div className="location-header">
                  <MapPin size={16} />
                  <span>Select Location</span>
                </div>
                <div className="location-list">
                  {locations.map((city) => (
                    <button
                      key={city}
                      className={`location-item ${selectedLocation === city ? "active" : ""}`}
                      onClick={() => {
                        setSelectedLocation(city);
                        setIsLocationOpen(false);
                      }}
                    >
                      {city}
                      {selectedLocation === city && <ChevronRight size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar - Desktop only */}
          <div className="search-wrapper-desktop desktop-only">
            <form onSubmit={handleSearch} className="desktop-search-form">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder={
                  selectedLocation === "All Places"
                    ? "Search anywhere in Ethiopia..."
                    : `Search in ${selectedLocation}...`
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="desktop-search-input"
              />
              <button type="submit" className="desktop-search-btn">Search</button>
            </form>
          </div>

          {/* Right Side Actions - desktop only */}
          <div className="nav-actions desktop-only">
            <button className="action-btn theme-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="action-btn notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-menu-wrapper">
              <button className="user-menu-btn" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <div className="user-avatar">
                  <User size={18} />
                </div>
                <ChevronDown size={16} className={`chevron ${isUserMenuOpen ? "rotated" : ""}`} />
              </button>
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="user-avatar-large">
                      <User size={24} />
                    </div>
                    <div>
                      <h4>Guest User</h4>
                      <p>guest@example.com</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item">My Profile</Link>
                  <Link to="/bookings" className="dropdown-item">My Bookings</Link>
                  <Link to="/wishlist" className="dropdown-item">Wishlist</Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/register" className="dropdown-item register-item">
                    <Building2 size={16} />
                    Register Business
                  </Link>
                  <Link to="/login" className="dropdown-item login-item">Sign In</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Browse Categories button */}
          <button className="nav-categories-btn mobile-only" onClick={onMenuClick}>
            <LayoutGrid size={20} />
            <span>Browse</span>
          </button>

          {/* Mobile: Hamburger button */}
          <button className="hamburger-btn mobile-only" onClick={() => setIsHamburgerOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Hamburger Drawer (slide from right) */}
      <div className={`mobile-hamburger-drawer ${isHamburgerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span className="drawer-title">Menu</span>
          <button className="close-drawer" onClick={() => setIsHamburgerOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Location Filter */}
          <div className="drawer-section">
            <div className="drawer-section-title">
              <MapPin size={18} />
              <span>All Places Filter</span>
            </div>
            <div className="mobile-location-list">
              {locations.map((city) => (
                <button
                  key={city}
                  className={`mobile-location-item ${selectedLocation === city ? "active" : ""}`}
                  onClick={() => applyLocationFilter(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Manual Search */}
          <div className="drawer-section">
            <div className="drawer-section-title">
              <Search size={18} />
              <span>Manual Search</span>
            </div>
            <form onSubmit={handleSearch} className="mobile-search-form-drawer">
              <input
                type="text"
                placeholder={
                  selectedLocation === "All Places"
                    ? "Search anywhere..."
                    : `Search in ${selectedLocation}...`
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-search-input-drawer"
              />
              <button type="submit" className="mobile-search-submit-drawer">Go</button>
            </form>
          </div>

          {/* Dark/Light Toggle */}
          <div className="drawer-section">
            <div className="drawer-section-title">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>Dark / Light Mode</span>
            </div>
            <button
              className="mobile-theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              Switch to {isDarkMode ? "Light" : "Dark"} Mode
            </button>
          </div>

          {/* Notifications */}
          <div className="drawer-section">
            <div className="drawer-section-title">
              <Bell size={18} />
              <span>Notifications</span>
              <span className="mobile-notification-badge">3</span>
            </div>
            <Link to="/notifications" className="mobile-drawer-link" onClick={() => setIsHamburgerOpen(false)}>
              View all notifications
            </Link>
          </div>

          {/* Profile / User Section */}
          <div className="drawer-section">
            <div className="drawer-section-title">
              <User size={18} />
              <span>Profile</span>
            </div>
            <div className="mobile-profile-links">
              <Link to="/profile" onClick={() => setIsHamburgerOpen(false)}>My Profile</Link>
              <Link to="/bookings" onClick={() => setIsHamburgerOpen(false)}>My Bookings</Link>
              <Link to="/wishlist" onClick={() => setIsHamburgerOpen(false)}>Wishlist</Link>
              <Link to="/register" onClick={() => setIsHamburgerOpen(false)}>Register Business</Link>
              <Link to="/login" onClick={() => setIsHamburgerOpen(false)}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for hamburger drawer */}
      {isHamburgerOpen && <div className="mobile-overlay" onClick={() => setIsHamburgerOpen(false)}></div>}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .navbar {
          --font-serif: "Times New Roman", Times, Georgia, "EB Garamond", serif;
          --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          
          /* BRAND COLORS */
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
          --white: #ffffff;
          --shadow: 0 4px 20px rgba(0, 103, 71, 0.08);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: var(--white);
          transition: var(--transition);
        }

        body {
          padding-top: 70px;
        }

        .navbar.scrolled {
          box-shadow: var(--shadow);
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.8rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        /* Logo */
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: var(--transition);
          flex-shrink: 0;
        }

        .logo-icon {
          width: 20%;
          height: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
         /* Logo - Premium Visibility Upgrade */
.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;               /* Slightly more breathing room */
  text-decoration: none;
  transition: var(--transition);
  flex-shrink: 0;
}

.logo-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(145deg, #ffffff, #f5f5f0);  /* soft background */
  border-radius: 20px;      /* more modern */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 103, 71, 0.15);  /* brand colored shadow */
  border: 1px solid rgba(0, 103, 71, 0.1);
}

.logo-img {
  width: 85%;               /* slightly smaller inside the badge */
  height: 85%;
  object-fit: contain;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.05));
  transition: transform 0.3s ease;
}

.logo-wrapper:hover .logo-icon {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 103, 71, 0.2);
  border-color: var(--primary);
}

.logo-wrapper:hover .logo-img {
  transform: scale(1.02);
}

/* Responsive - remains highly visible */
@media (max-width: 1024px) {
  .logo-icon {
    width: 70px;
    height: 70px;
  }
  .logo-wrapper {
    gap: 0.75rem;
  }
}

@media (max-width: 768px) {
  .logo-icon {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .logo-icon {
    width: 52px;
    height: 52px;
  }
  .logo-wrapper {
    gap: 0.5rem;
  }
}
        .logo-img {
          width: 80px;
          height: 100;
          object-fit: contain;
          border-radius: 8px;
        }

        .logo-wrapper:hover .logo-icon {
          transform: rotate(5deg) scale(1.05);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-main {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--dark);
          letter-spacing: -0.3px;
        }

        .logo-sub {
          font-family: var(--font-serif);
          font-size: 0.7rem;
          color: var(--primary);
          letter-spacing: 1px;
        }

        /* Desktop Categories Button */
        .nav-categories-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--mint);
          border: 1px solid var(--gray-light);
          border-radius: 40px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--primary);
          transition: var(--transition);
        }

        .nav-categories-btn:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        /* Location Selector */
        .location-selector-wrapper {
          position: relative;
        }

        .location-selector-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--mint);
          border: 1px solid var(--gray-light);
          border-radius: 40px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--dark);
          transition: var(--transition);
          white-space: nowrap;
        }

        .location-selector-btn:hover {
          background: var(--primary-light);
          border-color: var(--primary);
          color: white;
        }

        .location-selector-btn:hover svg {
          color: white;
        }

        .location-text {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .location-chevron {
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .location-chevron.rotated {
          transform: rotate(180deg);
        }

        .location-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 0.5rem;
          background: var(--white);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          min-width: 200px;
          overflow: hidden;
          z-index: 1001;
          animation: dropdownFade 0.2s ease;
        }

        .location-header {
          padding: 0.75rem 1rem;
          background: var(--primary-dim);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1px solid var(--gray-light);
        }

        .location-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .location-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0.6rem 1rem;
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--gray);
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
        }

        .location-item:hover {
          background: var(--primary-dim);
          color: var(--primary);
        }

        .location-item.active {
          background: var(--primary-dim);
          color: var(--primary);
          font-weight: 500;
        }

        /* Desktop Search */
        .search-wrapper-desktop {
          flex: 1;
          max-width: 400px;
        }

        .desktop-search-form {
          display: flex;
          align-items: center;
          background: var(--mint);
          border-radius: 40px;
          padding: 0.2rem 0.2rem 0.2rem 1rem;
          border: 1px solid var(--gray-light);
          transition: var(--transition);
        }

        .desktop-search-form:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(0, 103, 71, 0.1);
        }

        .desktop-search-input {
          flex: 1;
          background: none;
          border: none;
          padding: 0.5rem 0;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          outline: none;
          min-width: 100px;
        }

        .desktop-search-btn {
          padding: 0.4rem 1rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          transition: var(--transition);
          white-space: nowrap;
        }

        .desktop-search-btn:hover {
          background: var(--primary-light);
        }

        /* Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .action-btn {
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray);
        }

        .action-btn:hover {
          background: var(--primary-dim);
          color: var(--primary);
          transform: translateY(-2px);
        }

        .notification-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background: var(--primary);
          color: white;
          font-size: 0.6rem;
          font-family: var(--font-sans);
          padding: 0.1rem 0.3rem;
          border-radius: 10px;
          min-width: 16px;
        }

        /* User Menu */
        .user-menu-wrapper {
          position: relative;
        }

        .user-menu-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          padding: 0.3rem 0.5rem;
          border-radius: 40px;
          cursor: pointer;
          transition: var(--transition);
        }

        .user-menu-btn:hover {
          background: var(--primary-dim);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: var(--primary-dim);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .chevron {
          transition: transform 0.3s ease;
          color: var(--gray);
        }

        .chevron.rotated {
          transform: rotate(180deg);
        }

        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: var(--white);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          min-width: 260px;
          overflow: hidden;
          animation: dropdownFade 0.2s ease;
          z-index: 1001;
        }

        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-header {
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar-large {
          width: 48px;
          height: 48px;
          background: var(--primary-dim);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .dropdown-header h4 {
          font-family: var(--font-serif);
          font-size: 0.9rem;
          margin-bottom: 0.2rem;
        }

        .dropdown-header p {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
        }

        .dropdown-divider {
          height: 1px;
          background: var(--gray-light);
          margin: 0.5rem 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--gray);
          text-decoration: none;
          transition: var(--transition);
        }

        .dropdown-item:hover {
          background: var(--primary-dim);
          color: var(--primary);
        }

        .register-item {
          color: var(--primary);
          font-weight: 500;
        }

        .login-item {
          background: var(--primary);
          color: white;
          text-align: center;
          justify-content: center;
          margin: 0.5rem;
          border-radius: 30px;
        }

        .login-item:hover {
          background: var(--primary-light);
          color: white;
        }

        /* Mobile Hamburger Drawer */
        .mobile-hamburger-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 400px;
          height: 100vh;
          background: var(--white);
          z-index: 1003;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
        }

        .mobile-hamburger-drawer.open {
          right: 0;
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--gray-light);
        }

        .drawer-title {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--primary);
        }

        .close-drawer {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray);
        }

        .drawer-body {
          flex: 1;
          padding: 1rem 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .drawer-section {
          border-bottom: 1px solid var(--gray-light);
          padding-bottom: 1rem;
        }

        .drawer-section:last-child {
          border-bottom: none;
        }

        .drawer-section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 0.75rem;
        }

        .mobile-location-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-location-item {
          background: none;
          border: none;
          padding: 0.5rem 0;
          text-align: left;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--gray);
          cursor: pointer;
          transition: var(--transition);
        }

        .mobile-location-item.active {
          color: var(--primary);
          font-weight: 500;
        }

        .mobile-search-form-drawer {
          display: flex;
          gap: 0.5rem;
          background: var(--mint);
          border-radius: 40px;
          padding: 0.2rem 0.2rem 0.2rem 1rem;
          border: 1px solid var(--gray-light);
        }

        .mobile-search-input-drawer {
          flex: 1;
          background: none;
          border: none;
          padding: 0.5rem 0;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          outline: none;
        }

        .mobile-search-submit-drawer {
          padding: 0.3rem 1rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
        }

        .mobile-theme-toggle {
          background: var(--primary-dim);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 40px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--primary);
          cursor: pointer;
        }

        .mobile-notification-badge {
          background: var(--primary);
          color: white;
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          border-radius: 20px;
          margin-left: 0.5rem;
        }

        .mobile-drawer-link {
          display: inline-block;
          color: var(--primary);
          text-decoration: none;
          font-family: var(--font-sans);
          font-size: 0.85rem;
        }

        .mobile-profile-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-profile-links a {
          color: var(--gray);
          text-decoration: none;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          transition: var(--transition);
        }

        .mobile-profile-links a:hover {
          color: var(--primary);
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1002;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Utility classes for responsive visibility */
        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none !important;
        }

        /* ============================================ */
        /* RESPONSIVE BREAKPOINTS */
        /* ============================================ */

        @media (max-width: 1024px) {
          .desktop-only {
            display: none !important;
          }
          
          .mobile-only {
            display: flex !important;
          }
          
          .navbar-container {
            padding: 0.8rem 1rem;
            gap: 0.5rem;
          }
          
          .logo-text {
            display: flex !important;
          }
          
          .logo-main {
            font-size: 0.9rem;
          }
          
          .logo-sub {
            font-size: 0.6rem;
          }
          
          .logo-icon {
            width: 28px;
            height: 28px;
          }
          
          .nav-categories-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
          
          .hamburger-btn {
            background: none;
            border: none;
            padding: 0.4rem;
            cursor: pointer;
            color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          body {
            padding-top: 60px;
          }
          
          .navbar-container {
            padding: 0.6rem 0.8rem;
          }
          
          .logo-text {
            display: flex !important;
          }
          
          .logo-main {
            font-size: 0.8rem;
          }
          
          .logo-sub {
            font-size: 0.5rem;
          }
          
          .logo-icon {
            width: 24px;
            height: 24px;
          }
          
          .nav-categories-btn span {
            display: none;
          }
          /* Fix mobile drawer text visibility */
          .mobile-hamburger-drawer,
          .mobile-hamburger-drawer * {
            color: #1e2a2e !important;
          }

          .mobile-hamburger-drawer {
            background: #ffffff !important;
          }

          .drawer-title {
            color: #006747 !important;
          }

          .drawer-section-title {
            color: #1e2a2e !important;
            font-weight: 600;
          }

          .mobile-location-item {
            color: #5a6b6f !important;
            background: transparent !important;
          }

          .mobile-location-item.active {
            color: #006747 !important;
            font-weight: 500;
          }

          .mobile-search-input-drawer {
            color: #1e2a2e !important;
            background: transparent !important;
          }

          .mobile-search-input-drawer::placeholder {
            color: #a0a0a0 !important;
          }

          .mobile-theme-toggle {
            color: #006747 !important;
            background: #E6F4EF !important;
          }

          .mobile-notification-badge {
            background: #006747 !important;
            color: white !important;
          }

          .mobile-drawer-link {
            color: #006747 !important;
          }

          .mobile-profile-links a {
            color: #5a6b6f !important;
          }

          .mobile-profile-links a:hover {
            color: #006747 !important;
          }

          .close-drawer svg {
            color: #5a6b6f !important;
          }

          /* Ensure input text is dark */
          .mobile-search-input-drawer {
            color: #1e2a2e !important;
          }
          .nav-categories-btn {
            padding: 0.4rem;
          }
          
          .mobile-hamburger-drawer {
            width: 100%;
            max-width: none;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;