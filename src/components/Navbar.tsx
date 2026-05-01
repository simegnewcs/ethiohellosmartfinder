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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const cityParam = selectedLocation === "All Places" ? "" : `&city=${encodeURIComponent(selectedLocation)}`;
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}${cityParam}`;
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo Section */}
          <Link to="/" className="logo-wrapper">
            <div className="logo-icon">✦</div>
            <div className="logo-text">
              <span className="logo-main">HelloET.com</span>
              <span className="logo-sub">Finder</span>
            </div>
          </Link>

          {/* Mobile: Single button to open sidebar */}
          <button className="mobile-sidebar-trigger mobile-only" onClick={onMenuClick}>
            <LayoutGrid size={20} />
            <span>Categories</span>
          </button>

          {/* Location Selector */}
          <div className="location-selector-wrapper">
            <button
              className="location-selector-btn"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <MapPin size={16} />
              <span>{selectedLocation}</span>
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

          {/* Search Bar - Desktop */}
          <div className="search-wrapper-desktop">
            <form onSubmit={handleSearch} className="desktop-search-form">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder={selectedLocation === "All Places" 
                  ? "Search anywhere in Ethiopia..." 
                  : `Search in ${selectedLocation}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="desktop-search-input"
              />
              <button type="submit" className="desktop-search-btn">Search</button>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="nav-actions">
            {/* Search Button - Mobile */}
            <button className="action-btn search-mobile-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button className="action-btn theme-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <button className="action-btn notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

            {/* User Menu */}
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

            {/* Mobile user menu trigger */}
            <button className="action-btn mobile-user-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expandable */}
        <div className={`mobile-search-expandable ${isSearchOpen ? "open" : ""}`}>
          <form onSubmit={handleSearch} className="mobile-search-form">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder={selectedLocation === "All Places" 
                ? "Search anywhere in Ethiopia..." 
                : `Search in ${selectedLocation}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
              autoFocus={isSearchOpen}
            />
            <button type="submit" className="mobile-search-submit">Go</button>
          </form>
        </div>
      </nav>

      {/* Mobile User Menu (Right side drawer for user actions) */}
      <div className={`mobile-user-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <div className="user-info">
            <div className="user-avatar-large">
              <User size={24} />
            </div>
            <div>
              <h4>Guest User</h4>
              <p>guest@example.com</p>
            </div>
          </div>
          <button className="close-drawer" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="mobile-drawer-body">
          <Link to="/profile" className="mobile-drawer-item" onClick={() => setIsMobileMenuOpen(false)}>
            <User size={18} />
            My Profile
          </Link>
          <Link to="/bookings" className="mobile-drawer-item" onClick={() => setIsMobileMenuOpen(false)}>
            <Bell size={18} />
            My Bookings
          </Link>
          <Link to="/wishlist" className="mobile-drawer-item" onClick={() => setIsMobileMenuOpen(false)}>
            <Building2 size={18} />
            Wishlist
          </Link>
          <div className="mobile-divider"></div>
          <Link to="/register" className="mobile-register-btn" onClick={() => setIsMobileMenuOpen(false)}>
            Register Business
          </Link>
          <Link to="/login" className="mobile-login-btn" onClick={() => setIsMobileMenuOpen(false)}>
            Sign In
          </Link>
        </div>
      </div>

      {/* Overlay for mobile user drawer */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .navbar {
          --font-serif: "Times New Roman", Times, Georgia, "EB Garamond", serif;
          --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          
          /* NEW BRAND COLORS */
          --primary: #006747;
          --primary-light: #008060;
          --primary-dim: #E6F4EF;
          --secondary: #EEF578;
          --secondary-dark: #E0E865;
          --accent: #E27AC0;
          --accent-light: #E895CD;
          --accent-dim: #FCE9F6;
          --mint: #D1EFE4;
          --mint-dark: #B8E0D0;
          
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

        .mobile-only {
          display: none;
        }

        /* Logo */
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: var(--transition);
        }

        .logo-icon {
          font-size: 1.8rem;
          color: var(--primary);
          font-family: var(--font-serif);
          transition: transform 0.3s ease;
        }

        .logo-wrapper:hover .logo-icon {
          transform: rotate(15deg);
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

        /* Mobile Sidebar Trigger */
        .mobile-sidebar-trigger {
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

        .mobile-sidebar-trigger:hover {
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
        }

        .location-selector-btn:hover {
          background: var(--primary-light);
          border-color: var(--primary);
          color: white;
        }

        .location-selector-btn:hover svg {
          color: white;
        }

        .location-chevron {
          transition: transform 0.3s ease;
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
          min-width: 220px;
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
        }

        .desktop-search-btn:hover {
          background: var(--primary-light);
        }

        /* Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
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

        .search-mobile-btn {
          display: none;
        }

        .mobile-user-menu-btn {
          display: none;
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

        /* Mobile Search Expandable */
        .mobile-search-expandable {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s ease;
          background: var(--white);
          border-top: 1px solid var(--gray-light);
        }

        .mobile-search-expandable.open {
          max-height: 80px;
          padding: 0.8rem 1rem;
        }

        .mobile-search-form {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--mint);
          border-radius: 40px;
          padding: 0.2rem 0.2rem 0.2rem 1rem;
        }

        .mobile-search-input {
          flex: 1;
          background: none;
          border: none;
          padding: 0.6rem 0;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          outline: none;
        }

        .mobile-search-submit {
          padding: 0.4rem 1rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
        }

        /* Mobile User Drawer */
        .mobile-user-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 320px;
          height: 100vh;
          background: var(--white);
          z-index: 1003;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
        }

        .mobile-user-drawer.open {
          right: 0;
        }

        .mobile-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--gray-light);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .close-drawer {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray);
        }

        .mobile-drawer-body {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-drawer-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--gray);
          text-decoration: none;
          border-radius: 12px;
          transition: var(--transition);
        }

        .mobile-drawer-item:hover {
          background: var(--primary-dim);
          color: var(--primary);
        }

        .mobile-divider {
          height: 1px;
          background: var(--gray-light);
          margin: 0.5rem 0;
        }

        .mobile-register-btn,
        .mobile-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem;
          border-radius: 40px;
          text-decoration: none;
          font-family: var(--font-sans);
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .mobile-register-btn {
          background: var(--primary-dim);
          color: var(--primary);
        }

        .mobile-login-btn {
          background: var(--primary);
          color: white;
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

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .search-wrapper-desktop {
            display: none;
          }

          .search-mobile-btn {
            display: flex;
          }
          
          .mobile-only {
            display: flex;
          }

          .navbar-container {
            padding: 0.8rem 1rem;
          }

          .location-selector-btn span {
            display: none;
          }
          
          .location-selector-btn {
            padding: 0.5rem;
          }

          .user-menu-wrapper {
            display: none;
          }

          .mobile-user-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;