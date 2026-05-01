import { useState } from "react";
import { useParams } from "react-router-dom";
import { pharmacies } from "../data/pharmacies";
import {

  Car,
  Clock,

  MapPin,
  X,
  Calendar,

  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
  Pill,
 
  Stethoscope,
  Ambulance,
  AlertCircle,
  ShoppingBag,
 
  Shield,
  Truck,
} from "lucide-react";

const PharmacyDetails = () => {
  const { id } = useParams();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const pharmacy = pharmacies.find((item) => item.id === Number(id));

  if (!pharmacy) {
    return (
      <div className="not-found-full">
        <div className="not-found-content">
          <span className="not-found-icon">💊</span>
          <h1>Pharmacy Not Found</h1>
          <p>The pharmacy you're looking for doesn't exist or has been removed</p>
          <button onClick={() => window.history.back()} className="back-btn">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const deliveryTimeSlots = ["ASAP", "1 Hour", "2 Hours", "3 Hours", "4 Hours", "Scheduled"];
  
  const amenitiesList = [
    { icon: <Clock size={20} />, label: "24/7 Service", available: pharmacy.is24Hours },
    { icon: <Ambulance size={20} />, label: "Emergency Care", available: pharmacy.hasEmergency },
    { icon: <Truck size={20} />, label: "Home Delivery", available: pharmacy.hasDelivery },
    { icon: <Car size={20} />, label: "Parking", available: true },
    { icon: <Stethoscope size={20} />, label: "Consultation", available: true },
    { icon: <Shield size={20} />, label: "Licensed Pharmacist", available: true },
  ];

  const commonMedicines = [
    { name: "Paracetamol 500mg", price: "$2.50", category: "Pain Relief", prescription: false },
    { name: "Ibuprofen 400mg", price: "$3.00", category: "Anti-inflammatory", prescription: false },
    { name: "Amoxicillin 500mg", price: "$8.00", category: "Antibiotic", prescription: true },
    { name: "Vitamin C 1000mg", price: "$5.00", category: "Supplements", prescription: false },
    { name: "Omeprazole 20mg", price: "$6.00", category: "Digestive Health", prescription: false },
    { name: "Lisinopril 10mg", price: "$12.00", category: "Blood Pressure", prescription: true },
  ];

  const healthcareServices = [
    { name: "Blood Pressure Check", price: "$5", duration: "5 mins" },
    { name: "Blood Sugar Test", price: "$3", duration: "5 mins" },
    { name: "COVID-19 Test", price: "$15", duration: "15 mins" },
    { name: "Flu Vaccination", price: "$20", duration: "10 mins" },
    { name: "Health Consultation", price: "$25", duration: "30 mins" },
    { name: "Medication Review", price: "$10", duration: "15 mins" },
  ];

  return (
    <div className="pharmacy-details-full">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        <span>Back to Pharmacies</span>
      </button>

      {/* IMAGE GALLERY */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={pharmacy.image} alt={pharmacy.name} />
          <button className="wishlist-btn" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart size={22} fill={isWishlisted ? "#b8860b" : "none"} color={isWishlisted ? "#b8860b" : "white"} />
          </button>
          <button className="share-btn">
            <Share2 size={18} color="white" />
          </button>
          {pharmacy.is24Hours && <span className="twentyfour-badge">24/7</span>}
        </div>
        <div className="thumbnail-strip">
          {[pharmacy.image, pharmacy.image, pharmacy.image].map((img, idx) => (
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
            <div className="category-badge">
              {pharmacy.is24Hours ? "24/7 Pharmacy" : "Community Pharmacy"}
            </div>
            <h1 className="pharmacy-name">{pharmacy.name}</h1>
            <div className="location-rating">
              <span className="location">
                <MapPin size={16} /> {pharmacy.city}, Ethiopia
              </span>
              <span className="rating">
           
                {pharmacy.rating} / 5
                <span className="review-count">(78 reviews)</span>
              </span>
            </div>
          </div>
          <div className="emergency-badge">
            <AlertCircle size={20} />
            <span>Emergency Ready</span>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="details-two-columns">
          
          {/* LEFT COLUMN */}
          <div className="details-left">
            
            {/* Description */}
            <div className="info-card">
              <h2>About This Pharmacy</h2>
              <p className={`description-text ${showFullDescription ? 'expanded' : 'collapsed'}`}>
                {pharmacy.description || `${pharmacy.name} is a trusted healthcare provider in ${pharmacy.city}, committed to delivering quality pharmaceutical care. ${pharmacy.is24Hours ? 'We are open 24/7 to serve your healthcare needs at any time.' : ''} ${pharmacy.hasDelivery ? 'Enjoy convenient home delivery services for your medications.' : ''} Our team of licensed pharmacists provides expert advice and personalized care. We stock a complete range of prescription medications, over-the-counter products, and healthcare supplies. Your health and well-being are our top priorities.`}
              </p>
              <button className="read-more-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* Common Medicines */}
            <div className="info-card">
              <h2><Pill size={18} /> Common Medications</h2>
              <div className="medicines-grid">
                {commonMedicines.map((item, idx) => (
                  <div key={idx} className={`medicine-card ${item.prescription ? 'prescription-required' : ''}`}>
                    <div className="medicine-info">
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                      {item.prescription && (
                        <span className="prescription-tag">Prescription Required</span>
                      )}
                    </div>
                    <span className="medicine-price">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Healthcare Services */}
            <div className="info-card">
              <h2><Stethoscope size={18} /> Healthcare Services</h2>
              <div className="services-grid">
                {healthcareServices.map((service, idx) => (
                  <div key={idx} className="service-card">
                    <div className="service-info">
                      <h3>{service.name}</h3>
                      <span className="service-duration">Duration: {service.duration}</span>
                    </div>
                    <span className="service-price">{service.price}</span>
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
                {pharmacy.is24Hours ? (
                  <div className="hour-item highlight">
                    <span>Open 24 Hours</span>
                    <span>Every Day</span>
                  </div>
                ) : (
                  <>
                    <div className="hour-item">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 9:00 PM</span>
                    </div>
                    <div className="hour-item">
                      <span>Saturday</span>
                      <span>9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="hour-item">
                      <span>Sunday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                  </>
                )}
                <div className="hour-item emergency-contact">
                  <span>🚨 Emergency Contact</span>
                  <span>{pharmacy.phone || "+251 900 000 000"}</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="info-card">
              <h2><MapPin size={18} /> Location</h2>
              <div className="map-container">
                <iframe
                  title="pharmacy-location"
                  src={`https://www.google.com/maps?q=${pharmacy.city}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  loading="lazy"
                />
              </div>
              <p className="map-address">{pharmacy.city}, Ethiopia</p>
            </div>

            {/* Contact Info */}
            <div className="info-card">
              <h2>Contact Information</h2>
              <div className="contact-grid">
                <div className="contact-item">
                 
                  <span>{pharmacy.phone || "+251 900 000 000"}</span>
                </div>
                <div className="contact-item">
                 
                  <span>info@{pharmacy.name.toLowerCase().replace(/\s/g, '')}.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - DELIVERY CARD */}
          <div className="details-right">
            <div className="delivery-card-sticky" id="delivery-card">
              <div className="delivery-header">
                <h3>Medicine Delivery</h3>
                <p>Get your medications delivered</p>
              </div>

              <div className="delivery-form-compact">
                <div className="form-field">
                  <label><Calendar size={14} /> Delivery Date</label>
                  <input 
                    type="date" 
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-field">
                  <label><Clock size={14} /> Delivery Time</label>
                  <select value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}>
                    <option value="">Select time</option>
                    {deliveryTimeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label><ShoppingBag size={14} /> Prescription Upload</label>
                  <input type="file" accept="image/*" className="file-input" />
                  <small>Upload prescription (JPG, PNG, PDF)</small>
                </div>

                <button 
                  className="order-now-btn"
                  onClick={() => setShowOrderForm(true)}
                  disabled={!deliveryDate}
                >
                  <Truck size={16} />
                  Order Delivery
                </button>

                <div className="delivery-guarantee">
                  <CheckCircle size={14} />
                  <span>Free delivery on orders over $20</span>
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
              <p>{pharmacy.name} • Delivery on {deliveryDate}</p>
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
                    <label>Delivery Address *</label>
                    <input type="text" placeholder="Full address" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Medications Needed *</label>
                  <textarea rows={3} placeholder="List the medications you need (name and quantity)..." required></textarea>
                </div>

                <div className="form-group">
                  <label>Special Instructions</label>
                  <textarea rows={2} placeholder="Any special delivery instructions?"></textarea>
                </div>

                <div className="order-summary">
                  <h4>Order Summary</h4>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span>$2.99</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>To be confirmed</span>
                  </div>
                </div>

                <button type="submit" className="confirm-order-btn">
                  <CheckCircle size={18} />
                  Place Order
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

        .pharmacy-details-full {
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
          --green: #2e7d32;
          --green-light: #4caf50;
          --green-dim: #e8f5e9;
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
          background: var(--green);
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
        .twentyfour-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: #ff4444;
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 30px;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.8rem;
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
        .thumbnail.active { opacity: 1; border: 2px solid var(--green); }
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
          background: var(--green-dim);
          color: var(--green);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .pharmacy-name {
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
        .emergency-badge {
          background: #ffebee;
          color: #c62828;
          padding: 0.5rem 1rem;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.8rem;
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

        /* Medicines Grid */
        .medicines-grid, .services-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .medicine-card, .service-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg);
          border-radius: 12px;
          transition: var(--transition);
        }
        .medicine-card:hover, .service-card:hover { background: var(--green-dim); }
        .medicine-info h3, .service-info h3 {
          font-family: var(--font-serif);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        .medicine-info p, .service-info p {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
        }
        .prescription-tag {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          color: #ff9800;
          background: #fff3e0;
          padding: 0.1rem 0.4rem;
          border-radius: 10px;
          margin-left: 0.5rem;
        }
        .medicine-card.prescription-required {
          border-left: 3px solid #ff9800;
        }
        .medicine-price, .service-price {
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--green);
        }
        .service-duration {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          color: var(--gray);
          display: block;
          margin-top: 0.2rem;
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
          background: var(--green-dim);
          border-radius: 12px;
          color: var(--green);
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
          color: var(--green);
          font-weight: 600;
          background: var(--green-dim);
          padding: 0.5rem 1rem;
          border-radius: 12px;
        }
        .hour-item.emergency-contact {
          background: #ffebee;
          color: #c62828;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          margin-top: 0.5rem;
          font-weight: 600;
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

        /* RIGHT COLUMN - DELIVERY CARD */
        .details-right { position: relative; }
        .delivery-card-sticky {
          position: sticky;
          top: 20px;
          background: var(--white);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }
        .delivery-header h3 { font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.25rem; }
        .delivery-header p { font-family: var(--font-sans); font-size: 0.75rem; color: var(--gray); margin-bottom: 1rem; }
        .delivery-form-compact { display: flex; flex-direction: column; gap: 0.8rem; }
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
        .file-input {
          padding: 0.4rem;
          font-size: 0.7rem;
        }
        .form-field small {
          font-size: 0.6rem;
          color: var(--gray);
        }
        .order-now-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--green);
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
        .order-now-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .order-now-btn:hover:not(:disabled) { background: #1b5e20; transform: translateY(-2px); }
        .delivery-guarantee {
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
        .order-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.6rem;
          border: 1px solid var(--gray-light);
          border-radius: 10px;
          font-family: var(--font-serif);
        }
        .order-summary {
          background: var(--bg);
          padding: 1rem;
          border-radius: 12px;
        }
        .order-summary h4 {
          font-family: var(--font-serif);
          margin-bottom: 0.5rem;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          padding: 0.2rem 0;
        }
        .summary-row.total {
          font-weight: 700;
          color: var(--green);
          border-top: 1px solid var(--gray-light);
          margin-top: 0.3rem;
          padding-top: 0.5rem;
        }
        .confirm-order-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--green);
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
        .back-btn { margin-top: 1rem; padding: 0.6rem 1.5rem; background: var(--green); color: white; border: none; border-radius: 40px; cursor: pointer; }

        /* ANIMATIONS */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .details-two-columns { grid-template-columns: 1fr; }
          .details-right { order: -1; }
          .delivery-card-sticky { position: relative; top: 0; }
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

export default PharmacyDetails;