import {
  Hotel,
  UtensilsCrossed,
  ShoppingCart,
  Coffee,
  Heart,
} from "lucide-react";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <h1>About Smart Ethiopia Finder</h1>
        <p>
          A modern platform that helps you discover Hotels, Restaurants,
          Supermarkets, Cafés, and local services across Ethiopia
          all in one place.
        </p>
      </section>

      {/* FEATURES */}
      <section className="about-section">
        <h2>What We Do</h2>

        <div className="about-grid">

          <div className="about-card">
            <h3>
              <Hotel size={22} />
              Hotels
            </h3>
            <p>
              Find the best hotels across Ethiopia with price,
              rating, and location filters.
            </p>
          </div>

          <div className="about-card">
            <h3>
              <UtensilsCrossed size={22} />
              Restaurants
            </h3>
            <p>
              Discover traditional and modern restaurants
              in all major Ethiopian cities.
            </p>
          </div>

          <div className="about-card">
            <h3>
              <ShoppingCart size={22} />
              Supermarkets
            </h3>
            <p>
              Locate nearby supermarkets with delivery,
              pricing, and availability options.
            </p>
          </div>

          <div className="about-card">
            <h3>
              <Coffee size={22} />
              Cafés & Shops
            </h3>
            <p>
              Explore coffee shops, cafés, and local
              businesses easily.
            </p>
          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          We aim to build a smart digital ecosystem in Ethiopia
          where anyone can easily find trusted services,
          compare options, and make better decisions
          using technology.
        </p>
      </section>

      {/* FOOTER NOTE */}
      <section className="about-footer">
        <p>
          Built with <Heart size={16} className="heart-icon" /> by Ethiopian developers
          to support digital transformation.
        </p>
      </section>

      {/* CSS */}
      <style>{`
        .about-page {
          font-family: "Segoe UI", sans-serif;
          background: #f8f9fb;
          color: #1e2a2e;
          padding-bottom: 60px;
          min-height: 100vh;
        }

        /* HERO */
        .about-hero {
          background: linear-gradient(135deg, #1a2a35, #0f1a20);
          color: white;
          text-align: center;
          padding: 80px 20px;
        }

        .about-hero h1 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .about-hero p {
          max-width: 700px;
          margin: auto;
          font-size: 1.05rem;
          opacity: 0.9;
          line-height: 1.7;
        }

        /* SECTION */
        .about-section,
        .about-mission {
          max-width: 1100px;
          margin: auto;
          padding: 60px 20px;
          text-align: center;
        }

        .about-section h2,
        .about-mission h2 {
          font-size: 2rem;
          margin-bottom: 30px;
          font-weight: 700;
        }

        /* GRID */
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .about-card {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transition: 0.3s;
        }

        .about-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.12);
        }

        .about-card h3 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 14px;
          color: #b8860b;
          font-size: 1.15rem;
        }

        .about-card p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #555;
        }

        /* MISSION */
        .about-mission p {
          max-width: 800px;
          margin: auto;
          font-size: 1.05rem;
          line-height: 1.8;
          color: #444;
        }

        /* FOOTER */
        .about-footer {
          text-align: center;
          padding: 30px;
          color: #777;
          font-size: 0.95rem;
        }

        .about-footer p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .heart-icon {
          color: #b8860b;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 2rem;
          }

          .about-hero p {
            font-size: 1rem;
          }

          .about-section h2,
          .about-mission h2 {
            font-size: 1.7rem;
          }
        }

        @media (max-width: 480px) {
          .about-hero {
            padding: 60px 20px;
          }

          .about-hero h1 {
            font-size: 1.7rem;
          }

          .about-card {
            padding: 22px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;