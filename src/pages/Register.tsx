import { useState } from "react";
import { 
  Building2, 
 
  Phone, 
 
  Wifi,
  Car,
  Coffee,
  Waves,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Star,
  Camera,
  
} from "lucide-react";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    city: "",
    location: "",
    price: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    wifi: false,
    parking: false,
    breakfast: false,
    swimmingPool: false,
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Hotel",
    "Resort",
    "Lodge",
    "Restaurant",
    "Cafe",
    "Coffee Shop",
    "Guest House",
    "Bed & Breakfast",
    "Boutique Hotel",
    "Eco Lodge",
    "Spa & Wellness",
    "Motel",
    "Apartment",
    "Vacation Rental",
    "Camping Site"
  ];

  const ethiopianCities = [
    "Addis Ababa", "Bahir Dar", "Hawassa", "Gonder", "Dessie", 
    "Debre Birhan", "Debre Markos", "Adama", "Jimma", "Arba Minch", 
    "Lalibela", "Axum", "Harar", "Dire Dawa", "Mekelle", "Shashamane", 
    "Soddo", "Wolaita Sodo", "Nekemte", "Assosa", "Gambela", "Jijiga", 
    "Semera", "Bule Hora", "Dilla", "Hossana", "Debre Tabor", "Ambo", 
    "Woldia", "Kombolcha"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }
    
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
    });

    setImages(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.businessName) newErrors.businessName = "Business name is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.location) newErrors.location = "Location is required";
      if (!formData.price) newErrors.price = "Price is required";
      if (!formData.description) newErrors.description = "Description is required";
    } else if (currentStep === 2) {
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    } else if (currentStep === 3) {
      if (images.length === 0) newErrors.images = "At least one image is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      console.log("Form submitted:", { ...formData, images });
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <div className="register-success">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h1>Registration Submitted!</h1>
          <p>Thank you for registering your business with Smart Hotel Finder.</p>
          <p>Our team will review your information and contact you within 2-3 business days.</p>
          <button onClick={() => window.location.href = "/"} className="success-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page-full">
      {/* Hero Section */}
      <div className="register-hero">
        <div className="register-hero-content">
          <span className="hero-badge">✦ List Your Business</span>
          <h1 className="hero-title">Register Your Business</h1>
          <p className="hero-description">
            Reach thousands of travelers and guests across Ethiopia
          </p>
          <div className="price-tag">
            <span className="price-amount">10,000 ETB</span>
            <span className="price-period">/ year</span>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="register-main">
        <div className="register-container">
          
          {/* Progress Steps */}
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <div className="step-label">Basic Info</div>
            </div>
            <div className={`step-line ${currentStep >= 2 ? "active" : ""}`}></div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <div className="step-label">Contact</div>
            </div>
            <div className={`step-line ${currentStep >= 3 ? "active" : ""}`}></div>
            <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <div className="step-label">Photos</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="form-step fade-in">
                <h2 className="section-title">
                  <Building2 size={20} />
                  Basic Information
                </h2>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Business / Hotel Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      placeholder="e.g., Addis Luxury Hotel"
                      value={formData.businessName}
                      onChange={handleChange}
                      className={errors.businessName ? "error" : ""}
                    />
                    {errors.businessName && <span className="error-message">{errors.businessName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={errors.category ? "error" : ""}
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <span className="error-message">{errors.category}</span>}
                  </div>

                  <div className="form-group">
                    <label>City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? "error" : ""}
                    >
                      <option value="">Select city</option>
                      {ethiopianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label>Exact Location *</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g., Bole, Near Airport"
                      value={formData.location}
                      onChange={handleChange}
                      className={errors.location ? "error" : ""}
                    />
                    {errors.location && <span className="error-message">{errors.location}</span>}
                  </div>

                  <div className="form-group">
                    <label>Price Per Night (ETB) *</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="e.g., 2500"
                      value={formData.price}
                      onChange={handleChange}
                      className={errors.price ? "error" : ""}
                    />
                    {errors.price && <span className="error-message">{errors.price}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Business Description *</label>
                    <textarea
                      name="description"
                      rows={4}
                      placeholder="Describe your business, amenities, and what makes it special..."
                      value={formData.description}
                      onChange={handleChange}
                      className={errors.description ? "error" : ""}
                    ></textarea>
                    {errors.description && <span className="error-message">{errors.description}</span>}
                  </div>
                </div>

                <div className="amenities-section">
                  <h3>Amenities</h3>
                  <div className="checkbox-grid">
                    <label className="checkbox-label">
                      <input type="checkbox" name="wifi" checked={formData.wifi} onChange={handleCheckboxChange} />
                      <Wifi size={16} />
                      <span>Wi-Fi</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="parking" checked={formData.parking} onChange={handleCheckboxChange} />
                      <Car size={16} />
                      <span>Parking</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="breakfast" checked={formData.breakfast} onChange={handleCheckboxChange} />
                      <Coffee size={16} />
                      <span>Breakfast</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="swimmingPool" checked={formData.swimmingPool} onChange={handleCheckboxChange} />
                      <Waves size={16} />
                      <span>Swimming Pool</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="form-step fade-in">
                <h2 className="section-title">
                  <Phone size={20} />
                  Contact Information
                </h2>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+251 900 000 000"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="info@yourbusiness.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Website (Optional)</label>
                    <input
                      type="text"
                      name="website"
                      placeholder="www.yourbusiness.com"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="info-box">
                  <AlertCircle size={20} />
                  <div>
                    <strong>Information Note</strong>
                    <p>Your contact information will be displayed publicly on your business listing.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Images */}
            {currentStep === 3 && (
              <div className="form-step fade-in">
                <h2 className="section-title">
                  <Camera size={20} />
                  Upload Photos
                </h2>
                
                <div className="upload-area" onClick={() => document.getElementById("imageUpload")?.click()}>
                  <Upload size={32} />
                  <p>Click or drag to upload images</p>
                  <span>PNG, JPG up to 5MB (Max 5 images)</span>
                  <input
                    id="imageUpload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>

                {errors.images && <span className="error-message">{errors.images}</span>}

                {imagePreviews.length > 0 && (
                  <div className="image-preview-grid">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="image-preview-card">
                        <img src={preview} alt={`Preview ${index + 1}`} />
                        <button type="button" className="remove-image" onClick={() => removeImage(index)}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="info-box">
                  <Star size={20} />
                  <div>
                    <strong>Photo Tips</strong>
                    <p>Upload high-quality images of your property, rooms, amenities, and surroundings. First image will be your main listing photo.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Navigation */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" className="btn-prev" onClick={prevStep}>
                  <ChevronLeft size={18} />
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button type="button" className="btn-next" onClick={nextStep}>
                  Next
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Submit Registration (10,000 ETB/year)
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .register-page-full {
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
          --error: #dc2626;
          --success: #10b981;
          --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);
          --transition: all 0.3s ease;
        }

        /* Hero Section */
        .register-hero {
          background: linear-gradient(135deg, #1a2a35 0%, #0f1a20 100%);
          padding: 3rem 1.5rem;
          text-align: center;
        }

        .register-hero-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .hero-badge {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold-light);
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 600;
          color: white;
          margin: 0.5rem 0 1rem;
        }

        .hero-description {
          font-family: var(--font-serif);
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 1.5rem;
        }

        .price-tag {
          display: inline-block;
          background: rgba(184, 134, 11, 0.2);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1.5rem;
          border-radius: 60px;
          border: 1px solid var(--gold-light);
        }

        .price-amount {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gold-light);
        }

        .price-period {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Main Container */
        .register-main {
          background: var(--bg);
          padding: 2rem 1rem;
        }

        .register-container {
          max-width: 800px;
          margin: 0 auto;
        }

        /* Progress Steps */
        .progress-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .step-number {
          width: 40px;
          height: 40px;
          background: var(--white);
          border: 2px solid var(--gray-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          font-weight: 600;
          color: var(--gray);
          transition: var(--transition);
        }

        .step.active .step-number {
          background: var(--gold);
          border-color: var(--gold);
          color: white;
        }

        .step-label {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--gray);
        }

        .step.active .step-label {
          color: var(--gold);
          font-weight: 600;
        }

        .step-line {
          width: 60px;
          height: 2px;
          background: var(--gray-light);
          margin: 0 0.5rem 1.5rem 0.5rem;
          transition: var(--transition);
        }

        .step-line.active {
          background: var(--gold);
        }

        /* Form */
        .register-form {
          background: var(--white);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: var(--shadow);
        }

        .form-step {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--gold-dim);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--dark);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: span 2;
        }

        .form-group label {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--gray);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid var(--gray-light);
          border-radius: 12px;
          font-family: var(--font-serif);
          font-size: 0.9rem;
          transition: var(--transition);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.1);
        }

        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
          border-color: var(--error);
        }

        .error-message {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--error);
        }

        /* Amenities */
        .amenities-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--gray-light);
        }

        .amenities-section h3 {
          font-family: var(--font-serif);
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 0.75rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          cursor: pointer;
        }

        .checkbox-label input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: var(--gold);
        }

        /* Upload Area */
        .upload-area {
          border: 2px dashed var(--gray-light);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: var(--transition);
          margin-bottom: 1.5rem;
        }

        .upload-area:hover {
          border-color: var(--gold);
          background: var(--gold-dim);
        }

        .upload-area p {
          font-family: var(--font-serif);
          margin-top: 0.5rem;
        }

        .upload-area span {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--gray);
        }

        /* Image Preview */
        .image-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .image-preview-card {
          position: relative;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
        }

        .image-preview-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-image {
          position: absolute;
          top: 5px;
          right: 5px;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: var(--transition);
        }

        .remove-image:hover {
          background: var(--error);
        }

        /* Info Box */
        .info-box {
          background: var(--gold-dim);
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .info-box p {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--gray);
          margin-top: 0.25rem;
        }

        /* Navigation Buttons */
        .form-navigation {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid var(--gray-light);
        }

        .btn-prev,
        .btn-next,
        .btn-submit {
          padding: 0.75rem 1.5rem;
          border-radius: 40px;
          font-family: var(--font-sans);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-prev {
          background: none;
          border: 1px solid var(--gray-light);
          color: var(--gray);
        }

        .btn-prev:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .btn-next,
        .btn-submit {
          background: var(--gold);
          border: none;
          color: white;
          margin-left: auto;
        }

        .btn-next:hover,
        .btn-submit:hover {
          background: #9a7209;
          transform: translateX(3px);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Success Page */
        .register-success {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          padding: 2rem;
        }

        .success-card {
          background: var(--white);
          border-radius: 24px;
          padding: 3rem;
          text-align: center;
          max-width: 500px;
          box-shadow: var(--shadow-lg);
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: var(--success);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          margin: 0 auto 1.5rem;
        }

        .success-card h1 {
          font-family: var(--font-serif);
          margin-bottom: 1rem;
        }

        .success-card p {
          font-family: var(--font-sans);
          color: var(--gray);
          margin-bottom: 1rem;
        }

        .success-btn {
          margin-top: 1rem;
          padding: 0.75rem 2rem;
          background: var(--gold);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-family: var(--font-sans);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full-width {
            grid-column: span 1;
          }

          .register-form {
            padding: 1.5rem;
          }

          .progress-steps {
            margin-bottom: 1.5rem;
          }

          .step-line {
            width: 30px;
          }

          .step-label {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .checkbox-grid {
            grid-template-columns: 1fr;
          }

          .form-navigation {
            flex-direction: column;
          }

          .btn-prev,
          .btn-next,
          .btn-submit {
            justify-content: center;
          }

          .btn-next,
          .btn-submit {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;