import { useState } from "react";
import { useParams } from "react-router-dom";
import { shoppingCenters } from "../data/shoppingCenters";
import {
  Wifi,
  Car,
  Coffee,
  Clock,
  Phone,
  Mail,
  Globe,
  Star,
  MapPin,
  X,
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
  ShoppingBag,
  Store,
  Film,
  UtensilsCrossed,
  ParkingMeter,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const ShoppingCenterDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState("");

  const center = shoppingCenters.find((item) => item.id === Number(id));

  if (!center) {
    return (
      <div className="not-found-full">
        <div className="not-found-content">
          <span className="not-found-icon">🛍️</span>
          <h1>Shopping Center Not Found</h1>
          <p>The shopping center you're looking for doesn't exist or has been removed</p>
          <button onClick={() => window.history.back()} className="back-btn">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const amenitiesList = [
    { icon: <ParkingMeter size={20} />, label: "Free Parking", available: true },
    { icon: <Wifi size={20} />, label: "Free Wi-Fi", available: true },
    { icon: <Film size={20} />, label: "Cinema", available: center.hasCinema },
    { icon: <UtensilsCrossed size={20} />, label: "Food Court", available: center.hasFoodCourt },
  ];

  const storeCategories = [
    { name: "Fashion & Apparel", stores: 45, icons: ["👕", "👗", "👔"] },
    { name: "Electronics", stores: 12, icons: ["📱", "💻", "📺"] },
    { name: "Home & Living", stores: 23, icons: ["🛋️", "🏠", "🪑"] },
    { name: "Beauty & Health", stores: 18, icons: ["💄", "💅", "🧴"] },
    { name: "Sports & Outdoors", stores: 8, icons: ["⚽", "🏃", "🎽"] },
    { name: "Books & Stationery", stores: 6, icons: ["📚", "✏️", "📖"] },
  ];

  const featuredStores = [
    { name: "Zara", floor: "Ground Floor", type: "Fashion" },
    { name: "H&M", floor: "First Floor", type: "Fashion" },
    { name: "Samsung", floor: "First Floor", type: "Electronics" },
    { name: "Apple Premium Reseller", floor: "First Floor", type: "Electronics" },
    { name: "Starbucks", floor: "Food Court", type: "Cafe" },
    { name: "KFC", floor: "Food Court", type: "Fast Food" },
  ];

  const ongoingEvents = [
    { name: "Summer Sale", discount: "Up to 50% off", dates: "June 1 - June 30" },
    { name: "Fashion Week", discount: "Special collections", dates: "June 15 - June 20" },
    { name: "Electronics Expo", discount: "Latest gadgets", dates: "June 25 - June 28" },
  ];

  return (
    <div className="shoppingcenter-details-full">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        <span>Back to Shopping Centers</span>
      </button>

      {/* IMAGE GALLERY */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={center.image} alt={center.name} />
          <button className="wishlist-btn" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart size={22} fill={isWishlisted ? "#b8860b" : "none"} color={isWishlisted ? "#b8860b" : "white"} />
          </button>
          <button className="share-btn">
            <Share2 size={18} color="white" />
          </button>
        </div>
        <div className="thumbnail-strip">
          {[center.image, center.image, center.image].map((img, idx) => (
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
            <div className="category-badge">{center.category || "Shopping Center"}</div>
            <h1 className="center-name">{center.name}</h1>
            <div className="location-rating">
              <span className="location">
                <MapPin size={16} /> {center.city}, Ethiopia
              </span>
              <span className="rating">
                <Star size={16} fill="#b8860b" color="#b8860b" />
                {center.rating} / 5
                <span className="review-count">(456 reviews)</span>
              </span>
            </div>
          </div>
          <div className="stores-badge">
            <span className="stores-count">{center.stores}+</span>
            <span className="stores-label">Stores</span>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="details-two-columns">
          
          {/* LEFT COLUMN */}
          <div className="details-left">
            
            {/* Description */}
            <div className="info-card">
              <h2>About This Shopping Center</h2>
              <p className={`description-text ${showFullDescription ? 'expanded' : 'collapsed'}`}>
                {center.description || `${center.name} is ${center.city}'s premier shopping destination, featuring over ${center.stores} international and local brands. Experience world-class shopping, dining, and entertainment all under one roof. ${center.hasCinema ? 'Enjoy the latest movies at our state-of-the-art cinema complex.' : ''} ${center.hasFoodCourt ? 'Satisfy your cravings at our diverse food court with cuisines from around the world.' : ''} With ample parking and convenient location, we offer the ultimate retail experience.`}
              </p>
              <button className="read-more-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* Store Categories */}
            <div className="info-card">
              <h2><Store size={18} /> Store Directory</h2>
              <div className="categories-grid">
                {storeCategories.map((category, idx) => (
                  <div key={idx} className="category-card">
                    <div className="category-icons">
                      {category.icons.map((icon, i) => (
                        <span key={i} className="category-icon">{icon}</span>
                      ))}
                    </div>
                    <div className="category-info">
                      <h3>{category.name}</h3>
                      <p>{category.stores} stores</p>
                    </div>
                    <ChevronRight size={16} className="category-arrow" />
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Stores */}
            <div className="info-card">
              <h2><ShoppingBag size={18} /> Featured Stores</h2>
              <div className="featured-stores-grid">
                {featuredStores.map((store, idx) => (
                  <div key={idx} className="featured-store-item">
                    <div className="store-info">
                      <h3>{store.name}</h3>
                      <p>{store.floor} • {store.type}</p>
                    </div>
                    <button className="store-btn">View →</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Events & Promotions */}
            <div className="info-card">
              <h2><Sparkles size={18} /> Events & Promotions</h2>
              <div className="events-list">
                {ongoingEvents.map((event, idx) => (
                  <div key={idx} className="event-item">
                    <div className="event-info">
                      <h3>{event.name}</h3>
                      <p>{event.discount}</p>
                      <span className="event-dates">{event.dates}</span>
                    </div>
                    <button 
                      className="event-btn"
                      onClick={() => setSelectedEvent(event.name)}
                    >
                      Learn More →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="info-card">
              <h2>Facilities & Services</h2>
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
                  <span>10:00 AM - 10:00 PM</span>
                </div>
                <div className="hour-item">
                  <span>Sunday</span>
                  <span>11:00 AM - 8:00 PM</span>
                </div>
                <div className="hour-item highlight">
                  <span>Food Court</span>
                  <span>10:00 AM - 11:00 PM</span>
                </div>
                <div className="hour-item highlight">
                  <span>Cinema</span>
                  <span>10:00 AM - 12:00 AM</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="info-card">
              <h2><MapPin size={18} /> Location</h2>
              <div className="map-container">
                <iframe
                  title="shoppingcenter-location"
                  src={`https://www.google.com/maps?q=${center.city}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  loading="lazy"
                />
              </div>
              <p className="map-address">{center.city}, Ethiopia</p>
              <div className="directions-link">
                <a href="#" className="directions-btn">Get Directions →</a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="info-card">
              <h2>Contact Information</h2>
              <div className="contact-grid">
                <div className="contact-item">
                  <Phone size={18} />
                  <span>{center.phone || "+251 900 000 000"}</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>info@{center.name.toLowerCase().replace(/\s/g, '')}.com</span>
                </div>
                <div className="contact-item">
                  <Globe size={18} />
                  <span>www.{center.name.toLowerCase().replace(/\s/g, '')}.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - INFO CARD */}
          <div className="details-right">
            <div className="info-card-sticky" id="info-card">
              <div className="info-header">
                <h3>Visitor Information</h3>
              </div>

              <div className="info-content">
                <div className="info-row">
                  <Store size={16} />
                  <span>{center.stores}+ Stores</span>
                </div>
                <div className="info-row">
                  <ParkingMeter size={16} />
                  <span>2,000+ Parking Spaces</span>
                </div>
                <div className="info-row">
                  <UtensilsCrossed size={16} />
                  <span>{center.hasFoodCourt ? "Food Court Available" : "No Food Court"}</span>
                </div>
                <div className="info-row">
                  <Film size={16} />
                  <span>{center.hasCinema ? "Cinema Complex" : "No Cinema"}</span>
                </div>
              </div>

              <div className="info-divider"></div>

              <div className="visitor-tips">
                <h4>💡 Visitor Tips</h4>
                <ul>
                  <li>Best time to visit: Weekdays 10AM-4PM</li>
                  <li>Free parking available</li>
                  <li>Wheelchair accessible</li>
                  <li>Prayer room available on 2nd floor</li>
                  <li>Lost & found at customer service desk</li>
                </ul>
              </div>

              <button 
                className="inquiry-btn"
                onClick={() => setShowBookingForm(true)}
              >
                <Mail size={16} />
                Send Inquiry
              </button>

              <div className="info-guarantee">
                <CheckCircle size={14} />
                <span>Open 7 days a week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INQUIRY FORM MODAL */}
      {showBookingForm && (
        <div className="modal-overlay" onClick={() => setShowBookingForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingForm(false)}>
              <X size={22} />
            </button>
            
            <div className="modal-header">
              <h2>Send Inquiry</h2>
              <p>{center.name}</p>
            </div>

            <div className="modal-body">
              <form className="inquiry-form">
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
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+251 900 000 000" />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <select required>
                      <option value="">Select subject</option>
                      <option value="store">Store Information</option>
                      <option value="event">Event Inquiry</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea rows={5} placeholder="Please provide details about your inquiry..."></textarea>
                </div>

                <button type="submit" className="submit-inquiry-btn">
                  <Mail size={18} />
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .shoppingcenter-details-full {
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
          --teal: #008080;
          --teal-light: #20b2aa;
          --teal-dim: #e6f3f0;
          --shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* BACK BUTTON */
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

        .back-button:hover {
          background: var(--teal);
          transform: translateX(-3px);
        }

        /* GALLERY */
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
          transition: var(--transition);
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
          transition: var(--transition);
        }
        .thumbnail.active { opacity: 1; border: 2px solid var(--teal); }
        .thumbnail img { width: 100%; height: 100%; object-fit: cover; }

        /* MAIN CONTENT */
        .details-main-full {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        /* HEADER */
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
          display: inline-block;
          background: var(--teal-dim);
          color: var(--teal);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .center-name {
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
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--gray);
        }
        .location, .rating { display: flex; align-items: center; gap: 0.3rem; }
        .stores-badge {
          background: var(--teal-dim);
          padding: 0.8rem 1.5rem;
          border-radius: 16px;
          text-align: center;
        }
        .stores-count {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--teal);
        }
        .stores-label { font-size: 0.7rem; color: var(--gray); display: block; }

        /* TWO COLUMN LAYOUT */
        .details-two-columns {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
        }

        /* LEFT COLUMN */
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
          color: var(--dark);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Categories Grid */
        .categories-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .category-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg);
          border-radius: 12px;
          cursor: pointer;
          transition: var(--transition);
        }
        .category-card:hover { background: var(--teal-dim); transform: translateX(5px); }
        .category-icons { display: flex; gap: 0.25rem; font-size: 1.3rem; }
        .category-info { flex: 1; }
        .category-info h3 { font-family: var(--font-serif); font-size: 1rem; margin-bottom: 0.25rem; }
        .category-info p { font-family: var(--font-sans); font-size: 0.7rem; color: var(--gray); }
        .category-arrow { color: var(--teal); opacity: 0; transition: var(--transition); }
        .category-card:hover .category-arrow { opacity: 1; }

        /* Featured Stores */
        .featured-stores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }
        .featured-store-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem;
          background: var(--bg);
          border-radius: 10px;
        }
        .store-info h3 { font-family: var(--font-serif); font-size: 0.9rem; margin-bottom: 0.2rem; }
        .store-info p { font-family: var(--font-sans); font-size: 0.65rem; color: var(--gray); }
        .store-btn {
          background: none;
          border: none;
          color: var(--teal);
          cursor: pointer;
          font-size: 0.8rem;
        }

        /* Events */
        .events-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .event-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: linear-gradient(135deg, var(--teal-dim) 0%, var(--bg) 100%);
          border-radius: 12px;
        }
        .event-info h3 { font-family: var(--font-serif); font-size: 1rem; margin-bottom: 0.2rem; color: var(--teal); }
        .event-info p { font-family: var(--font-sans); font-size: 0.8rem; font-weight: 500; }
        .event-dates { font-family: var(--font-sans); font-size: 0.65rem; color: var(--gray); }
        .event-btn {
          background: none;
          border: none;
          color: var(--teal);
          cursor: pointer;
          font-size: 0.75rem;
        }

        /* Amenities */
        .amenities-grid-full {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
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
          background: var(--teal-dim);
          border-radius: 12px;
          color: var(--teal);
        }
        .amenity-label { font-family: var(--font-sans); font-weight: 600; font-size: 0.85rem; }
        .amenity-status { font-family: var(--font-sans); font-size: 0.7rem; color: var(--gray); }

        /* Hours */
        .hours-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .hour-item {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--gray-light);
        }
        .hour-item.highlight {
          color: var(--teal);
          font-weight: 600;
        }

        /* Map & Directions */
        .directions-link { margin-top: 0.75rem; }
        .directions-btn {
          color: var(--teal);
          text-decoration: none;
          font-family: var(--font-sans);
          font-size: 0.8rem;
        }

        /* Contact */
        .contact-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--gray);
        }

        /* RIGHT COLUMN - INFO CARD */
        .details-right { position: relative; }
        .info-card-sticky {
          position: sticky;
          top: 20px;
          background: var(--white);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }
        .info-header h3 { font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 1rem; }
        .info-content { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
        .info-row { display: flex; align-items: center; gap: 0.75rem; font-family: var(--font-sans); font-size: 0.85rem; }
        .info-divider { height: 1px; background: var(--gray-light); margin: 1rem 0; }
        .visitor-tips h4 { font-family: var(--font-serif); font-size: 1rem; margin-bottom: 0.5rem; }
        .visitor-tips ul { padding-left: 1.2rem; }
        .visitor-tips li { font-family: var(--font-sans); font-size: 0.75rem; color: var(--gray); margin-bottom: 0.3rem; }
        .inquiry-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--teal);
          color: white;
          border: none;
          border-radius: 40px;
          font-family: var(--font-sans);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .inquiry-btn:hover { background: #006666; transform: translateY(-2px); }
        .info-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
          margin-top: 0.75rem;
        }

        /* MODAL */
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
          padding: 1rem;
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
        .modal-header h2 { font-family: var(--font-serif); margin-bottom: 0.25rem; }
        .modal-body { padding: 1.5rem; }
        .inquiry-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.6rem;
          border: 1px solid var(--gray-light);
          border-radius: 10px;
          font-family: var(--font-serif);
        }
        .submit-inquiry-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--teal);
          color: white;
          border: none;
          border-radius: 40px;
          font-family: var(--font-sans);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        /* NOT FOUND */
        .not-found-full { min-height: 80vh; display: flex; align-items: center; justify-content: center; background: var(--bg); }
        .not-found-content { text-align: center; }
        .not-found-icon { font-size: 4rem; }
        .back-btn { margin-top: 1rem; padding: 0.6rem 1.5rem; background: var(--teal); color: white; border: none; border-radius: 40px; cursor: pointer; }

        /* ANIMATIONS */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .details-two-columns { grid-template-columns: 1fr; }
          .details-right { order: -1; }
          .info-card-sticky { position: relative; top: 0; }
        }
        @media (max-width: 768px) {
          .details-header { flex-direction: column; }
          .form-row { grid-template-columns: 1fr; }
          .amenities-grid-full { grid-template-columns: 1fr 1fr; }
          .main-image { height: 40vh; }
          .featured-stores-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .amenities-grid-full { grid-template-columns: 1fr; }
          .back-button span { display: none; }
        }
      `}</style>
    </div>
  );
};

export default ShoppingCenterDetails;