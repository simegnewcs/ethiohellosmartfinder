import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Have questions, suggestions, or business inquiries?
          We’re here to help you anytime.
        </p>
      </section>

      {/* CONTENT */}
      <section className="contact-container">

        {/* INFO CARDS */}
        <div className="contact-info">

          <div className="contact-card">
            <h3>
              <MapPin size={20} />
              Location
            </h3>
            <p>Addis Ababa, Ethiopia</p>
          </div>

          <div className="contact-card">
            <h3>
              <Phone size={20} />
              Phone
            </h3>
            <p>+251 900 000 000</p>
          </div>

          <div className="contact-card">
            <h3>
              <Mail size={20} />
              Email
            </h3>
            <p>support@ethiopiafinder.com</p>
          </div>

        </div>

        {/* FORM */}
        <div className="contact-form-box">

          <h2>Send Message</h2>

          <form className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              required
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              placeholder="Your Message..."
              rows={5}
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </section>

      <style>{`
        .contact-page {
          font-family: "Segoe UI", sans-serif;
          background: #f8f9fb;
          color: #1e2a2e;
          padding-bottom: 60px;
          min-height: 100vh;
        }

        /* HERO */
        .contact-hero {
          background: linear-gradient(135deg, #1a2a35, #0f1a20);
          color: white;
          text-align: center;
          padding: 80px 20px;
        }

        .contact-hero h1 {
          font-size: 2.5rem;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .contact-hero p {
          max-width: 700px;
          margin: auto;
          opacity: 0.9;
          line-height: 1.7;
          font-size: 1rem;
        }

        /* CONTAINER */
        .contact-container {
          max-width: 1100px;
          margin: auto;
          padding: 60px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        /* INFO */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transition: 0.3s;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.12);
        }

        .contact-card h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          color: #b8860b;
          font-size: 1.1rem;
        }

        .contact-card p {
          color: #555;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* FORM */
        .contact-form-box {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .contact-form-box h2 {
          margin-bottom: 18px;
          color: #1e2a2e;
          font-size: 1.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .contact-form input,
        .contact-form textarea {
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 12px;
          font-size: 0.95rem;
          outline: none;
          transition: 0.3s;
          font-family: inherit;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #b8860b;
          box-shadow: 0 0 0 3px rgba(184,134,11,0.12);
        }

        .contact-form textarea {
          resize: vertical;
          min-height: 140px;
        }

        .contact-form button {
          padding: 14px;
          background: #b8860b;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .contact-form button:hover {
          background: #a07409;
          transform: translateY(-2px);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .contact-container {
            grid-template-columns: 1fr;
            padding: 40px 20px;
          }

          .contact-hero h1 {
            font-size: 2rem;
          }

          .contact-hero p {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .contact-hero {
            padding: 60px 20px;
          }

          .contact-hero h1 {
            font-size: 1.7rem;
          }

          .contact-form-box,
          .contact-card {
            padding: 20px;
          }
        }
      `}</style>

    </div>
  );
};

export default Contact;