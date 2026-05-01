import { useState } from "react";
import { useParams } from "react-router-dom";
import { cakeShops } from "../data/cakeShops";
import {

  Clock,
  Phone,
  Mail,
  MapPin,
  X,
  Calendar,
 
  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
  Cake,
  Gift,
  ShoppingBag,
  Truck,
  Sparkles,
  Star,
} from "lucide-react";

const CakeShopDetails = () => {
  const { id } = useParams();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [cakeType, setCakeType] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const cakeShop = cakeShops.find((item) => item.id === Number(id));

  if (!cakeShop) {
    return (
      <div className="not-found-full">
        <div className="not-found-content">
          <span className="not-found-icon">🎂</span>
          <h1>Cake Shop Not Found</h1>
          <p>The cake shop you're looking for doesn't exist or has been removed</p>
          <button onClick={() => window.history.back()} className="back-btn">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const amenitiesList = [
    { icon: <Truck size={20} />, label: "Delivery", available: cakeShop.delivery },
  ];

  const cakeMenu = [
    { name: "Birthday Cake", price: "$25", description: "Custom design for any age", size: "6-10 servings" },
    { name: "Wedding Cake", price: "$150", description: "Multi-tiered elegant design", size: "50-100 servings" },
    { name: "Cupcakes", price: "$3", description: "Assorted flavors", size: "per piece" },
    { name: "Cheesecake", price: "$30", description: "New York style", size: "8 servings" },
    { name: "Chocolate Fudge", price: "$28", description: "Rich chocolate layers", size: "8 servings" },
    { name: "Fruit Cake", price: "$35", description: "Premium dried fruits", size: "8 servings" },
  ];

  return (
    <div className="cake-details-full">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        <span>Back to Cake Shops</span>
      </button>

      {/* IMAGE GALLERY */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={cakeShop.image} alt={cakeShop.name} />
          <button className="wishlist-btn" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart size={22} fill={isWishlisted ? "#b8860b" : "none"} color={isWishlisted ? "#b8860b" : "white"} />
          </button>
          <button className="share-btn">
            <Share2 size={18} color="white" />
          </button>
        </div>
        <div className="thumbnail-strip">
          {[cakeShop.image, cakeShop.image, cakeShop.image].map((img, idx) => (
            <div 
              key={idx} 
              className={`thumbnail ${activeImageIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveImageIndex(idx)}
            >
              <img src={img} alt={`View ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="details-main-full">
        {/* HEADER SECTION */}
        <div className="details-header">
          <div className="header-info">
            <div className="category-badge">Bakery & Patisserie</div>
            <h1 className="cakeshop-name">{cakeShop.name}</h1>
            <div className="location-rating">
              <span className="location">
                <MapPin size={16} /> {cakeShop.city}, Ethiopia
              </span>
              <span className="rating">
                <Star size={16} fill="#b8860b" color="#b8860b" />
                {cakeShop.rating} / 5
                <span className="review-count">(156 reviews)</span>
              </span>
            </div>
          </div>
          <div className="price-badge">
            <span className="price-amount">${cakeShop.price}</span>
            <span className="price-period">/avg cake</span>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="details-two-columns">
          
          {/* LEFT COLUMN */}
          <div className="details-left">
            
            {/* Description */}
            <div className="info-card">
              <h2>About This Bakery</h2>
              <p className={`description-text ${showFullDescription ? 'expanded' : 'collapsed'}`}>
                {cakeShop.description || `${cakeShop.name} is a premium bakery specializing in custom cakes and pastries. ${cakeShop.delivery ? 'We offer convenient delivery services for your convenience.' : ''} Our master bakers use only the finest ingredients to create delicious and beautiful cakes for every occasion. From birthdays to weddings, we bring your sweetest visions to life.`}
              </p>
              <button className="read-more-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* Specialties */}
            <div className="info-card">
              <h2><Sparkles size={18} /> Our Specialties</h2>
              <div className="specialties-list">
                {cakeShop.specialties.map((specialty, idx) => (
                  <div key={idx} className="specialty-card">
                    <Cake size={16} />
                    <span>{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cake Menu */}
            <div className="info-card">
              <h2><Gift size={18} /> Popular Cakes</h2>
              <div className="menu-grid">
                {cakeMenu.map((item, idx) => (
                  <div key={idx} className="menu-item">
                    <div className="menu-info">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <span className="cake-size">{item.size}</span>
                    </div>
                    <span className="menu-price">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="info-card">
              <h2>Features & Services</h2>
              <div className="amenities-grid-full">
                {amenitiesList.map((item, idx) => (
                  <div key={idx} className={`amenity-card ${!item.available ? 'unavailable' : ''}`}>
                    <div className="amenity-icon">{item.icon}</div>
                    <div className="amenity-info">
                      <span className="amenity-label">{item.label}</span>
                      <span className="amenity-status">
                        {item.available ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="info-card">
              <h2><Clock size={18} /> Opening Hours</h2>
              <div className="hours-list">
                <div className="hour-item">
                  <span>Monday - Saturday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="hour-item">
                  <span>Sunday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="info-card">
              <h2><MapPin size={18} /> Location</h2>
              <div className="map-container">
                <iframe
                  title="cakeshop-location"
                  src={`https://www.google.com/maps?q=${cakeShop.city}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  loading="lazy"
                />
              </div>
              <p className="map-address">{cakeShop.city}, Ethiopia</p>
            </div>

            {/* Contact Info */}
            <div className="info-card">
              <h2>Contact Information</h2>
              <div className="contact-grid">
                <div className="contact-item">
                  <Phone size={18} />
                  <span>{cakeShop.phone || "+251 900 000 000"}</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>info@{cakeShop.name.toLowerCase().replace(/\s/g, '')}.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - ORDER CARD */}
          <div className="details-right">
            <div className="order-card-sticky" id="order-card">
              <div className="order-header">
                <h3>Place an Order</h3>
                <p>Custom cakes & pastries</p>
              </div>

              <div className="order-form-compact">
                <div className="form-field">
                  <label><Calendar size={14} /> Need By Date</label>
                  <input 
                    type="date" 
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-field">
                  <label><Cake size={14} /> Cake Type</label>
                  <select value={cakeType} onChange={(e) => setCakeType(e.target.value)}>
                    <option value="">Select cake type</option>
                    <option value="birthday">Birthday Cake</option>
                    <option value="wedding">Wedding Cake</option>
                    <option value="cupcake">Cupcakes</option>
                    <option value="cheesecake">Cheesecake</option>
                    <option value="custom">Custom Design</option>
                  </select>
                </div>

                <button 
                  className="order-now-btn"
                  onClick={() => setShowOrderForm(true)}
                  disabled={!orderDate}
                >
                  <ShoppingBag size={16} />
                  Place Order
                </button>

                <div className="order-guarantee">
                  <CheckCircle size={14} />
                  <span>Free consultation • Custom designs available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ORDER FORM MODAL */}
      {showOrderForm && (
        <div className="modal-overlay" onClick={() => setShowOrderForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowOrderForm(false)}>
              <X size={22} />
            </button>
            
            <div className="modal-header">
              <h2>Place Your Order</h2>
              <p>{cakeShop.name} • Need by {orderDate}</p>
            </div>

            <div className="modal-body">
              <form className="order-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" placeholder="john@example.com" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="+251 900 000 000" required />
                  </div>
                  <div className="form-group">
                    <label>Cake Flavor</label>
                    <select>
                      <option value="">Select flavor</option>
                      <option value="chocolate">Chocolate</option>
                      <option value="vanilla">Vanilla</option>
                      <option value="redvelvet">Red Velvet</option>
                      <option value="carrot">Carrot</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Design Details *</label>
                  <textarea rows={3} placeholder="Describe your cake design, colors, theme, and any special requests..." required></textarea>
                </div>

                <button type="submit" className="confirm-order-btn">
                  <CheckCircle size={18} />
                  Submit Order Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Add same styles as HotelDetails but with pink theme */
        .cake-details-full {
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
          --pink: #ff6b8b;
          --pink-light: #ffb3c1;
          --pink-dim: #fff0f2;
          --shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Copy all styles from HotelDetails but change gold/teal to pink */
        .back-button {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 40px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition);
        }
        .back-button:hover { background: var(--pink); transform: translateX(-3px); }
        .gallery-full { width: 100%; }
        .main-image {
          position: relative;
          width: 100%;
          height: 60vh;
          overflow: hidden;
        }
        .main-image img { width: 100%; height: 100%; object-fit: cover; }
        .wishlist-btn, .share-btn {
          position: absolute;
          top: 20px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          border: none;
          padding: 0.7rem;
          border-radius: 50%;
          cursor: pointer;
        }
        .wishlist-btn { right: 80px; }
        .share-btn { right: 20px; }
        .thumbnail-strip {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--white);
          overflow-x: auto;
        }
        .thumbnail {
          width: 80px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.6;
        }
        .thumbnail.active { opacity: 1; border: 2px solid var(--pink); }
        .details-main-full {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .details-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--gray-light);
        }
        .category-badge {
          background: var(--pink-dim);
          color: var(--pink);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.5rem;
        }
        .cakeshop-name {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }
        .location-rating {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          font-size: 0.85rem;
          color: var(--gray);
        }
        .price-badge {
          background: var(--pink-dim);
          padding: 0.8rem 1.5rem;
          border-radius: 16px;
        }
        .price-amount {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--pink);
        }
        .details-two-columns {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
        }
        .details-left { display: flex; flex-direction: column; gap: 1.5rem; }
        .info-card {
          background: var(--white);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: var(--shadow);
        }
        .info-card h2 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .specialties-list { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .specialty-card {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--pink-dim);
          border-radius: 30px;
          color: var(--pink);
        }
        .menu-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg);
          border-radius: 12px;
        }
        .menu-info h3 { font-family: var(--font-serif); font-size: 1rem; margin-bottom: 0.25rem; }
        .menu-info p { font-size: 0.7rem; color: var(--gray); }
        .cake-size { font-size: 0.65rem; color: var(--pink); display: inline-block; margin-top: 0.2rem; }
        .menu-price { font-weight: 700; color: var(--pink); }
        .amenities-grid-full { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
        .amenity-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem;
          background: var(--bg);
          border-radius: 12px;
        }
        .amenity-card.unavailable { opacity: 0.5; }
        .amenity-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--pink-dim);
          border-radius: 12px;
          color: var(--pink);
        }
        .hours-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .hour-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--gray-light);
        }
        .contact-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .contact-item { display: flex; align-items: center; gap: 0.75rem; }
        .details-right { position: relative; }
        .order-card-sticky {
          position: sticky;
          top: 20px;
          background: var(--white);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }
        .order-header h3 { font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.25rem; }
        .order-form-compact { display: flex; flex-direction: column; gap: 0.8rem; }
        .form-field { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-field label {
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .form-field input, .form-field select {
          padding: 0.6rem;
          border: 1px solid var(--gray-light);
          border-radius: 10px;
        }
        .order-now-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--pink);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .order-now-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        .modal-content {
          background: var(--white);
          border-radius: 24px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }
        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--gray-light);
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
        }
        .modal-header { padding: 1.5rem; border-bottom: 1px solid var(--gray-light); }
        .modal-body { padding: 1.5rem; }
        .order-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-size: 0.75rem; font-weight: 600; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.6rem;
          border: 1px solid var(--gray-light);
          border-radius: 10px;
        }
        .confirm-order-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--pink);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .not-found-full { min-height: 80vh; display: flex; align-items: center; justify-content: center; background: var(--bg); }
        .not-found-content { text-align: center; }
        .back-btn { margin-top: 1rem; padding: 0.6rem 1.5rem; background: var(--pink); color: white; border: none; border-radius: 40px; cursor: pointer; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @media (max-width: 1024px) {
          .details-two-columns { grid-template-columns: 1fr; }
          .details-right { order: -1; }
          .order-card-sticky { position: relative; top: 0; }
        }
        @media (max-width: 768px) {
          .details-header { flex-direction: column; }
          .form-row { grid-template-columns: 1fr; }
          .amenities-grid-full { grid-template-columns: 1fr 1fr; }
          .main-image { height: 40vh; }
        }
        @media (max-width: 480px) {
          .amenities-grid-full { grid-template-columns: 1fr; }
          .back-button span { display: none; }
        }
      `}</style>
    </div>
  );
};

export default CakeShopDetails;