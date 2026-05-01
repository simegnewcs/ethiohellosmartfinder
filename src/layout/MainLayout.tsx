import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Don't show sidebar on these routes
  const hideSidebarRoutes = ["/register", "/login", "/about", "/contact"];
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="main-layout">
      <Navbar onMenuClick={toggleSidebar} />
      
      <div className="layout-wrapper">
        {/* Desktop Sidebar - Hidden by default, shows when toggled */}
        {shouldShowSidebar && (
          <div className={`sidebar-desktop-wrapper ${isSidebarOpen ? "open" : ""}`}>
            <Sidebar 
              onCategoryChange={setActiveCategory}
              activeCategory={activeCategory}
              onClose={closeSidebar}
            />
          </div>
        )}
        
        {/* Mobile Sidebar Overlay - Only shows when toggled */}
        {shouldShowSidebar && (
          <>
            <div className={`sidebar-mobile-overlay ${isSidebarOpen ? "open" : ""}`}>
              <Sidebar 
                onCategoryChange={(category) => {
                  setActiveCategory(category);
                  closeSidebar();
                }}
                activeCategory={activeCategory}
                isMobile={true}
                onClose={closeSidebar}
              />
            </div>
            
            {/* Overlay Background */}
            {isSidebarOpen && (
              <div className="overlay-backdrop" onClick={closeSidebar}></div>
            )}
          </>
        )}
        
        <main className={`layout-main ${shouldShowSidebar && isSidebarOpen ? "with-sidebar" : "full-width"}`}>
          <div className="layout-container">
            <Outlet context={{ activeCategory, setActiveCategory }} />
          </div>
        </main>
      </div>
      
      <footer className="layout-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">✦</span>
            <span className="footer-name">Smart Hotel Finder</span>
          </div>
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Smart Hotel Finder — All rights reserved
          </div>
        </div>
      </footer>

      <style>{`
        /* CSS Variables */
        .main-layout {
          --font-serif-primary: "Times New Roman", Times, Georgia, "EB Garamond", Garamond, serif;
          --font-serif-secondary: Georgia, "Times New Roman", Times, serif;
          --font-sans-ui: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
          
          --color-bg-page: #fefcf8;
          --color-bg-surface: #ffffff;
          --color-text-primary: #1e2a2e;
          --color-text-secondary: #3a4a4f;
          --color-text-muted: #6b7b7e;
          --color-border-light: #e8e2d4;
          --color-border-focus: #b8860b;
          --color-accent-gold: #b8860b;
          --color-accent-gold-light: #d4af37;
          --color-accent-gold-dim: #f5e6c8;
          
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
          --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 12px 28px rgba(0, 0, 0, 0.08);
          
          --transition-default: all 0.25s ease;
        }

        /* Layout Wrapper */
        .layout-wrapper {
          display: flex;
          min-height: calc(100vh - 70px - 200px);
          position: relative;
          background-color: var(--color-bg-page);
        }

        /* Desktop Sidebar Wrapper - Hidden by default */
        .sidebar-desktop-wrapper {
          position: fixed;
          left: 0;
          top: 70px;
          bottom: 0;
          z-index: 90;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-desktop-wrapper.open {
          transform: translateX(0);
        }

        /* Mobile Sidebar Overlay */
        .sidebar-mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 85%;
          max-width: 320px;
          z-index: 1002;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-mobile-overlay.open {
          transform: translateX(0);
        }

        /* Overlay Backdrop */
        .overlay-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1001;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Main Content Area */
        .layout-main {
          flex: 1;
          background-color: var(--color-bg-page);
          padding: 2rem 2rem 4rem 2rem;
          transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: calc(100vh - 70px - 200px);
        }

        .layout-main.with-sidebar {
          margin-left: 300px;
        }

        .layout-main.full-width {
          margin-left: 0;
        }

        .layout-container {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          background-color: var(--color-bg-surface);
          border-radius: 24px;
          box-shadow: var(--shadow-sm);
          transition: var(--transition-default);
          animation: contentFade 0.4s ease-out;
        }

        .layout-container:hover {
          box-shadow: var(--shadow-md);
        }

        @keyframes contentFade {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Footer */
        .layout-footer {
          background: linear-gradient(180deg, #f8f6f0 0%, #f0ede5 100%);
          border-top: 1px solid var(--color-border-light);
          padding: 2.5rem 1rem 2rem 1rem;
          font-family: var(--font-serif-primary);
          margin-top: 0;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          padding: 0 1rem;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          letter-spacing: -0.2px;
        }

        .footer-logo {
          font-size: 1.4rem;
          color: var(--color-accent-gold);
          font-family: var(--font-serif-primary);
        }

        .footer-name {
          font-family: var(--font-serif-primary);
          font-weight: 500;
          color: var(--color-text-primary);
          font-size: 1rem;
          letter-spacing: 0.3px;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-links a {
          font-family: var(--font-sans-ui);
          font-size: 0.85rem;
          font-weight: 450;
          text-decoration: none;
          color: var(--color-text-secondary);
          letter-spacing: 0.3px;
          transition: var(--transition-default);
          padding: 0.25rem 0;
          border-bottom: 1px solid transparent;
        }

        .footer-links a:hover {
          color: var(--color-accent-gold);
          border-bottom-color: var(--color-accent-gold-light);
        }

        .footer-copyright {
          font-family: var(--font-sans-ui);
          font-size: 0.75rem;
          color: var(--color-text-muted);
          letter-spacing: 0.2px;
        }

        /* Scrollbar Styling */
        .main-layout ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .main-layout ::-webkit-scrollbar-track {
          background: var(--color-border-light);
          border-radius: 10px;
        }

        .main-layout ::-webkit-scrollbar-thumb {
          background: var(--color-accent-gold-light);
          border-radius: 10px;
        }

        .main-layout ::-webkit-scrollbar-thumb:hover {
          background: var(--color-accent-gold);
        }

        /* Focus States */
        .layout-main a:focus-visible,
        .layout-footer a:focus-visible {
          outline: 2px solid var(--color-accent-gold);
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .layout-main.with-sidebar {
            margin-left: 0;
          }
          
          .layout-main {
            padding: 1.5rem 1rem 3rem 1rem;
          }
        }

        @media (max-width: 768px) {
          .layout-main {
            padding: 1rem 0.75rem 2rem 0.75rem;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .footer-links {
            justify-content: center;
            gap: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .footer-links {
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }

          .footer-links a {
            font-size: 0.75rem;
          }

          .layout-main {
            padding: 0.75rem 0.5rem 1.5rem 0.5rem;
          }

          .layout-container {
            border-radius: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;