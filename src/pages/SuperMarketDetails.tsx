import { useState } from "react";
import { useParams } from "react-router-dom";
import { supermarkets } from "../data/supermarkets";
import {
  MapPin,
  Star,
  Truck,
  Package,
  Clock,
  Phone,
  Mail,
  Globe,
  X,
  ShoppingCart,
 
  CheckCircle,
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";

const SuperMarketDetails = () => {
  const { id } = useParams();

  const [isFav, setIsFav] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [items, setItems] = useState(1);

  const market = supermarkets.find((m) => m.id === Number(id));

  if (!market) {
    return (
      <div className="not-found-full">
        <h2>Supermarket Not Found</h2>
      </div>
    );
  }

  const services = [
    { icon: <Truck size={18} />, label: "Delivery", value: market.delivery },
    { icon: <Package size={18} />, label: "Parking", value: market.parking },
    { icon: <Clock size={18} />, label: "24h Open", value: market["24h"] },
  ];

  return (
    <div className="hotel-details-full">

      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* IMAGE HEADER */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={market.image} alt={market.name} />

          <button className="wishlist-btn" onClick={() => setIsFav(!isFav)}>
            <Heart size={20} fill={isFav ? "#b8860b" : "none"} />
          </button>

          <button className="share-btn">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="details-header">
        <div className="header-info">
          <h1 className="hotel-name">{market.name}</h1>

          <div className="location-rating">
            <span className="location">
              <MapPin size={16} /> {market.city}
            </span>

            <span className="rating">
              <Star size={16} fill="#b8860b" color="#b8860b" />
              {market.rating}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="details-two-columns">

        {/* LEFT SIDE */}
        <div className="details-left">

          {/* ABOUT */}
          <div className="info-card">
            <h2>About Store</h2>
            <p>{market.description}</p>
          </div>

          {/* SERVICES */}
          <div className="info-card">
            <h2>Services</h2>

            <div className="amenities-grid-full">
              {services.map((s, i) => (
                <div key={i} className="amenity-card">
                  {s.icon}
                  <span>{s.label}</span>
                  <small>
                    {s.value ? "Available" : "Not Available"}
                  </small>
                </div>
              ))}
            </div>
          </div>

          {/* MAP (IMPORTANT ADDITION LIKE HOTEL) */}
          <div className="info-card">
            <h2>Location</h2>

            <iframe
              title="map"
              src={`https://www.google.com/maps?q=${market.city}&output=embed`}
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"
            />

            <p className="map-address">{market.city}, Ethiopia</p>
          </div>

          {/* CONTACT */}
          <div className="info-card">
            <h2>Contact</h2>

            <p><Phone size={16} /> +251 900 000 000</p>
            <p><Mail size={16} /> store@market.com</p>
            <p><Globe size={16} /> www.market.com</p>
          </div>

        </div>

        {/* RIGHT SIDE ORDER CARD */}
        <div className="details-right">

          <div className="booking-card-sticky">

            <h3>Order Items</h3>

            <label>Items Count</label>
            <input
              type="number"
              value={items}
              min={1}
              onChange={(e) => setItems(Number(e.target.value))}
            />

            <button
              className="book-now-btn"
              onClick={() => setShowOrder(true)}
            >
              <ShoppingCart size={16} />
              Order Now
            </button>

            <div className="booking-guarantee">
              <CheckCircle size={14} />
              Fast delivery available
            </div>

          </div>

        </div>
      </div>

      {/* MODAL */}
      {showOrder && (
        <div className="modal-overlay" onClick={() => setShowOrder(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <button className="modal-close" onClick={() => setShowOrder(false)}>
              <X />
            </button>

            <h2>Order Confirmation</h2>

            <p>{market.name}</p>

            <p>Items: {items}</p>

            <button className="confirm-reservation-btn">
              <CheckCircle />
              Confirm Order
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
   SUPER MARKET ORDER CARD
   ========================= */

.booking-card-sticky {
  background: #ffffff;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(184, 134, 11, 0.15);
  position: sticky;
  top: 20px;
  font-family: "Times New Roman", Times, serif;
}

/* Title */
.booking-card-sticky h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1e2a2e;
  border-left: 4px solid #b8860b;
  padding-left: 10px;
}

/* Label */
.booking-card-sticky label {
  display: block;
  font-size: 14px;
  margin: 12px 0 6px;
  color: #5a6b6f;
}

/* Input */
.booking-card-sticky input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 15px;
  transition: 0.3s ease;
  background: #fafafa;
}

.booking-card-sticky input:focus {
  border-color: #b8860b;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.15);
}

/* ORDER BUTTON */
.book-now-btn {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: linear-gradient(135deg, #b8860b, #d4a017);
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.book-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(184, 134, 11, 0.3);
}

.book-now-btn:active {
  transform: scale(0.98);
}

/* STATUS TEXT */
.booking-guarantee {
  margin-top: 12px;
  font-size: 12.5px;
  color: #6b7c80;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* SMALL ICON STYLE */
.booking-guarantee svg {
  color: #2ecc71;
}

/* OPTIONAL: ORDER NUMBER DISPLAY */
.booking-card-sticky p {
  font-size: 14px;
  color: #444;
  margin-top: 10px;
}
      `}</style>
    </div>
  );
};

export default SuperMarketDetails;