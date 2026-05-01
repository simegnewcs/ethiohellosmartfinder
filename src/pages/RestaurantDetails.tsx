import { useState } from "react";
import { useParams } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  UtensilsCrossed,
  Phone,
  Mail,
  Globe,
  X,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Heart,
  Share2,
  Clock,
  Calendar,
  Users,
  Award,
} from "lucide-react";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [tableType, setTableType] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const restaurant = restaurants.find((r) => r.id === Number(id));

  if (!restaurant) {
    return (
      <div className="not-found-full">
        <div className="not-found-content">
          <span className="not-found-icon">🍽️</span>
          <h1>Restaurant Not Found</h1>
          <p>The restaurant you're looking for doesn't exist or has been removed</p>
          <button onClick={() => window.history.back()} className="back-btn">← Go Back</button>
        </div>
      </div>
    );
  }

  // Table options
  const tableOptions = [
    { name: "Standard Table", price: 0, seats: 2, description: "Cozy table for two" },
    { name: "Family Table", price: 10, seats: 4, description: "Perfect for family dining" },
    { name: "VIP Private Table", price: 25, seats: 6, description: "Private area with premium service" },
  ];

  // Popular dishes
  const popularDishes = [
    { name: "Doro Wat", price: "$12", description: "Traditional spicy chicken stew" },
    { name: "Kitfo", price: "$14", description: "Minced raw beef with spices" },
    { name: "Tibs", price: "$13", description: "Sautéed meat with vegetables" },
    { name: "Injera", price: "$3", description: "Traditional flatbread" },
  ];

  const amenities = [
    { icon: <Wifi size={18} />, label: "Free Wi-Fi", value: restaurant.wifi || true },
    { icon: <Car size={18} />, label: "Parking", value: restaurant.parking || true },
    { icon: <Coffee size={18} />, label: "Coffee Ceremony", value: restaurant.coffee || true },
    { icon: <UtensilsCrossed size={18} />, label: "Traditional Food", value: true },
  ];

  const timeSlots = ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

  return (
    <div className="restaurant-details-full">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={18} /> Back
      </button>

      {/* IMAGE GALLERY */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={restaurant.image} alt={restaurant.name} />
          <button className="wishlist-btn" onClick={() => setIsFav(!isFav)}>
            <Heart size={22} fill={isFav ? "#006747" : "none"} color={isFav ? "#006747" : "white"} />
          </button>
          <button className="share-btn">
            <Share2 size={18} color="white" />
          </button>
        </div>
        <div className="thumbnail-strip">
          {[restaurant.image, restaurant.image, restaurant.image].map((img, idx) => (
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

      {/* HEADER */}
      <div className="details-header">
        <div className="header-info">
          <div className="category-badge">{restaurant.cuisine || "Ethiopian Restaurant"}</div>
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <div className="location-rating">
            <span className="location">
              <MapPin size={16} /> {restaurant.city}, Ethiopia
            </span>
            <span className="rating">
              <Star size={16} fill="#006747" stroke="#006747" />
              {restaurant.rating} / 5
              <span className="review-count">(156 reviews)</span>
            </span>
          </div>
        </div>
        <div className="price-badge">
          <span className="price-amount">${restaurant.price}</span>
          <span className="price-period">/avg meal</span>
        </div>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="details-two-columns">

        {/* LEFT SIDE */}
        <div className="details-left">

          {/* ABOUT */}
          <div className="info-card">
            <h2>About This Restaurant</h2>
            <p className="description-text">
              {restaurant.description || `Experience authentic Ethiopian cuisine at ${restaurant.name}. Located in the heart of ${restaurant.city}, we offer a unique dining experience that combines traditional flavors with modern hospitality. Our chefs use only the freshest ingredients sourced from local farmers. ${restaurant.coffee ? 'Don\'t miss our traditional coffee ceremony!' : ''}`}
            </p>
          </div>

          {/* POPULAR DISHES */}
          <div className="info-card">
            <h2><UtensilsCrossed size={18} /> Popular Dishes</h2>
            <div className="dishes-grid">
              {popularDishes.map((dish, idx) => (
                <div key={idx} className="dish-card">
                  <div className="dish-info">
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                  </div>
                  <span className="dish-price">{dish.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AMENITIES */}
          <div className="info-card">
            <h2>Features & Services</h2>
            <div className="amenities-grid-full">
              {amenities.map((a, i) => (
                <div key={i} className={`amenity-card ${!a.value ? "unavailable" : ""}`}>
                  <div className="amenity-icon">{a.icon}</div>
                  <div className="amenity-info">
                    <span className="amenity-label">{a.label}</span>
                    <span className="amenity-status">{a.value ? "Available" : "Not Available"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TABLE OPTIONS */}
          <div className="info-card">
            <h2>Table Options</h2>
            <div className="table-options">
              {tableOptions.map((t, i) => (
                <div key={i} className="table-card">
                  <div className="table-info">
                    <h3>{t.name}</h3>
                    <p>{t.description}</p>
                    <div className="table-details">
                      <span><Users size={14} /> {t.seats} Seats</span>
                      {t.price > 0 && <span className="table-price">+${t.price}</span>}
                    </div>
                  </div>
                  <button
                    className="select-table-btn"
                    onClick={() => {
                      setTableType(t.name);
                      document.getElementById("booking-card")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* OPENING HOURS */}
          <div className="info-card">
            <h2><Clock size={18} /> Opening Hours</h2>
            <div className="hours-list">
              <div className="hour-item">
                <span>Monday - Friday</span>
                <span>10:00 AM - 10:00 PM</span>
              </div>
              <div className="hour-item">
                <span>Saturday - Sunday</span>
                <span>11:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="info-card">
            <h2><MapPin size={18} /> Location</h2>
            <div className="map-container">
              <iframe
                title="restaurant-location"
                src={`https://www.google.com/maps?q=${restaurant.city}&output=embed`}
                width="100%"
                height="280"
                style={{ border: 0, borderRadius: "12px" }}
                loading="lazy"
              />
            </div>
            <p className="map-address">{restaurant.city}, Ethiopia</p>
          </div>

          {/* CONTACT */}
          <div className="info-card">
            <h2>Contact Information</h2>
            <div className="contact-grid">
              <div className="contact-item">
                <Phone size={18} />
                <span>{restaurant.phone || "+251 900 000 000"}</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>{restaurant.email || "info@restaurant.com"}</span>
              </div>
              <div className="contact-item">
                <Globe size={18} />
                <span>{restaurant.website || "www.restaurant.com"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - BOOKING CARD */}
        <div className="details-right">
          <div className="booking-card-sticky" id="booking-card">
            <div className="booking-header">
              <h3>Reserve a Table</h3>
              <p>Secure your spot instantly</p>
            </div>

            <div className="booking-form-compact">
              <div className="form-field">
                <label><Calendar size={14} /> Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </div>

              <div className="form-field">
                <label><Clock size={14} /> Time</label>
                <select value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="">Select time</option>
                  {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="form-field">
                <label><Users size={14} /> Guests</label>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>

              <div className="form-field">
                <label>Table Type</label>
                <select value={tableType} onChange={(e) => setTableType(e.target.value)}>
                  <option value="">Select table</option>
                  {tableOptions.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
              </div>

              <button className="book-now-btn" onClick={() => setShowBookingForm(true)} disabled={!date || !time || !tableType}>
                <CreditCard size={16} /> Reserve Now
              </button>

              <div className="booking-guarantee">
                <CheckCircle size={14} /> Instant confirmation • Free cancellation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showBookingForm && (
        <div className="modal-overlay" onClick={() => setShowBookingForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingForm(false)}><X size={22} /></button>
            <div className="modal-header">
              <h2>Complete Your Reservation</h2>
              <p>{restaurant.name} • {date} at {time}</p>
            </div>
            <div className="modal-body">
              <form className="reservation-form">
                <div className="form-row">
                  <div className="form-group"><label>Full Name</label><input type="text" placeholder="John Doe" required /></div>
                  <div className="form-group"><label>Email Address</label><input type="email" placeholder="john@example.com" required /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Phone Number</label><input type="tel" placeholder="+251 900 000 000" required /></div>
                  <div className="form-group"><label>Special Occasion</label><input type="text" placeholder="Birthday, Anniversary, etc." /></div>
                </div>
                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea rows={3} placeholder="Dietary restrictions or special requests..."></textarea>
                </div>
                <div className="booking-summary">
                  <h4>Booking Summary</h4>
                  <div className="summary-row"><span>Table:</span><span>{tableType}</span></div>
                  <div className="summary-row"><span>Guests:</span><span>{guests}</span></div>
                  <div className="summary-row total"><span>Total</span><span>Free</span></div>
                </div>
                <button type="submit" className="confirm-reservation-btn"><CheckCircle size={18} /> Confirm Reservation</button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .restaurant-details-full {
          --font-serif: "Times New Roman", Times, Georgia, "EB Garamond", serif;
          --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          --primary: #006747;
          --primary-light: #008060;
          --primary-dim: #E6F4EF;
          --secondary: #EEF578;
          --accent: #E27AC0;
          --mint: #D1EFE4;
          --dark: #1e2a2e;
          --gray: #5a6b6f;
          --gray-light: #e2ddd0;
          --bg: var(--mint);
          --white: #ffffff;
          --shadow: 0 4px 20px rgba(0, 103, 71, 0.08);
          --shadow-lg: 0 12px 32px rgba(0, 103, 71, 0.12);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

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
        .back-button:hover { background: var(--primary); transform: translateX(-3px); }

        .gallery-full { width: 100%; }
        .main-image { position: relative; width: 100%; height: 60vh; overflow: hidden; }
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
        .thumbnail-strip { display: flex; gap: 0.5rem; padding: 1rem; background: var(--white); overflow-x: auto; }
        .thumbnail { width: 80px; height: 60px; border-radius: 8px; overflow: hidden; cursor: pointer; opacity: 0.6; transition: var(--transition); }
        .thumbnail.active { opacity: 1; border: 2px solid var(--primary); }
        .thumbnail img { width: 100%; height: 100%; object-fit: cover; }

        .details-header {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 2rem 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .category-badge {
          background: var(--primary-dim);
          color: var(--primary);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.5rem;
        }
        .restaurant-name { font-family: var(--font-serif); font-size: clamp(1.5rem, 4vw, 2.2rem); font-weight: 600; color: var(--dark); margin-bottom: 0.5rem; }
        .location-rating { display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: 0.85rem; color: var(--gray); }
        .price-badge { background: var(--primary-dim); padding: 0.8rem 1.5rem; border-radius: 16px; text-align: center; }
        .price-amount { font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700; color: var(--primary); }

        .details-two-columns {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem 2rem 2rem;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
        }
        .details-left { display: flex; flex-direction: column; gap: 1.5rem; }
        .info-card { background: var(--white); border-radius: 20px; padding: 1.5rem; box-shadow: var(--shadow); }
        .info-card h2 { font-family: var(--font-serif); font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; color: var(--dark); }

        .dishes-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .dish-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--bg); border-radius: 12px; }
        .dish-info h3 { font-family: var(--font-serif); font-size: 1rem; margin-bottom: 0.25rem; }
        .dish-info p { font-size: 0.7rem; color: var(--gray); }
        .dish-price { font-weight: 700; color: var(--primary); }

        .amenities-grid-full { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
        .amenity-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.8rem; background: var(--bg); border-radius: 12px; }
        .amenity-card.unavailable { opacity: 0.5; }
        .amenity-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--primary-dim); border-radius: 12px; color: var(--primary); }
        .amenity-label { font-weight: 600; font-size: 0.85rem; }
        .amenity-status { font-size: 0.7rem; color: var(--gray); }

        .table-options { display: flex; flex-direction: column; gap: 0.75rem; }
        .table-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--bg); border-radius: 12px; }
        .table-info h3 { font-family: var(--font-serif); font-size: 1rem; margin-bottom: 0.25rem; }
        .table-info p { font-size: 0.7rem; color: var(--gray); margin-bottom: 0.25rem; }
        .table-details { display: flex; gap: 0.5rem; font-size: 0.7rem; }
        .table-price { color: var(--primary); font-weight: 600; }
        .select-table-btn { padding: 0.4rem 1rem; background: none; border: 1px solid var(--primary); border-radius: 30px; color: var(--primary); cursor: pointer; transition: var(--transition); }
        .select-table-btn:hover { background: var(--primary); color: white; }

        .hours-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .hour-item { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--gray-light); font-size: 0.85rem; }

        .contact-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .contact-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--gray); }

        .details-right { position: relative; }
        .booking-card-sticky {
          position: sticky;
          top: 20px;
          background: var(--white);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }
        .booking-header h3 { font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.25rem; }
        .booking-header p { font-size: 0.75rem; color: var(--gray); margin-bottom: 1rem; }
        .booking-form-compact { display: flex; flex-direction: column; gap: 0.8rem; }
        .form-field { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-field label { font-size: 0.7rem; font-weight: 600; display: flex; align-items: center; gap: 0.3rem; }
        .form-field input, .form-field select { padding: 0.6rem; border: 1px solid var(--gray-light); border-radius: 10px; }
        .book-now-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: var(--transition);
        }
        .book-now-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .book-now-btn:hover:not(:disabled) { background: var(--primary-light); transform: translateY(-2px); }
        .booking-guarantee { display: flex; align-items: center; justify-content: center; gap: 0.3rem; font-size: 0.7rem; color: var(--gray); margin-top: 0.5rem; }

        .booking-summary { background: var(--bg); padding: 1rem; border-radius: 12px; margin-top: 1rem; }
        .booking-summary h4 { font-family: var(--font-serif); margin-bottom: 0.5rem; }
        .summary-row { display: flex; justify-content: space-between; font-size: 0.8rem; padding: 0.2rem 0; }
        .summary-row.total { font-weight: 700; color: var(--primary); border-top: 1px solid var(--gray-light); margin-top: 0.3rem; padding-top: 0.5rem; }

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
        .modal-close { position: absolute; top: 15px; right: 15px; background: var(--gray-light); border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; }
        .modal-header { padding: 1.5rem; border-bottom: 1px solid var(--gray-light); }
        .modal-header h2 { font-family: var(--font-serif); margin-bottom: 0.25rem; }
        .modal-body { padding: 1.5rem; }
        .reservation-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-size: 0.75rem; font-weight: 600; }
        .form-group input, .form-group textarea { padding: 0.6rem; border: 1px solid var(--gray-light); border-radius: 10px; }
        .confirm-reservation-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--primary);
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
        .back-btn { margin-top: 1rem; padding: 0.6rem 1.5rem; background: var(--primary); color: white; border: none; border-radius: 40px; cursor: pointer; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        @media (max-width: 1024px) { .details-two-columns { grid-template-columns: 1fr; } .details-right { order: -1; } .booking-card-sticky { position: relative; top: 0; } }
        @media (max-width: 768px) { .details-header { flex-direction: column; } .form-row { grid-template-columns: 1fr; } .amenities-grid-full { grid-template-columns: 1fr 1fr; } .main-image { height: 40vh; } }
        @media (max-width: 480px) { .amenities-grid-full { grid-template-columns: 1fr; } .back-button span { display: none; } }
      `}</style>
    </div>
  );
};

export default RestaurantDetails;