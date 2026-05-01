import { useState } from "react";
import { useParams } from "react-router-dom";
import { hospitals } from "../data/hospitals";
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
  Hospital,
  Stethoscope,
  Ambulance,
  AlertCircle,
  Activity,
  HeartPulse,
  Microscope,
  Syringe,
  Shield,
  Truck,
} from "lucide-react";

const HospitalDetails = () => {
  const { id } = useParams();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [department, setDepartment] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const hospital = hospitals.find((item) => item.id === Number(id));

  if (!hospital) {
    return (
      <div className="not-found-full">
        <div className="not-found-content">
          <span className="not-found-icon">🏥</span>
          <h1>Hospital Not Found</h1>
          <p>The hospital you're looking for doesn't exist or has been removed</p>
          <button onClick={() => window.history.back()} className="back-btn">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  
  const departments = [
    "Cardiology", "Neurology", "Pediatrics", "Orthopedics", 
    "Gynecology", "Dermatology", "Ophthalmology", "Dentistry",
    "Emergency", "Radiology", "Pathology", "Pharmacy"
  ];

  const amenitiesList = [
    { icon: <Ambulance size={20} />, label: "Emergency Services", available: hospital.hasEmergency },
    { icon: <Clock size={20} />, label: "24/7 Service", available: hospital.is24Hours },
    { icon: <Car size={20} />, label: "Parking", available: true },
    { icon: <Wifi size={20} />, label: "Free Wi-Fi", available: true },
    { icon: <Shield size={20} />, label: "ICU", available: true },
    { icon: <Microscope size={20} />, label: "Laboratory", available: true },
    { icon: <Activity size={20} />, label: "Pharmacy", available: true },
    { icon: <Truck size={20} />, label: "Ambulance", available: hospital.hasEmergency },
  ];

  const specialtyDoctors = [
    { name: "Dr. Sarah Johnson", specialty: "Cardiologist", experience: "15 years", availability: "Mon, Wed, Fri" },
    { name: "Dr. Michael Chen", specialty: "Neurologist", experience: "12 years", availability: "Tue, Thu" },
    { name: "Dr. Emily Williams", specialty: "Pediatrician", experience: "10 years", availability: "Mon - Fri" },
    { name: "Dr. James Wilson", specialty: "Orthopedic Surgeon", experience: "18 years", availability: "Wed, Fri" },
    { name: "Dr. Maria Garcia", specialty: "Gynecologist", experience: "14 years", availability: "Mon - Thu" },
  ];

  return (
    <div className="hospital-details-full">
      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={20} />
        <span>Back to Hospitals</span>
      </button>

      {/* IMAGE GALLERY */}
      <div className="gallery-full">
        <div className="main-image">
          <img src={hospital.image} alt={hospital.name} />
          <button className="wishlist-btn" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart size={22} fill={isWishlisted ? "#b8860b" : "none"} color={isWishlisted ? "#b8860b" : "white"} />
          </button>
          <button className="share-btn">
            <Share2 size={18} color="white" />
          </button>
          {hospital.hasEmergency && <span className="emergency-badge">🚨 Emergency 24/7</span>}
          {hospital.is24Hours && <span className="hours-badge">24/7 Open</span>}
        </div>
        <div className="thumbnail-strip">
          {[hospital.image, hospital.image, hospital.image].map((img, idx) => (
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
              {hospital.hasEmergency ? "Tertiary Care • Emergency Ready" : "Multi-Specialty Hospital"}
            </div>
            <h1 className="hospital-name">{hospital.name}</h1>
            <div className="location-rating">
              <span className="location">
                <MapPin size={16} /> {hospital.city}, Ethiopia
              </span>
              <span className="rating">
                <Star size={16} fill="#b8860b" color="#b8860b" />
                {hospital.rating} / 5
                <span className="review-count">(512 reviews)</span>
              </span>
            </div>
          </div>
          <div className="emergency-contact">
            <AlertCircle size={18} />
            <div>
              <span className="emergency-label">Emergency</span>
              <span className="emergency-number">{hospital.phone || "+251 911 123 456"}</span>
            </div>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="details-two-columns">
          
          {/* LEFT COLUMN */}
          <div className="details-left">
            
            {/* Description */}
            <div className="info-card">
              <h2>About This Hospital</h2>
              <p className={`description-text ${showFullDescription ? 'expanded' : 'collapsed'}`}>
                {hospital.description || `${hospital.name} is a leading healthcare institution in ${hospital.city}, dedicated to providing exceptional medical care. ${hospital.hasEmergency ? 'Our emergency department is fully equipped and operational 24/7 to handle all critical cases.' : ''} ${hospital.is24Hours ? 'We offer round-the-clock services for your convenience.' : ''} With state-of-the-art facilities and a team of experienced medical professionals, we are committed to delivering compassionate, high-quality healthcare to our community.`}
              </p>
              <button className="read-more-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
                {showFullDescription ? "Read Less ▲" : "Read More ▼"}
              </button>
            </div>

            {/* Departments */}
            <div className="info-card">
              <h2><Stethoscope size={18} /> Departments & Specialties</h2>
              <div className="departments-grid">
                {departments.map((dept, idx) => (
                  <div key={idx} className="department-card">
                    <HeartPulse size={16} />
                    <span>{dept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialist Doctors */}
            <div className="info-card">
              <h2><Users size={18} /> Specialist Doctors</h2>
              <div className="doctors-list">
                {specialtyDoctors.map((doctor, idx) => (
                  <div key={idx} className="doctor-card">
                    <div className="doctor-avatar">
                      <Stethoscope size={24} />
                    </div>
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                      <p>{doctor.specialty}</p>
                      <span className="doctor-exp">{doctor.experience} experience</span>
                      <span className="doctor-availability">Available: {doctor.availability}</span>
                    </div>
                    <button className="book-doctor-btn">Book →</button>
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
              <h2><Clock size={18} /> Visiting Hours & Operation</h2>
              <div className="hours-list">
                {hospital.is24Hours ? (
                  <>
                    <div className="hour-item highlight">
                      <span>Emergency & Inpatient</span>
                      <span>24/7 - Always Open</span>
                    </div>
                    <div className="hour-item">
                      <span>OPD (Outpatient)</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="hour-item">
                      <span>Visiting Hours</span>
                      <span>4:00 PM - 6:00 PM</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hour-item">
                      <span>Emergency</span>
                      <span>24/7</span>
                    </div>
                    <div className="hour-item">
                      <span>General OPD</span>
                      <span>9:00 AM - 5:00 PM (Mon-Sat)</span>
                    </div>
                    <div className="hour-item">
                      <span>Visiting Hours</span>
                      <span>3:00 PM - 6:00 PM</span>
                    </div>
                  </>
                )}
                <div className="hour-item ambulance-contact">
                  <span>🚑 Ambulance</span>
                  <span>{hospital.phone || "+251 911 123 456"}</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="info-card">
              <h2><MapPin size={18} /> Location</h2>
              <div className="map-container">
                <iframe
                  title="hospital-location"
                  src={`https://www.google.com/maps?q=${hospital.city}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  loading="lazy"
                />
              </div>
              <p className="map-address">{hospital.city}, Ethiopia</p>
            </div>

            {/* Contact Info */}
            <div className="info-card">
              <h2>Contact Information</h2>
              <div className="contact-grid">
                <div className="contact-item">
                  <Phone size={18} />
                  <span>{hospital.phone || "+251 900 000 000"}</span>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <span>info@{hospital.name.toLowerCase().replace(/\s/g, '')}.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - APPOINTMENT CARD */}
          <div className="details-right">
            <div className="appointment-card-sticky" id="appointment-card">
              <div className="appointment-header">
                <h3>Book Appointment</h3>
                <p>Schedule a consultation</p>
              </div>

              <div className="appointment-form-compact">
                <div className="form-field">
                  <label><Calendar size={14} /> Appointment Date</label>
                  <input 
                    type="date" 
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-field">
                  <label><Clock size={14} /> Preferred Time</label>
                  <select value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)}>
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label><Stethoscope size={14} /> Department</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <button 
                  className="book-appointment-btn"
                  onClick={() => setShowAppointmentForm(true)}
                  disabled={!appointmentDate || !appointmentTime || !department}
                >
                  <Calendar size={16} />
                  Book Appointment
                </button>

                <div className="appointment-guarantee">
                  <CheckCircle size={14} />
                  <span>Free cancellation • No registration fee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPOINTMENT FORM MODAL */}
      {showAppointmentForm && (
        <div className="modal-overlay" onClick={() => setShowAppointmentForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAppointmentForm(false)}>
              <X size={22} />
            </button>
            
            <div className="modal-header">
              <h2>Book Your Appointment</h2>
              <p>{hospital.name} • {department} • {appointmentDate} at {appointmentTime}</p>
            </div>

            <div className="modal-body">
              <form className="appointment-form">
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
                    <label>Date of Birth *</label>
                    <input type="date" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Reason for Visit *</label>
                  <textarea rows={3} placeholder="Please describe your symptoms or reason for appointment..." required></textarea>
                </div>

                <div className="form-group">
                  <label>Previous Medical History</label>
                  <textarea rows={2} placeholder="Any relevant medical history or allergies?"></textarea>
                </div>

                <div className="appointment-summary">
                  <h4>Appointment Summary</h4>
                  <div className="summary-row">
                    <span>Department</span>
                    <span>{department}</span>
                  </div>
                  <div className="summary-row">
                    <span>Date & Time</span>
                    <span>{appointmentDate} at {appointmentTime}</span>
                  </div>
                  <div className="summary-row">
                    <span>Consultation Fee</span>
                    <span>ETB 500</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>ETB 500</span>
                  </div>
                </div>

                <button type="submit" className="confirm-appointment-btn">
                  <CheckCircle size={18} />
                  Confirm Appointment
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

        .hospital-details-full {
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
          --red: #c62828;
          --red-light: #ef5350;
          --red-dim: #ffebee;
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
          background: var(--red);
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
        .emergency-badge {
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
        .hours-badge {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: var(--red);
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
        .thumbnail.active { opacity: 1; border: 2px solid var(--red); }
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
          background: var(--red-dim);
          color: var(--red);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .hospital-name {
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
        .emergency-contact {
          background: var(--red-dim);
          padding: 0.5rem 1rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .emergency-label { font-family: var(--font-sans); font-size: 0.7rem; display: block; }
        .emergency-number { font-family: var(--font-serif); font-weight: 700; font-size: 1rem; color: var(--red); }

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

        /* Departments Grid */
        .departments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 0.5rem;
        }
        .department-card {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: var(--bg);
          border-radius: 10px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
        }

        /* Doctors List */
        .doctors-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .doctor-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg);
          border-radius: 12px;
          transition: var(--transition);
        }
        .doctor-card:hover { background: var(--red-dim); }
        .doctor-avatar {
          width: 50px;
          height: 50px;
          background: var(--red-dim);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--red);
        }
        .doctor-info { flex: 1; }
        .doctor-info h3 { font-family: var(--font-serif); font-size: 1rem; margin-bottom: 0.2rem; }
        .doctor-info p { font-family: var(--font-sans); font-size: 0.7rem; color: var(--gray); }
        .doctor-exp, .doctor-availability {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          display: inline-block;
          margin-right: 0.5rem;
          color: var(--red);
        }
        .book-doctor-btn {
          background: none;
          border: 1px solid var(--red);
          border-radius: 30px;
          padding: 0.3rem 0.8rem;
          color: var(--red);
          cursor: pointer;
          transition: var(--transition);
        }
        .book-doctor-btn:hover { background: var(--red); color: white; }

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
          background: var(--red-dim);
          border-radius: 12px;
          color: var(--red);
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
          color: var(--red);
          font-weight: 600;
          background: var(--red-dim);
          padding: 0.5rem 1rem;
          border-radius: 12px;
        }
        .hour-item.ambulance-contact {
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

        /* RIGHT COLUMN - APPOINTMENT CARD */
        .details-right { position: relative; }
        .appointment-card-sticky {
          position: sticky;
          top: 20px;
          background: var(--white);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }
        .appointment-header h3 { font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.25rem; }
        .appointment-header p { font-family: var(--font-sans); font-size: 0.75rem; color: var(--gray); margin-bottom: 1rem; }
        .appointment-form-compact { display: flex; flex-direction: column; gap: 0.8rem; }
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
        .book-appointment-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--red);
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
        .book-appointment-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .book-appointment-btn:hover:not(:disabled) { background: #b71c1c; transform: translateY(-2px); }
        .appointment-guarantee {
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
        .appointment-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.6rem;
          border: 1px solid var(--gray-light);
          border-radius: 10px;
          font-family: var(--font-serif);
        }
        .appointment-summary {
          background: var(--bg);
          padding: 1rem;
          border-radius: 12px;
        }
        .appointment-summary h4 { font-family: var(--font-serif); margin-bottom: 0.5rem; }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          padding: 0.2rem 0;
        }
        .summary-row.total {
          font-weight: 700;
          color: var(--red);
          border-top: 1px solid var(--gray-light);
          margin-top: 0.3rem;
          padding-top: 0.5rem;
        }
        .confirm-appointment-btn {
          width: 100%;
          padding: 0.8rem;
          background: var(--red);
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
        .back-btn { margin-top: 1rem; padding: 0.6rem 1.5rem; background: var(--red); color: white; border: none; border-radius: 40px; cursor: pointer; }

        /* ANIMATIONS */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .details-two-columns { grid-template-columns: 1fr; }
          .details-right { order: -1; }
          .appointment-card-sticky { position: relative; top: 0; }
        }
        @media (max-width: 768px) {
          .details-header { flex-direction: column; }
          .form-row { grid-template-columns: 1fr; }
          .amenities-grid-full { grid-template-columns: 1fr 1fr; }
          .main-image { height: 40vh; }
          .departments-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .amenities-grid-full { grid-template-columns: 1fr; }
          .back-button span { display: none; }
          .departments-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default HospitalDetails;