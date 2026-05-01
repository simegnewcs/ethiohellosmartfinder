import { useState } from "react";
import { useParams } from "react-router-dom";
import { gyms } from "../data/gyms";
import {
 
  Clock,
  Phone,
  MapPin,
  X,
  
  Users,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
  Dumbbell,
  Waves,
  Flame,
  Bike,
  Activity,
  Trophy,
  Calendar as CalendarIcon,
  Star,
  Shield,
} from "lucide-react";

const GymDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const gym = gyms.find((item) => item.id === Number(id));

  if (!gym) {
    return (
      <div className="not-found-full">
        <div className="not-found-content">
          <span className="not-found-icon">💪</span>
          <h1>Gym Not Found</h1>
          <p>The gym you're looking for doesn't exist or has been removed</p>
          <button onClick={() => window.history.back()} className="back-btn">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const membershipPlans = [
    { name: "Basic", price: `${gym.price}`, duration: "Month", features: ["Access to cardio area", "Locker room", "Basic equipment"] },
    { name: "Premium", price: `${Math.round(gym.price * 1.5)}`, duration: "Month", features: ["All Basic features", "Weight training area", "Group classes", "Sauna access"] },
    { name: "VIP", price: `${Math.round(gym.price * 2)}`, duration: "Month", features: ["All Premium features", "Pool access", "Personal trainer (2x/month)", "Towel service", "Protein bar"] },
    { name: "Annual", price: `${Math.round(gym.price * 10)}`, duration: "Year", features: ["Save 20%", "All VIP features", "Free guest pass (x12)", "Priority class booking"] },
  ];

  const amenitiesList = [
    { icon: <Dumbbell size={20} />, label: "Weight Training", available: gym.facilities.includes("Weight Training") },
    { icon: <Activity size={20} />, label: "Cardio Zone", available: gym.facilities.includes("Cardio") },
    { icon: <Waves size={20} />, label: "Swimming Pool", available: gym.facilities.includes("Pool") },
    { icon: <Flame size={20} />, label: "Sauna", available: gym.facilities.includes("Sauna") },
    { icon: <Users size={20} />, label: "Group Classes", available: gym.facilities.includes("Group Classes") },
    { icon: <Bike size={20} />, label: "Spin Class", available: gym.facilities.includes("Spin Class") },
    { icon: <Trophy size={20} />, label: "Personal Training", available: gym.facilities.includes("Personal Training") },
    { icon: <Shield size={20} />, label: "24/7 Access", available: gym.is24Hours || false },
  ];

  const classSchedule = [
    { time: "6:00 AM", class: "Morning Yoga", instructor: "Sarah", duration: "60 min" },
    { time: "8:00 AM", class: "HIIT Bootcamp", instructor: "Mike", duration: "45 min" },
    { time: "10:00 AM", class: "Spin Class", instructor: "John", duration: "50 min" },
    { time: "12:00 PM", class: "Zumba", instructor: "Maria", duration: "60 min" },
    { time: "5:00 PM", class: "CrossFit", instructor: "Alex", duration: "60 min" },
    { time: "7:00 PM", class: "Evening Yoga", instructor: "Sarah", duration: "60 min" },
  ];

  return (
    <div className="gym-details-full">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        <span>Back to Gyms</span>
      </button>

      {/* IMAGE GALLERY */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={gym.image} alt={gym.name} />
          <button className="wishlist-btn" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart size={22} fill={isWishlisted ? "#b8860b" : "none"} color={isWishlisted ? "#b8860b" : "white"} />
          </button>
          <button className="share-btn">
            <Share2 size={18} color="white" />
          </button>
          {gym.is24Hours && <span className="twentyfour-badge">24/7 Open</span>}
        </div>
        <div className="thumbnail-strip">
          {[gym.image, gym.image, gym.image].map((img, idx) => (
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
            <div className="category-badge">Fitness Center</div>
            <h1 className="gym-name">{gym.name}</h1>
            <div className="location-rating">
              <span className="location">
                <MapPin size={16} /> {gym.city}, Ethiopia
              </span>
              <span className="rating">
                <Star size={16} fill="#b8860b" color="#b8860b" />
                {gym.rating} / 5
                <span className="review-count">(234 reviews)</span>
              </span>
            </div>
          </div>
          <div className="price-badge">
            <span className="price-amount">${gym.price}</span>
            <span className="price-period">/month</span>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="details-two-columns">
          
          {/* LEFT COLUMN */}
          <div className="details-left">
            
            {/* Description */}
            <div className="info-card">
              <h2>About This Gym</h2>
              <p className={`description-text ${showFullDescription ? 'expanded' : 'collapsed'}`}>
                {gym.description || `${gym.name} is a premier fitness destination in ${gym.city}, offering state-of-the-art equipment and expert trainers. ${gym.is24Hours ? 'Open 24/7, you can work out whenever it suits your schedule.' : ''} Our facilities include ${gym.facilities.slice(0, 4).join(', ')}. Whether you're a beginner or an experienced athlete, we have programs tailored to your fitness goals. Join our community and transform your health today.`}
              </p>
              <button className="read-more-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* Facilities */}
            <div className="info-card">
              <h2><Dumbbell size={18} /> Facilities & Equipment</h2>
              <div className="facilities-grid">
                {gym.facilities.map((facility, idx) => (
                  <div key={idx} className="facility-card">
                    <CheckCircle size={16} className="facility-icon" />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Schedule */}
            <div className="info-card">
              <h2><CalendarIcon size={18} /> Group Class Schedule</h2>
              <div className="schedule-list">
                {classSchedule.map((cls, idx) => (
                  <div key={idx} className="schedule-item">
                    <div className="schedule-time">{cls.time}</div>
                    <div className="schedule-info">
                      <h3>{cls.class}</h3>
                      <p>with {cls.instructor} • {cls.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="info-card">
              <h2>Amenities & Services</h2>
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
                {gym.is24Hours ? (
                  <>
                    <div className="hour-item highlight">
                      <span>Monday - Sunday</span>
                      <span>Open 24 Hours</span>
                    </div>
                    <div className="hour-item staff-hours">
                      <span>👨‍🏫 Staffed Hours</span>
                      <span>6:00 AM - 10:00 PM</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hour-item">
                      <span>Monday - Friday</span>
                      <span>5:00 AM - 11:00 PM</span>
                    </div>
                    <div className="hour-item">
                      <span>Saturday</span>
                      <span>6:00 AM - 10:00 PM</span>
                    </div>
                    <div className="hour-item">
                      <span>Sunday</span>
                      <span>7:00 AM - 9:00 PM</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Location Map */}
            <div className="info-card">
              <h2><MapPin size={18} /> Location</h2>
              <div className="map-container">
                <iframe
                  title="gym-location"
                  src={`https://www.google.com/maps?q=${gym.city}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  loading="lazy"
                />
              </div>
              <p className="map-address">{gym.city}, Ethiopia</p>
            </div>

            {/* Contact Info */}
            <div className="info-card">
              <h2>Contact Information</h2>
              <div className="contact-grid">
                <div className="contact-item">
                 
                  <span>{gym.phone || "+251 900 000 000"}</span>
                </div>
                <div className="contact-item">
                
                  <span>info@{gym.name.toLowerCase().replace(/\s/g, '')}.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - MEMBERSHIP CARD */}
          <div className="details-right">
            <div className="membership-card-sticky" id="membership-card">
              <div className="membership-header">
                <h3>Membership Plans</h3>
                <p>Choose your perfect plan</p>
              </div>

              <div className="membership-plans">
                {membershipPlans.map((plan, idx) => (
                  <div key={idx} className={`plan-card ${membershipType === plan.name ? 'selected' : ''}`}>
                    <div className="plan-header">
                      <h4>{plan.name}</h4>
                      <div className="plan-price">
                        <span className="price">${plan.price}</span>
                        <span className="period">/{plan.duration}</span>
                      </div>
                    </div>
                    <ul className="plan-features">
                      {plan.features.map((feature, i) => (
                        <li key={i}>
                          <CheckCircle size={14} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button 
                      className="select-plan-btn"
                      onClick={() => {
                        setMembershipType(plan.name);
                        setStartDate(new Date().toISOString().split('T')[0]);
                      }}
                    >
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>

              <button 
                className="join-now-btn"
                onClick={() => setShowBookingForm(true)}
                disabled={!membershipType}
              >
                <CreditCard size={16} />
                Join Now
              </button>

              <div className="membership-guarantee">
                <CheckCircle size={14} />
                <span>Free trial available • Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEMBERSHIP FORM MODAL */}
      {showBookingForm && (
        <div className="modal-overlay" onClick={() => setShowBookingForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingForm(false)}>
              <X size={22} />
            </button>
            
            <div className="modal-header">
              <h2>Start Your Membership</h2>
              <p>{gym.name} • {membershipType} Plan</p>
            </div>

            <div className="modal-body">
              <form className="membership-form">
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
                    <label>Start Date *</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Emergency Contact Name *</label>
                  <input type="text" placeholder="Emergency contact name" required />
                </div>

                <div className="form-group">
                  <label>Emergency Contact Phone *</label>
                  <input type="tel" placeholder="Emergency contact number" required />
                </div>

                <div className="membership-summary">
                  <h4>Membership Summary</h4>
                  <div className="summary-row">
                    <span>Plan</span>
                    <span>{membershipType}</span>
                  </div>
                  <div className="summary-row">
                    <span>Monthly Fee</span>
                    <span>${membershipPlans.find(p => p.name === membershipType)?.price || 0}</span>
                  </div>
                  <div className="summary-row">
                    <span>Registration Fee</span>
                    <span>$10</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Today</span>
                    <span>${(Number(membershipPlans.find(p => p.name === membershipType)?.price || 0)) + 10}</span>
                  </div>
                </div>

                <button type="submit" className="confirm-membership-btn">
                  <CheckCircle size={18} />
                  Start Membership
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

        .gym-details-full {
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
          --orange: #ff6d00;
          --orange-light: #ff9800;
          --orange-dim: #fff3e0;
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
          background: var(--orange);
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
          background: var(--orange);
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
        .thumbnail.active { opacity: 1; border: 2px solid var(--orange); }
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
          background: var(--orange-dim);
          color: var(--orange);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .gym-name {
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
          background: var(--orange-dim);
          padding: 0.8rem 1.5rem;
          border-radius: 16px;
          text-align: center;
        }
        .price-amount {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--orange);
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

        /* Facilities Grid */
        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }
        .facility-card {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
        }
        .facility-icon { color: var(--orange); }

        /* Class Schedule */
        .schedule-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .schedule-item {
          display: flex;
          gap: 1rem;
          padding: 0.8rem;
          background: var(--bg);
          border-radius: 12px;
        }
        .schedule-time {
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--orange);
          min-width: 80px;
        }
        .schedule-info h3 {
          font-family: var(--font-serif);
          font-size: 0.9rem;
          margin-bottom: 0.2rem;
        }
        .schedule-info p {
          font-family: var(--font-sans);
          font-size: 0.7rem;
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
          background: var(--orange-dim);
          border-radius: 12px;
          color: var(--orange);
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
          color: var(--orange);
          font-weight: 600;
          background: var(--orange-dim);
          padding: 0.5rem 1rem;
          border-radius: 12px;
        }
        .hour-item.staff-hours {
          background: var(--bg);
          padding: 0.5rem 1rem;
          border-radius: 12px;
          color: var(--gray);
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

        /* RIGHT COLUMN - MEMBERSHIP CARD */
        .details-right { position: relative; }
        .membership-card-sticky {
          position: sticky;
          top: 20px;
          background: var(--white);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }
        .membership-header h3 { font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.25rem; }
        .membership-header p { font-family: var(--font-sans); font-size: 0.75rem; color: var(--gray); margin-bottom: 1rem; }
        
        .membership-plans { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem; max-height: 400px; overflow-y: auto; }
        .plan-card {
          border: 1px solid var(--gray-light);
          border-radius: 16px;
          padding: 1rem;
          transition: var(--transition);
          cursor: pointer;
        }
        .plan-card.selected {
          border-color: var(--orange);
          background: var(--orange-dim);
        }
        .plan-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
        .plan-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .plan-header h4 { font-family: var(--font-serif); font-size: 1.1rem; }
        .plan-price .price { font-size: 1.2rem; font-weight: 700; color: var(--orange); }
        .plan-price .period { font-size: 0.7rem; color: var(--gray); }
        .plan-features { list-style: none; padding: 0; margin: 0 0 0.75rem 0; }
        .plan-features li {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          color: var(--gray);
          margin-bottom: 0.3rem;
        }
        .select-plan-btn {
          width: 100%;
          padding: 0.4rem;
          background: none;
          border: 1px solid var(--orange);
          border-radius: 30px;
          color: var(--orange);
          cursor: pointer;
          transition: var(--transition);
        }
        .select-plan-btn:hover { background: var(--orange); color: white; }
        
        .join-now-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--orange);
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
        .join-now-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .join-now-btn:hover:not(:disabled) { background: #e65100; transform: translateY(-2px); }
        .membership-guarantee {
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
        .membership-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; }
        .form-group input { padding: 0.6rem; border: 1px solid var(--gray-light); border-radius: 10px; font-family: var(--font-serif); }
        .membership-summary {
          background: var(--bg);
          padding: 1rem;
          border-radius: 12px;
        }
        .membership-summary h4 { font-family: var(--font-serif); margin-bottom: 0.5rem; }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          padding: 0.2rem 0;
        }
        .summary-row.total {
          font-weight: 700;
          color: var(--orange);
          border-top: 1px solid var(--gray-light);
          margin-top: 0.3rem;
          padding-top: 0.5rem;
        }
        .confirm-membership-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--orange);
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
        .back-btn { margin-top: 1rem; padding: 0.6rem 1.5rem; background: var(--orange); color: white; border: none; border-radius: 40px; cursor: pointer; }

        /* ANIMATIONS */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .details-two-columns { grid-template-columns: 1fr; }
          .details-right { order: -1; }
          .membership-card-sticky { position: relative; top: 0; }
        }
        @media (max-width: 768px) {
          .details-header { flex-direction: column; }
          .form-row { grid-template-columns: 1fr; }
          .amenities-grid-full { grid-template-columns: 1fr 1fr; }
          .main-image { height: 40vh; }
          .facilities-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .amenities-grid-full { grid-template-columns: 1fr; }
          .back-button span { display: none; }
        }
      `}</style>
    </div>
  );
};

export default GymDetails;