import { useState } from "react";
import { useParams } from "react-router-dom";
import { bars } from "../data/bars";
import {
  Wifi,
  Car,
  Clock,
  Phone,
  MapPin,
  X,
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
  
  Music,

  PartyPopper,
  Sun,
  Star,
 
  Martini,
} from "lucide-react";

const BarDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const bar = bars.find((item) => item.id === Number(id));

  if (!bar) {
    return (
      <div className="not-found-full">
        <div className="not-found-content">
          <span className="not-found-icon">🍸</span>
          <h1>Bar Not Found</h1>
          <p>The bar or nightclub you're looking for doesn't exist or has been removed</p>
          <button onClick={() => window.history.back()} className="back-btn">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const timeSlots = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"];
  
  const amenitiesList = [
    { icon: <Music size={20} />, label: "Live Music", available: bar.hasLiveMusic },
    { icon: <Sun size={20} />, label: "Outdoor Seating", available: bar.hasOutdoorSeating },
    { icon: <Car size={20} />, label: "Parking", available: true },
    { icon: <Wifi size={20} />, label: "Free Wi-Fi", available: true },
  ];

  const signatureDrinks = [
    { name: "Ethiopian Honey Wine", price: "$8", description: "Traditional tej with a modern twist", alcohol: "12%" },
    { name: "Addis Mule", price: "$10", description: "Ginger beer, vodka, lime", alcohol: "15%" },
    { name: "Ethiopian Coffee Martini", price: "$12", description: "Vodka, espresso, coffee liqueur", alcohol: "20%" },
    { name: "Sunset Spritz", price: "$9", description: "Aperol, prosecco, soda", alcohol: "11%" },
    { name: "Highland Whiskey Sour", price: "$11", description: "Whiskey, lemon, sugar, egg white", alcohol: "18%" },
  ];

  const beerSelection = [
    { name: "St. George Lager", price: "$4", type: "Local Lager" },
    { name: "Habesha Beer", price: "$4.50", type: "Golden Ale" },
    { name: "Bedele Special", price: "$4", type: "Premium Lager" },
    { name: "Dashen Beer", price: "$3.50", type: "Light Lager" },
    { name: "Heineken", price: "$5", type: "International Lager" },
    { name: "Amstel", price: "$5", type: "Premium Pilsner" },
  ];

  const weeklyEvents = [
    { day: "Monday", event: "Live Jazz Night", time: "8:00 PM - 11:00 PM" },
    { day: "Wednesday", event: "Open Mic Night", time: "7:00 PM - 10:00 PM" },
    { day: "Friday", event: "DJ Night", time: "9:00 PM - 2:00 AM" },
    { day: "Saturday", event: "Live Band", time: "9:00 PM - 2:00 AM" },
    { day: "Sunday", event: "Karaoke Night", time: "7:00 PM - 11:00 PM" },
  ];

  return (
    <div className="bar-details-full">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        <span>Back to Bars</span>
      </button>

      {/* IMAGE GALLERY */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={bar.image} alt={bar.name} />
          <button className="wishlist-btn" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart size={22} fill={isWishlisted ? "#b8860b" : "none"} color={isWishlisted ? "#b8860b" : "white"} />
          </button>
          <button className="share-btn">
            <Share2 size={18} color="white" />
          </button>
        </div>
        <div className="thumbnail-strip">
          {[bar.image, bar.image, bar.image].map((img, idx) => (
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
            <div className="category-badge">Nightlife • Bar</div>
            <h1 className="bar-name">{bar.name}</h1>
            <div className="location-rating">
              <span className="location">
                <MapPin size={16} /> {bar.city}, Ethiopia
              </span>
              <span className="rating">
                <Star size={16} fill="#b8860b" color="#b8860b" />
                {bar.rating} / 5
                <span className="review-count">(189 reviews)</span>
              </span>
            </div>
          </div>
          <div className="price-badge">
            <span className="price-amount">${bar.price}</span>
            <span className="price-period">/avg drink</span>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="details-two-columns">
          
          {/* LEFT COLUMN */}
          <div className="details-left">
            
            {/* Description */}
            <div className="info-card">
              <h2>About This Bar</h2>
              <p className={`description-text ${showFullDescription ? 'expanded' : 'collapsed'}`}>
                {bar.description || `Experience the best nightlife in ${bar.city} at ${bar.name}. ${bar.hasLiveMusic ? 'Enjoy live music performances from local and international artists.' : ''} ${bar.hasOutdoorSeating ? 'Relax on our outdoor terrace with stunning city views.' : ''} Our expert mixologists craft innovative cocktails using premium spirits and fresh ingredients. Whether you're looking for a casual after-work drink or a night of dancing, we have something for everyone. Join us for unforgettable evenings filled with great music, delicious drinks, and amazing vibes.`}
              </p>
              <button className="read-more-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* Signature Cocktails */}
            <div className="info-card">
              <h2><Martini size={18} /> Signature Cocktails</h2>
              <div className="cocktails-grid">
                {signatureDrinks.map((drink, idx) => (
                  <div key={idx} className="cocktail-card">
                    <div className="cocktail-info">
                      <h3>{drink.name}</h3>
                      <p>{drink.description}</p>
                      <span className="alcohol-content">ABV: {drink.alcohol}</span>
                    </div>
                    <span className="cocktail-price">{drink.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Beer Selection */}
            <div className="info-card">
              <h2> Beer Selection</h2>
              <div className="beers-grid">
                {beerSelection.map((beer, idx) => (
                  <div key={idx} className="beer-card">
                    <div className="beer-info">
                      <h3>{beer.name}</h3>
                      <p>{beer.type}</p>
                    </div>
                    <span className="beer-price">{beer.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Events */}
            <div className="info-card">
              <h2><Calendar size={18} /> Weekly Events</h2>
              <div className="events-schedule">
                {weeklyEvents.map((event, idx) => (
                  <div key={idx} className="event-schedule-item">
                    <div className="event-day">
                      <span className="day-name">{event.day}</span>
                      {event.day === "Friday" || event.day === "Saturday" ? (
                        <span className="hot-tag">HOT</span>
                      ) : null}
                    </div>
                    <div className="event-details">
                      <span className="event-name">{event.event}</span>
                      <span className="event-time">{event.time}</span>
                    </div>
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
                  <span>Monday - Thursday</span>
                  <span>4:00 PM - 12:00 AM</span>
                </div>
                <div className="hour-item">
                  <span>Friday - Saturday</span>
                  <span>4:00 PM - 3:00 AM</span>
                </div>
                <div className="hour-item highlight">
                  <span>Sunday</span>
                  <span>2:00 PM - 10:00 PM</span>
                </div>
                <div className="hour-item happy-hour">
                  <span>🎉 Happy Hour</span>
                  <span>Mon-Fri: 4:00 PM - 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="info-card">
              <h2><MapPin size={18} /> Location</h2>
              <div className="map-container">
                <iframe
                  title="bar-location"
                  src={`https://www.google.com/maps?q=${bar.city}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  loading="lazy"
                />
              </div>
              <p className="map-address">{bar.city}, Ethiopia</p>
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
                  <span>{bar.phone || "+251 900 000 000"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - RESERVATION CARD */}
          <div className="details-right">
            <div className="booking-card-sticky" id="booking-card">
              <div className="booking-header">
                <h3>Reserve a Table</h3>
                <p>Skip the line • VIP experience</p>
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
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label><PartyPopper size={14} /> Experience</label>
                  <select>
                    <option value="">Regular Seating</option>
                    <option value="vip">VIP Section (Extra $50)</option>
                    <option value="bottle">Bottle Service</option>
                    <option value="birthday">Birthday Package</option>
                  </select>
                </div>

                <button 
                  className="book-now-btn"
                  onClick={() => setShowBookingForm(true)}
                  disabled={!selectedDate || !selectedTime}
                >
                  <CreditCard size={16} />
                  Reserve Now
                </button>

                <div className="booking-guarantee">
                  <CheckCircle size={14} />
                  <span>Free cancellation • No cover charge</span>
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
              <p>{bar.name} • {selectedDate} at {selectedTime}</p>
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
                    <label>Special Occasion</label>
                    <select>
                      <option value="">None</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="corporate">Corporate Event</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea rows={3} placeholder="Any special requests or dietary restrictions?"></textarea>
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

        .bar-details-full {
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
          --purple: #6a1b9a;
          --purple-light: #9c27b0;
          --purple-dim: #f3e5f5;
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
          background: var(--purple);
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
        .thumbnail.active { opacity: 1; border: 2px solid var(--purple); }
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
          background: var(--purple-dim);
          color: var(--purple);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .bar-name {
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
          background: var(--purple-dim);
          padding: 0.8rem 1.5rem;
          border-radius: 16px;
          text-align: center;
        }
        .price-amount {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--purple);
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

        /* Cocktails Grid */
        .cocktails-grid, .beers-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .cocktail-card, .beer-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg);
          border-radius: 12px;
          transition: var(--transition);
        }
        .cocktail-card:hover, .beer-card:hover { background: var(--purple-dim); }
        .cocktail-info h3, .beer-info h3 {
          font-family: var(--font-serif);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        .cocktail-info p, .beer-info p {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
        }
        .alcohol-content {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          color: var(--purple);
          margin-top: 0.25rem;
          display: inline-block;
        }
        .cocktail-price, .beer-price {
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--purple);
        }

        /* Events Schedule */
        .events-schedule { display: flex; flex-direction: column; gap: 0.5rem; }
        .event-schedule-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem;
          background: var(--bg);
          border-radius: 10px;
        }
        .event-day {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .day-name {
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: 0.9rem;
        }
        .hot-tag {
          background: #ff4444;
          color: white;
          padding: 0.1rem 0.4rem;
          border-radius: 10px;
          font-size: 0.6rem;
          font-weight: 600;
        }
        .event-details {
          text-align: right;
        }
        .event-name {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          display: block;
        }
        .event-time {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          color: var(--gray);
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
          background: var(--purple-dim);
          border-radius: 12px;
          color: var(--purple);
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
          color: var(--purple);
          font-weight: 600;
        }
        .hour-item.happy-hour {
          background: var(--purple-dim);
          padding: 0.5rem 1rem;
          border-radius: 12px;
          margin-top: 0.5rem;
          color: var(--purple);
          font-weight: 600;
        }

        /* Directions */
        .directions-link { margin-top: 0.75rem; }
        .directions-btn {
          color: var(--purple);
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
          background: var(--purple);
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
        .book-now-btn:hover:not(:disabled) { background: #4a148c; transform: translateY(-2px); }
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
        .modal-body { padding: 1.5rem; }
        .reservation-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.6rem;
          border: 1px solid var(--gray-light);
          border-radius: 10px;
          font-family: var(--font-serif);
        }
        .confirm-reservation-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--purple);
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
        .back-btn { margin-top: 1rem; padding: 0.6rem 1.5rem; background: var(--purple); color: white; border: none; border-radius: 40px; cursor: pointer; }

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

export default BarDetails;