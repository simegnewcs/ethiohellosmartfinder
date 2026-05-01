import { useState } from "react";
import { useParams } from "react-router-dom";
import { restaurantData } from "../data/restaurants";
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
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";

const RestaurantDetails = () => {
  const { id } = useParams();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [tableType, setTableType] = useState("");

  const restaurant = restaurantData.find((r) => r.id === Number(id));

  if (!restaurant) {
    return (
      <div className="not-found-full">
        <h2>Restaurant Not Found</h2>
        <button onClick={() => window.history.back()}>← Go Back</button>
      </div>
    );
  }

  // Table options (like room types in hotel)
  const tableOptions = [
    { name: "Standard Table", price: 0, seats: 2 },
    { name: "Family Table", price: 10, seats: 4 },
    { name: "VIP Private Table", price: 25, seats: 6 },
  ];

  const amenities = [
    { icon: <Wifi size={18} />, label: "WiFi", value: restaurant.wifi },
    { icon: <Car size={18} />, label: "Parking", value: restaurant.parking },
    { icon: <Coffee size={18} />, label: "Coffee", value: restaurant.coffee },
    {
      icon: <UtensilsCrossed size={18} />,
      label: "Fresh Food",
      value: true,
    },
  ];

  return (
    <div className="hotel-details-full">

      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={18} /> Back
      </button>

      {/* IMAGE SECTION */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={restaurant.image} alt={restaurant.name} />

          <button onClick={() => setIsFav(!isFav)}>
            <Heart fill={isFav ? "#b8860b" : "none"} color="#b8860b" />
          </button>

          <button>
            <Share2 />
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="details-header">
        <div>
          <h1>{restaurant.name}</h1>

          <p>
            <MapPin size={16} /> {restaurant.city}
          </p>

          <span>
            <Star size={16} fill="#b8860b" color="#b8860b" />
            {restaurant.rating} / 5
          </span>
        </div>

        <div className="price-badge">
          <span>${restaurant.price}</span>
          <small>/meal</small>
        </div>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="details-two-columns">

        {/* LEFT SIDE */}
        <div className="details-left">

          {/* ABOUT */}
          <div className="info-card">
            <h2>About Restaurant</h2>
            <p>{restaurant.description}</p>
          </div>

          {/* AMENITIES */}
          <div className="info-card">
            <h2>Features & Services</h2>

            <div className="amenities-grid-full">
              {amenities.map((a, i) => (
                <div
                  key={i}
                  className={`amenity-card ${!a.value ? "unavailable" : ""}`}
                >
                  {a.icon}
                  <span>{a.label}</span>
                  <small>{a.value ? "Available" : "Not Available"}</small>
                </div>
              ))}
            </div>
          </div>

          {/* TABLE OPTIONS */}
          <div className="info-card">
            <h2>Table Options</h2>

            {tableOptions.map((t, i) => (
              <div key={i} className="room-card">
                <div>
                  <h3>{t.name}</h3>
                  <p>{t.seats} Seats</p>
                  {t.price > 0 && <p>Extra: ${t.price}</p>}
                </div>

                <button
                  onClick={() => {
                    setTableType(t.name);
                    document
                      .getElementById("booking-card")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Select
                </button>
              </div>
            ))}
          </div>

          {/* MAP */}
          <div className="info-card">
            <h2>Location</h2>

            <iframe
              title="map"
              src={`https://www.google.com/maps?q=${restaurant.city}&output=embed`}
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: "12px" }}
            />

            <p>
              <MapPin size={16} /> {restaurant.city}, Ethiopia
            </p>
          </div>

          {/* CONTACT */}
          <div className="info-card">
            <h2>Contact Info</h2>

            <p><Phone size={16} /> +251 900 000 000</p>
            <p><Mail size={16} /> info@restaurant.com</p>
            <p><Globe size={16} /> www.restaurant.com</p>
          </div>
        </div>

        {/* RIGHT SIDE BOOKING */}
        <div className="details-right">

          <div className="booking-card-sticky" id="booking-card">

            <h3>Reserve Table</h3>

            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <label>Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>

            <label>Table Type</label>
            <select
              value={tableType}
              onChange={(e) => setTableType(e.target.value)}
            >
              <option value="">Select table</option>
              {tableOptions.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>

            <button
              className="book-now-btn"
              onClick={() => setShowBookingForm(true)}
              disabled={!date || !time || !tableType}
            >
              <CreditCard size={16} />
              Reserve Now
            </button>

            <div className="booking-guarantee">
              <CheckCircle size={14} />
              Instant confirmation • Free cancellation
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showBookingForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowBookingForm(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShowBookingForm(false)}>
              <X />
            </button>

            <h2>Restaurant Reservation</h2>

            <p>{restaurant.name}</p>

            <div className="summary">
              <p>Date: {date}</p>
              <p>Time: {time}</p>
              <p>Guests: {guests}</p>
              <p>Table: {tableType}</p>
            </div>

            <button className="confirm-reservation-btn">
              <CheckCircle /> Confirm Booking
            </button>
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
          --gold: #b8860b;
          --gold-light: #d4af37;
          --gold-dim: #faf4e8;
          --dark: #1e2a2e;
          --gray: #5a6b6f;
          --gray-light: #e2ddd0;
          --bg: #fefcf8;
          --white: #ffffff;
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
          background: var(--gold);
          transform: translateX(-3px);
        }

        /* GALLERY */
        .gallery-full {
          width: 100%;
        }

        .main-image {
          position: relative;
          width: 100%;
          height: 60vh;
          overflow: hidden;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

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

        .wishlist-btn {
          right: 80px;
        }

        .share-btn {
          right: 20px;
        }

        .wishlist-btn:hover, .share-btn:hover {
          transform: scale(1.1);
        }

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

        .thumbnail.active {
          opacity: 1;
          border: 2px solid var(--gold);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

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
          background: var(--gold-dim);
          color: var(--gold);
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

        .location, .rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .review-count {
          margin-left: 0.3rem;
          color: var(--gray);
        }

        .price-badge {
          background: var(--gold-dim);
          padding: 0.8rem 1.5rem;
          border-radius: 16px;
          text-align: center;
        }

        .price-amount {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--gold);
        }

        /* TWO COLUMN LAYOUT */
        .details-two-columns {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
        }

        /* LEFT COLUMN */
        .details-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

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
          color: var(--gold);
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

        .amenity-card.unavailable {
          opacity: 0.5;
        }

        .amenity-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gold-dim);
          border-radius: 12px;
          color: var(--gold);
        }

        .amenity-info {
          display: flex;
          flex-direction: column;
        }

        .amenity-label {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.85rem;
        }

        .amenity-status {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
        }

        /* ROOM TYPES */
        .room-types {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .room-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg);
          border-radius: 12px;
          transition: var(--transition);
        }

        .room-card:hover {
          background: var(--gold-dim);
        }

        .room-info h3 {
          font-family: var(--font-serif);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .room-info p {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
        }

        .room-price .price {
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--gold);
        }

        .select-room-btn {
          padding: 0.4rem 1rem;
          background: none;
          border: 1px solid var(--gold);
          border-radius: 30px;
          color: var(--gold);
          cursor: pointer;
          transition: var(--transition);
        }

        .select-room-btn:hover {
          background: var(--gold);
          color: white;
        }

        /* MAP */
        .map-container {
          border-radius: 12px;
          overflow: hidden;
        }

        .map-address {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--gray);
          margin-top: 0.5rem;
        }

        /* CONTACT */
        .contact-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--gray);
        }

        /* RIGHT COLUMN - STICKY BOOKING CARD */
        .details-right {
          position: relative;
        }

        .booking-card-sticky {
          position: sticky;
          top: 20px;
          background: var(--white);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }

        .booking-header h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          margin-bottom: 0.25rem;
        }

        .booking-header p {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--gray);
          margin-bottom: 1rem;
        }

        .booking-form-compact {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

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

        .price-breakdown {
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--gray-light);
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          padding: 0.2rem 0;
        }

        .breakdown-row.total {
          font-weight: 700;
          color: var(--gold);
          border-top: 1px solid var(--gray-light);
          margin-top: 0.3rem;
          padding-top: 0.5rem;
        }

        .book-now-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--gold);
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

        .book-now-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .book-now-btn:hover:not(:disabled) {
          background: #9a7209;
          transform: translateY(-2px);
        }

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

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--gray-light);
        }

        .modal-header h2 {
          font-family: var(--font-serif);
          margin-bottom: 0.25rem;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .reservation-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .form-group label {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
        }

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

        .payment-summary h4 {
          font-family: var(--font-serif);
          margin-bottom: 0.5rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          padding: 0.3rem 0;
        }

        .summary-row.total {
          font-weight: 700;
          color: var(--gold);
          border-top: 1px solid var(--gray-light);
          margin-top: 0.3rem;
          padding-top: 0.5rem;
        }

        .confirm-reservation-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--gold);
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
        .not-found-full {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
        }

        .not-found-content {
          text-align: center;
        }

        .not-found-icon {
          font-size: 4rem;
        }

        .back-btn {
          margin-top: 1rem;
          padding: 0.6rem 1.5rem;
          background: var(--gold);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
        }

        /* ANIMATIONS */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .details-two-columns {
            grid-template-columns: 1fr;
          }

          .details-right {
            order: -1;
          }

          .booking-card-sticky {
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 768px) {
          .details-header {
            flex-direction: column;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .amenities-grid-full {
            grid-template-columns: 1fr 1fr;
          }

          .main-image {
            height: 40vh;
          }

          .thumbnail-strip {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .amenities-grid-full {
            grid-template-columns: 1fr;
          }

          .room-card {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .back-button span {
            display: none;
          }
        }
          /* =========================
   BOOKING CARD (RESERVE TABLE)
========================= */

.booking-card-sticky {
  position: sticky;
  top: 100px;
  background: linear-gradient(145deg, #ffffff, #f7f7f7);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(184, 134, 11, 0.15);
  font-family: "Times New Roman", Times, serif;
  transition: all 0.3s ease;
}

/* Title */
.booking-card-sticky h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #1e2a2e;
  letter-spacing: 0.5px;
}

/* Labels */
.booking-card-sticky label {
  display: block;
  font-size: 13px;
  margin-top: 14px;
  margin-bottom: 6px;
  color: #5a6b6f;
  font-weight: 600;
}

/* Inputs */
.booking-card-sticky input,
.booking-card-sticky select {
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;
  background: #fff;
  transition: all 0.25s ease;
}

/* Focus effect */
.booking-card-sticky input:focus,
.booking-card-sticky select:focus {
  border-color: #b8860b;
  box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.15);
}

/* Reserve Button */
.book-now-btn {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  background: linear-gradient(135deg, #b8860b, #9a7209);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 18px rgba(184, 134, 11, 0.25);
}

/* Hover effect */
.book-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(184, 134, 11, 0.35);
}

/* Disabled state */
.book-now-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}

/* Confirmation text */
.booking-guarantee {
  margin-top: 12px;
  font-size: 12px;
  color: #5a6b6f;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
}

/* Small animation glow */
.booking-card-sticky:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
}

/* Price highlight (optional if used later) */
.price-badge {
  background: #b8860b;
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: bold;
  display: inline-block;
  margin-top: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .booking-card-sticky {
    position: relative;
    top: auto;
    margin-top: 20px;
  }
}
      `}</style>
    </div>
  );
};

export default RestaurantDetails;