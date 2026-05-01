import { useState } from "react";
import { useParams } from "react-router-dom";
import { coffeeHouses } from "../data/coffeeHouses";
import {
  Wifi,
  Car,
  Coffee,
  Clock,
  Phone,
  Mail,

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
  Sun,

  Award,

} from "lucide-react";

const CoffeeHouseDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedCoffee, setSelectedCoffee] = useState("");

  const coffeeHouse = coffeeHouses.find((item) => item.id === Number(id));

  if (!coffeeHouse) {
    return (
      <div className="not-found-full">
        <div className="not-found-content">
          <span className="not-found-icon">☕</span>
          <h1>Coffee House Not Found</h1>
          <p>The coffee house you're looking for doesn't exist or has been removed</p>
          <button onClick={() => window.history.back()} className="back-btn">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];
  
  const amenitiesList = [
    { icon: <Wifi size={20} />, label: "Free Wi-Fi", available: coffeeHouse.wifi },
    { icon: <Car size={20} />, label: "Drive Thru", available: coffeeHouse.driveThru },
    { icon: <Sun size={20} />, label: "Outdoor Seating", available: coffeeHouse.outdoorSeating },
  ];

  const coffeeMenu = [
    { name: "Ethiopian Yirgacheffe", price: "$5", description: "Light roast with floral notes", origin: "Yirgacheffe" },
    { name: "Sidama", price: "$5", description: "Medium roast with fruity undertones", origin: "Sidama" },
    { name: "Harar", price: "$6", description: "Dark roast with wine-like flavor", origin: "Harar" },
    { name: "Espresso", price: "$3", description: "Rich and bold single shot", origin: "Blend" },
    { name: "Cappuccino", price: "$4", description: "Espresso with steamed milk foam", origin: "Blend" },
    { name: "Latte", price: "$4.50", description: "Espresso with creamy milk", origin: "Blend" },
  ];

  const signatureDrinks = [
    { name: "Traditional Coffee Ceremony", price: "$8", description: "Complete ceremony with popcorn and incense" },
    { name: "Macchiato", price: "$3.50", description: "Espresso with a dash of milk" },
    { name: "Cold Brew", price: "$5", description: "Slow-steeped for 12 hours" },
    { name: "Affogato", price: "$6", description: "Espresso over vanilla ice cream" },
  ];

  return (
    <div className="coffeehouse-details-full">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        <span>Back to Coffee Houses</span>
      </button>

      {/* IMAGE GALLERY */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={coffeeHouse.image} alt={coffeeHouse.name} />
          <button className="wishlist-btn" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart size={22} fill={isWishlisted ? "#b8860b" : "none"} color={isWishlisted ? "#b8860b" : "white"} />
          </button>
          <button className="share-btn">
            <Share2 size={18} color="white" />
          </button>
        </div>
        <div className="thumbnail-strip">
          {[coffeeHouse.image, coffeeHouse.image, coffeeHouse.image].map((img, idx) => (
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
            <div className="category-badge">Specialty Coffee House</div>
            <h1 className="coffee-name">{coffeeHouse.name}</h1>
            <div className="location-rating">
              <span className="location">
                <MapPin size={16} /> {coffeeHouse.city}, {coffeeHouse.location}
              </span>
              <span className="rating">
                <Star size={16} fill="#b8860b" color="#b8860b" />
                {coffeeHouse.rating} / 5
                <span className="review-count">(234 reviews)</span>
              </span>
            </div>
          </div>
          <div className="price-badge">
            <span className="price-amount">${coffeeHouse.price}</span>
            <span className="price-period">/avg coffee</span>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="details-two-columns">
          
          {/* LEFT COLUMN */}
          <div className="details-left">
            
            {/* Description */}
            <div className="info-card">
              <h2>About This Coffee House</h2>
              <p className={`description-text ${showFullDescription ? 'expanded' : 'collapsed'}`}>
                {coffeeHouse.description || "Experience the rich tradition of Ethiopian coffee at this premium coffee house. We source our beans directly from local farmers, ensuring the freshest and most authentic coffee experience. Each cup is carefully brewed to highlight the unique flavor profiles of Ethiopia's renowned coffee regions. Our baristas are trained in traditional coffee ceremonies and modern brewing techniques."}
              </p>
              <button className="read-more-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* Coffee Beans Section */}
            <div className="info-card">
              <h2><Coffee size={18} /> Our Coffee Selection</h2>
              <div className="coffee-types">
                {coffeeHouse.coffeeTypes.map((type, idx) => (
                  <div key={idx} className="coffee-type-badge">
                    {type}
                  </div>
                ))}
              </div>
            </div>

            {/* Coffee Menu */}
            <div className="info-card">
              <h2>Hot & Iced Beverages</h2>
              <div className="menu-grid">
                {coffeeMenu.map((item, idx) => (
                  <div key={idx} className="menu-item">
                    <div className="menu-info">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <span className="origin">{item.origin}</span>
                    </div>
                    <span className="menu-price">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Drinks */}
            <div className="info-card">
              <h2><Award size={18} /> Signature Drinks</h2>
              <div className="signature-grid">
                {signatureDrinks.map((item, idx) => (
                  <div key={idx} className="signature-item">
                    <div className="signature-info">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                    <span className="signature-price">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="info-card">
              <h2>Features & Amenities</h2>
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
                  <span>Monday - Friday</span>
                  <span>7:00 AM - 9:00 PM</span>
                </div>
                <div className="hour-item">
                  <span>Saturday - Sunday</span>
                  <span>8:00 AM - 10:00 PM</span>
                </div>
                <div className="hour-item highlight">
                  <span>Traditional Coffee Ceremony</span>
                  <span>Daily at 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="info-card">
              <h2><MapPin size={18} /> Location</h2>
              <div className="map-container">
                <iframe
                  title="coffeehouse-location"
                  src={`https://www.google.com/maps?q=${coffeeHouse.city} ${coffeeHouse.location}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  loading="lazy"
                />
              </div>
              <p className="map-address">{coffeeHouse.city}, {coffeeHouse.location}</p>
            </div>

            {/* Contact Info */}
            <div className="info-card">
              <h2>Contact Information</h2>
              <div className="contact-grid">
                <div className="contact-item">
                  <Phone size={18} />
                  <span>{coffeeHouse.phone || "+251 900 000 000"}</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>{coffeeHouse.email || "info@coffeehouse.com"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - RESERVATION CARD */}
          <div className="details-right">
            <div className="booking-card-sticky" id="booking-card">
              <div className="booking-header">
                <h3>Reserve a Table</h3>
                <p>Book your coffee experience</p>
              </div>

              <div className="booking-form-compact">
                <div className="form-field">
                  <label><Calendar size={14} /> Date</label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-field">
                  <label><Clock size={14} /> Time</label>
                  <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label><Users size={14} /> Guests</label>
                  <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label><Coffee size={14} /> Coffee Experience</label>
                  <select value={selectedCoffee} onChange={(e) => setSelectedCoffee(e.target.value)}>
                    <option value="">Select experience</option>
                    <option value="traditional">Traditional Coffee Ceremony</option>
                    <option value="tasting">Coffee Tasting Flight</option>
                    <option value="regular">Regular Seating</option>
                  </select>
                </div>

                <button 
                  className="book-now-btn"
                  onClick={() => setShowBookingForm(true)}
                  disabled={!selectedDate || !selectedTime}
                >
                  <CreditCard size={16} />
                  Reserve Table
                </button>

                <div className="booking-guarantee">
                  <CheckCircle size={14} />
                  <span>Free cancellation • No deposit required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING FORM MODAL */}
      {showBookingForm && (
        <div className="modal-overlay" onClick={() => setShowBookingForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingForm(false)}>
              <X size={22} />
            </button>
            
            <div className="modal-header">
              <h2>Complete Your Reservation</h2>
              <p>{coffeeHouse.name} • {selectedDate} at {selectedTime}</p>
              {selectedCoffee && <p className="experience-note">Experience: {selectedCoffee}</p>}
            </div>

            <div className="modal-body">
              <form className="reservation-form">
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
                    <label>Special Requests</label>
                    <input type="text" placeholder="Dietary preferences, etc." />
                  </div>
                </div>

                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea rows={3} placeholder="Any special requests for your coffee experience?"></textarea>
                </div>

                <button type="submit" className="confirm-reservation-btn">
                  <CheckCircle size={18} />
                  Confirm Reservation
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

        .coffeehouse-details-full {
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
          --brown: #6d4c41;
          --brown-light: #8d6e63;
          --brown-dim: #efebe9;
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
          background: var(--brown);
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
        .thumbnail.active { opacity: 1; border: 2px solid var(--brown); }
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
          background: var(--brown-dim);
          color: var(--brown);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .coffee-name {
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
        .price-badge {
          background: var(--brown-dim);
          padding: 0.8rem 1.5rem;
          border-radius: 16px;
          text-align: center;
        }
        .price-amount {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--brown);
        }

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

        /* Coffee Types */
        .coffee-types {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .coffee-type-badge {
          background: var(--brown-dim);
          color: var(--brown);
          padding: 0.5rem 1rem;
          border-radius: 30px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* Menu Grid */
        .menu-grid, .signature-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .menu-item, .signature-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg);
          border-radius: 12px;
          transition: var(--transition);
        }
        .menu-item:hover, .signature-item:hover { background: var(--brown-dim); }
        .menu-info h3, .signature-info h3 {
          font-family: var(--font-serif);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        .menu-info p, .signature-info p {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
        }
        .origin {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          color: var(--brown);
          margin-top: 0.25rem;
          display: inline-block;
        }
        .menu-price, .signature-price {
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--brown);
        }

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
          color: var(--brown);
          font-weight: 600;
          background: var(--brown-dim);
          padding: 0.5rem 1rem;
          border-radius: 12px;
          margin-top: 0.5rem;
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
          background: var(--brown-dim);
          border-radius: 12px;
          color: var(--brown);
        }
        .amenity-label { font-family: var(--font-sans); font-weight: 600; font-size: 0.85rem; }
        .amenity-status { font-family: var(--font-sans); font-size: 0.7rem; color: var(--gray); }

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

        /* RIGHT COLUMN */
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
        .booking-header p { font-family: var(--font-sans); font-size: 0.75rem; color: var(--gray); margin-bottom: 1rem; }
        .booking-form-compact { display: flex; flex-direction: column; gap: 0.8rem; }
        .form-field { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-field label {
          font-family: var(--font-sans);
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
          font-family: var(--font-serif);
        }
        .book-now-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--brown);
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
        }
        .book-now-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .book-now-btn:hover:not(:disabled) { background: #5d4037; transform: translateY(-2px); }
        .booking-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
          margin-top: 0.5rem;
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
        .experience-note { font-family: var(--font-sans); font-size: 0.8rem; color: var(--brown); margin-top: 0.5rem; }
        .modal-body { padding: 1.5rem; }
        .reservation-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; }
        .form-group input, .form-group textarea {
          padding: 0.6rem;
          border: 1px solid var(--gray-light);
          border-radius: 10px;
          font-family: var(--font-serif);
        }
        .confirm-reservation-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--brown);
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
        .back-btn { margin-top: 1rem; padding: 0.6rem 1.5rem; background: var(--brown); color: white; border: none; border-radius: 40px; cursor: pointer; }

        /* ANIMATIONS */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .details-two-columns { grid-template-columns: 1fr; }
          .details-right { order: -1; }
          .booking-card-sticky { position: relative; top: 0; }
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

export default CoffeeHouseDetails;