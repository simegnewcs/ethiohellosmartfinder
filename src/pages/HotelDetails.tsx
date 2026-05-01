import { useState } from "react";
import { useParams } from "react-router-dom";
import { hotels } from "../data/hotels";
import {
  Wifi,
  Car,
  Coffee,
  Waves,
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
  
} from "lucide-react";

const HotelDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const hotel = hotels.find((item) => item.id === Number(id));

  if (!hotel) {
    return (
      <div className="not-found-full">
        <div className="not-found-content">
          <span className="not-found-icon">🏨</span>
          <h1>Hotel Not Found</h1>
          <p>The property you're looking for doesn't exist or has been removed</p>
          <button onClick={() => window.history.back()} className="back-btn">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // Room types based on hotel price
  const roomTypes = [
    { name: "Standard Single Room", price: hotel.price, capacity: 1, beds: "1 Single Bed" },
    { name: "Deluxe Double Room", price: hotel.price + 30, capacity: 2, beds: "1 King Bed" },
    { name: "Family Suite", price: hotel.price + 70, capacity: 4, beds: "2 Queen Beds" },
    { name: "Presidential Suite", price: hotel.price + 150, capacity: 6, beds: "3 King Beds" }
  ];

  const amenitiesList = [
    { icon: <Wifi size={20} />, label: "Wi-Fi", available: hotel.wifi },
    { icon: <Car size={20} />, label: "Parking", available: hotel.parking },
    { icon: <Coffee size={20} />, label: "Breakfast", available: hotel.breakfast },
    { icon: <Waves size={20} />, label: "Swimming Pool", available: hotel.swimmingPool }
  ];

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const roomPrice = selectedRoom ? roomTypes.find(r => r.name === selectedRoom)?.price || hotel.price : hotel.price;
    return nights * roomPrice;
  };

  return (
    <div className="hotel-details-full">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        <span>Back to Hotels</span>
      </button>

      {/* IMAGE GALLERY */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={hotel.image} alt={hotel.name} />
          <button className="wishlist-btn" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart size={22} fill={isWishlisted ? "#006747" : "none"} color={isWishlisted ? "#006747" : "white"} />
          </button>
          <button className="share-btn">
            <Share2 size={18} color="white" />
          </button>
        </div>
        <div className="thumbnail-strip">
          {[hotel.image, hotel.image, hotel.image].map((img, idx) => (
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

      {/* MAIN CONTENT - FULL WIDTH */}
      <div className="details-main-full">
        
        {/* HEADER SECTION */}
        <div className="details-header">
          <div className="header-info">
            <div className="category-badge">{hotel.category}</div>
            <h1 className="hotel-name">{hotel.name}</h1>
            <div className="location-rating">
              <span className="location">
                <MapPin size={16} /> {hotel.city}, Ethiopia
              </span>
              <span className="rating">
                <Star size={16} fill="#006747" stroke="#006747" />
                {hotel.rating} / 5
                <span className="review-count">(124 reviews)</span>
              </span>
            </div>
          </div>
          <div className="price-badge">
            <span className="price-amount">${hotel.price}</span>
            <span className="price-period">/night</span>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="details-two-columns">
          
          {/* LEFT COLUMN - CONTENT */}
          <div className="details-left">
            
            {/* Description */}
            <div className="info-card">
              <h2>About This Property</h2>
              <p className={`description-text ${showFullDescription ? 'expanded' : 'collapsed'}`}>
                {hotel.description || "Experience exceptional hospitality at this premier establishment. Our property offers modern amenities combined with traditional Ethiopian warmth and hospitality. Each room is thoughtfully designed to provide maximum comfort during your stay. Enjoy breathtaking views, premium services, and unforgettable experiences that will make your visit truly special. Located in the heart of the city, we provide easy access to major attractions, business centers, and entertainment venues. Our dedicated staff is committed to making your stay memorable with personalized service and attention to detail."}
              </p>
              <button className="read-more-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* Amenities */}
            <div className="info-card">
              <h2>Facilities & Amenities</h2>
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

            {/* Room Types */}
            <div className="info-card">
              <h2>Room Types</h2>
              <div className="room-types">
                {roomTypes.map((room, idx) => (
                  <div key={idx} className="room-card">
                    <div className="room-info">
                      <h3>{room.name}</h3>
                      <p>{room.beds} • Sleeps {room.capacity}</p>
                      <div className="room-price">
                        <span className="price">${room.price}</span>
                        <span className="period">/night</span>
                      </div>
                    </div>
                    <button 
                      className="select-room-btn"
                      onClick={() => {
                        setSelectedRoom(room.name);
                        document.getElementById('booking-card')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="info-card">
              <h2><MapPin size={18} /> Location</h2>
              <div className="map-container">
                <iframe
                  title="hotel-location"
                  src={`https://www.google.com/maps?q=${hotel.city} Ethiopia&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  loading="lazy"
                />
              </div>
              <p className="map-address">{hotel.city}, Ethiopia</p>
            </div>

            {/* Contact Info */}
            <div className="info-card">
              <h2>Contact Information</h2>
              <div className="contact-grid">
                <div className="contact-item">
                  <Phone size={18} />
                  <span>{hotel.phone || "+251 900 000 000"}</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>{hotel.email || "info@hotel.com"}</span>
                </div>
                <div className="contact-item">
                  <Globe size={18} />
                  <span>{hotel.website || "www.hotel.com"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - BOOKING CARD (STICKY) */}
          <div className="details-right">
            <div className="booking-card-sticky" id="booking-card">
              <div className="booking-header">
                <h3>Book Your Stay</h3>
                <p>Instant confirmation • Free cancellation</p>
              </div>

              <div className="booking-form-compact">
                <div className="form-field">
                  <label><Calendar size={14} /> Check-in Date</label>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-field">
                  <label><Calendar size={14} /> Check-out Date</label>
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-field">
                  <label><Users size={14} /> Guests</label>
                  <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Room Type</label>
                  <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                    <option value="">Select room type</option>
                    {roomTypes.map(room => (
                      <option key={room.name} value={room.name}>{room.name} - ${room.price}/night</option>
                    ))}
                  </select>
                </div>

                {checkIn && checkOut && selectedRoom && (
                  <div className="price-breakdown">
                    <div className="breakdown-row">
                      <span>Room rate</span>
                      <span>${calculateTotalPrice()}</span>
                    </div>
                    <div className="breakdown-row">
                      <span>Taxes & fees</span>
                      <span>${Math.round(calculateTotalPrice() * 0.15)}</span>
                    </div>
                    <div className="breakdown-row total">
                      <span>Total amount</span>
                      <span>${calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.15)}</span>
                    </div>
                  </div>
                )}

                <button 
                  className="book-now-btn"
                  onClick={() => setShowBookingForm(true)}
                  disabled={!checkIn || !checkOut || !selectedRoom}
                >
                  <CreditCard size={16} />
                  Reserve Now
                </button>

                <div className="booking-guarantee">
                  <CheckCircle size={14} />
                  <span>Best price guarantee • Free cancellation</span>
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
              <p>{hotel.name} • {selectedRoom}</p>
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
                    <label>Nationality</label>
                    <input type="text" placeholder="Ethiopian" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Check-in Date</label>
                    <input type="text" value={checkIn} disabled />
                  </div>
                  <div className="form-group">
                    <label>Check-out Date</label>
                    <input type="text" value={checkOut} disabled />
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea rows={3} placeholder="Any special requests or preferences?"></textarea>
                </div>

                <div className="payment-summary">
                  <h4>Payment Summary</h4>
                  <div className="summary-row">
                    <span>Room charge ({Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000*60*60*24))} nights)</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Taxes & service fee (15%)</span>
                    <span>${Math.round(calculateTotalPrice() * 0.15)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total to pay</span>
                    <span>${calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.15)}</span>
                  </div>
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

        .hotel-details-full {
          --font-serif: "Times New Roman", Times, Georgia, "EB Garamond", serif;
          --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          
          /* NEW BRAND COLORS */
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
          --bg: var(--mint);
          --white: #ffffff;
          --shadow: 0 4px 20px rgba(0, 103, 71, 0.08);
          --shadow-lg: 0 12px 32px rgba(0, 103, 71, 0.12);
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
          background: var(--primary);
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
        .thumbnail.active { opacity: 1; border: 2px solid var(--primary); }
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
          background: var(--primary-dim);
          color: var(--primary);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .hotel-name {
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
        .review-count { margin-left: 0.3rem; color: var(--gray); }
        .price-badge {
          background: var(--primary-dim);
          padding: 0.8rem 1.5rem;
          border-radius: 16px;
          text-align: center;
        }
        .price-amount {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary);
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
        }

        .description-text {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--gray);
        }
        .description-text.collapsed {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .read-more-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        /* AMENITIES GRID */
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
          background: var(--primary-dim);
          border-radius: 12px;
          color: var(--primary);
        }
        .amenity-info { display: flex; flex-direction: column; }
        .amenity-label { font-family: var(--font-sans); font-weight: 600; font-size: 0.85rem; }
        .amenity-status { font-family: var(--font-sans); font-size: 0.7rem; color: var(--gray); }

        /* ROOM TYPES */
        .room-types { display: flex; flex-direction: column; gap: 0.75rem; }
        .room-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg);
          border-radius: 12px;
          transition: var(--transition);
        }
        .room-card:hover { background: var(--primary-dim); }
        .room-info h3 { font-family: var(--font-serif); font-size: 1rem; margin-bottom: 0.25rem; }
        .room-info p { font-family: var(--font-sans); font-size: 0.7rem; color: var(--gray); }
        .room-price .price { font-family: var(--font-serif); font-weight: 700; color: var(--primary); }
        .select-room-btn {
          padding: 0.4rem 1rem;
          background: none;
          border: 1px solid var(--primary);
          border-radius: 30px;
          color: var(--primary);
          cursor: pointer;
          transition: var(--transition);
        }
        .select-room-btn:hover { background: var(--primary); color: white; }

        /* MAP */
        .map-container { border-radius: 12px; overflow: hidden; }
        .map-address { font-family: var(--font-sans); font-size: 0.8rem; color: var(--gray); margin-top: 0.5rem; }

        /* CONTACT */
        .contact-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--gray);
        }

        /* RIGHT COLUMN - STICKY BOOKING CARD */
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
        .price-breakdown { margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--gray-light); }
        .breakdown-row { display: flex; justify-content: space-between; font-family: var(--font-sans); font-size: 0.8rem; padding: 0.2rem 0; }
        .breakdown-row.total { font-weight: 700; color: var(--primary); border-top: 1px solid var(--gray-light); margin-top: 0.3rem; padding-top: 0.5rem; }
        .book-now-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--primary);
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
        .book-now-btn:hover:not(:disabled) { background: var(--primary-light); transform: translateY(-2px); }
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
          max-width: 600px;
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
        .form-group input, .form-group textarea, .form-group select {
          padding: 0.6rem;
          border: 1px solid var(--gray-light);
          border-radius: 10px;
          font-family: var(--font-serif);
        }
        .payment-summary {
          background: var(--bg);
          padding: 1rem;
          border-radius: 12px;
        }
        .payment-summary h4 { font-family: var(--font-serif); margin-bottom: 0.5rem; }
        .summary-row { display: flex; justify-content: space-between; font-size: 0.85rem; padding: 0.3rem 0; }
        .summary-row.total { font-weight: 700; color: var(--primary); border-top: 1px solid var(--gray-light); margin-top: 0.3rem; padding-top: 0.5rem; }
        .confirm-reservation-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--primary);
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
        .back-btn { margin-top: 1rem; padding: 0.6rem 1.5rem; background: var(--primary); color: white; border: none; border-radius: 40px; cursor: pointer; }

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
          .thumbnail-strip { justify-content: center; }
        }
        @media (max-width: 480px) {
          .amenities-grid-full { grid-template-columns: 1fr; }
          .room-card { flex-direction: column; text-align: center; gap: 0.5rem; }
          .back-button span { display: none; }
        }
      `}</style>
    </div>
  );
};

export default HotelDetails;