import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Hotel,
  UtensilsCrossed,
  Coffee,
  Cake,
  ShoppingCart,
  Pill,
  Dumbbell,
  ShoppingBag,
  Wine,
  Hospital,
  ChevronLeft,
  ChevronRight,
  Home,
  TrendingUp,
  Star,
  X,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count?: number;
  path: string;
}

interface SidebarProps {
  onCategoryChange: (categoryId: string) => void;
  activeCategory: string;
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ onCategoryChange, activeCategory, isMobile = false, onClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const categories: Category[] = [
    { id: "all", name: "All Places", icon: <Home size={20} />, path: "/", count: 512 },
    { id: "hotels", name: "Hotels", icon: <Hotel size={20} />, path: "/hotels", count: 128 },
    { id: "restaurants", name: "Restaurants", icon: <UtensilsCrossed size={20} />, path: "/restaurants", count: 256 },
    { id: "coffee", name: "Coffee Houses", icon: <Coffee size={20} />, path: "/coffee-houses", count: 89 },
    { id: "cakes", name: "Cake Shops", icon: <Cake size={20} />, path: "/cake-shops", count: 34 },
    { id: "supermarkets", name: "Supermarkets", icon: <ShoppingCart size={20} />, path: "/supermarkets", count: 67 },
    { id: "pharmacies", name: "Pharmacies", icon: <Pill size={20} />, path: "/pharmacies", count: 45 },
    { id: "gyms", name: "Gyms", icon: <Dumbbell size={20} />, path: "/gyms", count: 23 },
    { id: "shopping", name: "Shopping Centers", icon: <ShoppingBag size={20} />, path: "/shopping-centers", count: 41 },
    { id: "bars", name: "Bars & Nightclubs", icon: <Wine size={20} />, path: "/bars", count: 52 },
    { id: "hospitals", name: "Hospitals", icon: <Hospital size={20} />, path: "/hospitals", count: 18 },
  ];

  const handleCategoryClick = (category: Category) => {
    onCategoryChange(category.id);
    navigate(category.path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handlePremiumClick = () => {
    navigate("/register");
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMobile ? "mobile" : "desktop"}`}>
        {/* Close button for mobile */}
        {isMobile && (
          <button className="sidebar-close-mobile" onClick={onClose}>
            <X size={20} />
          </button>
        )}

        {/* Collapse/Expand Button - Only show on desktop when sidebar is open */}
        {!isMobile && (
          <button
            className="sidebar-toggle"
            onClick={handleCollapseToggle}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}

        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">✦</span>
            {(!isCollapsed || isMobile) && (
              <div className="logo-text">
                <span className="logo-main">Discover</span>
                <span className="logo-sub">Ethiopia</span>
              </div>
            )}
          </div>
        </div>

        {/* Welcome Text */}
        {(!isCollapsed || isMobile) && (
          <div className="sidebar-welcome">
            <p>Explore the best places</p>
            <span>in your city</span>
          </div>
        )}

        {/* Categories List */}
        <nav className="sidebar-nav">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`sidebar-item ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => handleCategoryClick(category)}
              aria-label={category.name}
            >
              <span className="sidebar-icon">{category.icon}</span>
              {(!isCollapsed || isMobile) && (
                <>
                  <span className="sidebar-name">{category.name}</span>
                  {category.count && (
                    <span className="sidebar-count">{category.count}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Footer - Premium Badge */}
        {(!isCollapsed || isMobile) && (
          <div className="sidebar-footer">
            <div className="premium-badge" onClick={handlePremiumClick}>
              <div className="premium-icon">
                <Star size={20} fill="#006747" stroke="#006747" />
              </div>
              <div>
                <div className="premium-title">Premium Listing</div>
                <div className="premium-subtitle">Featured placement</div>
              </div>
              <TrendingUp size={16} className="premium-arrow" />
            </div>
          </div>
        )}
      </aside>

      <style>{`
        .sidebar {
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
          --shadow-sm: 0 4px 20px rgba(0, 103, 71, 0.08);
          --shadow-md: 0 8px 30px rgba(0, 103, 71, 0.12);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          
          background: var(--white);
          border-right: 1px solid var(--gray-light);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 99;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: var(--shadow-sm);
          height: 100%;
        }

        /* Desktop Sidebar */
        .sidebar.desktop {
          position: relative;
          width: 280px;
          height: calc(100vh - 70px);
        }

        .sidebar.desktop.collapsed {
          width: 80px;
        }

        /* Mobile Sidebar */
        .sidebar.mobile {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 100vh;
          border-right: none;
        }

        /* Scrollbar */
        .sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: var(--gray-light);
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: var(--primary-light);
          border-radius: 4px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }

        /* Close button for mobile */
        .sidebar-close-mobile {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 32px;
          height: 32px;
          background: var(--primary-dim);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--primary);
          transition: var(--transition);
          z-index: 10;
        }

        .sidebar-close-mobile:hover {
          background: var(--primary);
          color: white;
        }

        /* Toggle Button */
        .sidebar-toggle {
          position: absolute;
          right: -12px;
          top: 30px;
          width: 24px;
          height: 24px;
          background: var(--white);
          border: 1px solid var(--gray-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--primary);
          transition: var(--transition);
          z-index: 10;
        }

        .sidebar-toggle:hover {
          background: var(--primary-dim);
          border-color: var(--primary);
          transform: scale(1.05);
        }

        /* Header */
        .sidebar-header {
          padding: 1.5rem 1rem 0.5rem 1rem;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          white-space: nowrap;
        }

        .sidebar-logo .logo-icon {
          font-size: 1.5rem;
          color: var(--primary);
          font-family: var(--font-serif);
        }

        .sidebar-logo .logo-text {
          display: flex;
          flex-direction: column;
        }

        .sidebar-logo .logo-main {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--dark);
          letter-spacing: -0.3px;
        }

        .sidebar-logo .logo-sub {
          font-family: var(--font-serif);
          font-size: 0.6rem;
          color: var(--primary);
          letter-spacing: 1px;
        }

        /* Welcome Text */
        .sidebar-welcome {
          padding: 1rem 1rem;
          margin-bottom: 0.5rem;
        }

        .sidebar-welcome p {
          font-family: var(--font-serif);
          font-size: 0.8rem;
          color: var(--dark);
          margin: 0;
          font-weight: 500;
        }

        .sidebar-welcome span {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
        }

        /* Navigation */
        .sidebar-nav {
          flex: 1;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 0.75rem;
          background: transparent;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: var(--transition);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--gray);
          width: 100%;
          text-align: left;
          white-space: nowrap;
          position: relative;
        }

        .sidebar-item:hover {
          background: var(--primary-dim);
          color: var(--primary);
        }

        .sidebar-item.active {
          background: var(--primary-dim);
          color: var(--primary);
          font-weight: 500;
        }

        .sidebar-item.active::before {
          content: '';
          position: absolute;
          left: -0.5rem;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: var(--primary);
          border-radius: 3px;
        }

        .sidebar-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
        }

        .sidebar-name {
          flex: 1;
          font-size: 0.85rem;
          white-space: nowrap;
        }

        .sidebar-count {
          font-size: 0.7rem;
          color: var(--gray);
          background: var(--gray-light);
          padding: 0.15rem 0.4rem;
          border-radius: 12px;
          min-width: 32px;
          text-align: center;
        }

        .sidebar-item.active .sidebar-count {
          background: var(--primary-light);
          color: white;
        }

        /* Footer Premium Badge */
        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--gray-light);
          margin-top: auto;
        }

        .premium-badge {
          background: linear-gradient(135deg, var(--mint) 0%, var(--primary-dim) 100%);
          border: 1px solid var(--primary-light);
          border-radius: 12px;
          padding: 0.7rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
        }

        .premium-badge:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary);
        }

        .premium-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .premium-title {
          font-family: var(--font-serif);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary);
        }

        .premium-subtitle {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          color: var(--gray);
        }

        .premium-arrow {
          margin-left: auto;
          color: var(--primary);
          opacity: 0.6;
        }

        .premium-badge:hover .premium-arrow {
          opacity: 1;
          transform: translateX(3px);
          transition: transform 0.3s ease;
        }

        /* Mobile specific adjustments */
        .sidebar.mobile .sidebar-header {
          padding: 1rem;
        }

        .sidebar.mobile .sidebar-nav {
          padding: 0 0.5rem;
        }

        .sidebar.mobile .sidebar-footer {
          margin-bottom: 1rem;
        }

        /* Collapsed state */
        .sidebar.desktop.collapsed .sidebar-welcome {
          display: none;
        }

        .sidebar.desktop.collapsed .sidebar-header {
          padding: 1.5rem 0.5rem 0.5rem 0.5rem;
          justify-content: center;
        }

        .sidebar.desktop.collapsed .sidebar-logo {
          justify-content: center;
        }

        .sidebar.desktop.collapsed .sidebar-item {
          justify-content: center;
          padding: 0.7rem;
        }

        .sidebar.desktop.collapsed .sidebar-count {
          display: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .sidebar.desktop {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;