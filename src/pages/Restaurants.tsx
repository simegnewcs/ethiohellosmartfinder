import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Tag,
  DollarSign,
  Wifi,
  Car,
  UtensilsCrossed,
  Coffee,
  SlidersHorizontal,
  Grid,
  List,
  Star,
} from "lucide-react";

const restaurantData = [
  {
    id: 1,
    name: "Addis Garden Restaurant",
    city: "Addis Ababa",
    category: "Restaurant",
    price: 35,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    description:
      "Luxury dining experience with Ethiopian and international dishes.",
    wifi: true,
    parking: true,
    breakfast: true,
    coffee: true,
  },
  {
    id: 2,
    name: "Lake View Café",
    city: "Bahir Dar",
    category: "Cafe",
    price: 20,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    description:
      "Beautiful café with lake views, fresh coffee, and breakfast.",
    wifi: true,
    parking: false,
    breakfast: true,
    coffee: true,
  },
  {
    id: 3,
    name: "Harar Traditional House",
    city: "Harar",
    category: "Restaurant",
    price: 25,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    description:
      "Traditional Ethiopian cultural food and coffee experience.",
    wifi: false,
    parking: true,
    breakfast: false,
    coffee: true,
  },
];

const Restaurants = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

  const ethiopianCities = [
    "Addis Ababa",
    "Adama",
    "Bahir Dar",
    "Hawassa",
    "Harar",
    "Dire Dawa",
    "Mekelle",
    "Jimma",
    "Gondar",
    "Debre Birhan",
    "Arba Minch",
    "Shashemene",
    "Dessie",
    "Nekemte",
    "Assosa",
    "Jijiga",
    "Semera",
    "Axum",
    "Lalibela",
    "Wolaita Sodo",
  ];

  const categoriesList = [
    "Restaurant",
    "Cafe",
    "Coffee Shop",
    "Fine Dining",
    "Traditional Food",
  ];

  const amenitiesList = ["wifi", "parking", "breakfast", "coffee"];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurantData.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        location === "" ||
        restaurant.city.toLowerCase() === location.toLowerCase();

      const matchesCategory =
        category === "" ||
        restaurant.category.toLowerCase() === category.toLowerCase();

      const matchesPrice =
        restaurant.price >= priceRange[0] &&
        restaurant.price <= priceRange[1];

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every(
          (amenity) =>
            restaurant[amenity as keyof typeof restaurant] === true
        );

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesPrice &&
        matchesAmenities
      );
    });

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [search, location, category, priceRange, selectedAmenities, sortBy]);

  const clearAllFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("");
    setPriceRange([0, 150]);
    setSelectedAmenities([]);
    setSortBy("rating");
    setViewMode("grid");
  };

  return (
    <div className="restaurants-page-full">
      <div className="hero-full">
        <div className="hero-full-content">
          <span className="hero-badge">✦ ETHIOPIA • RESTAURANTS</span>
          <h1 className="hero-title">Discover Amazing Restaurants</h1>
          <p className="hero-description">
            Explore top restaurants, cafés, and coffee shops across Ethiopia
          </p>
        </div>
      </div>

      <div className="main-full">
        <div className="filter-bar-full">
          <div className="filter-bar-container">
            <div
              className="filter-bar-header"
              onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
            >
              <div className="filter-info">
                <SlidersHorizontal size={18} />
                <span className="filter-title">Filters & Sorting</span>
              </div>

              <button className="collapse-btn">
                {isFilterCollapsed ? "▼" : "▲"}
              </button>
            </div>

            <div
              className={`filter-bar-body ${
                isFilterCollapsed ? "collapsed" : "expanded"
              }`}
            >
              <div className="filters-grid-full">
                <div className="filter-field">
                  <label className="field-label">
                    <Search size={16} /> Search
                  </label>

                  <input
                    type="text"
                    placeholder="Restaurant name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="field-input"
                  />
                </div>

                <div className="filter-field">
                  <label className="field-label">
                    <MapPin size={16} /> Location
                  </label>

                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="field-select"
                  >
                    <option value="">All Cities</option>

                    {ethiopianCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-field">
                  <label className="field-label">
                    <Tag size={16} /> Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="field-select"
                  >
                    <option value="">All Types</option>

                    {categoriesList.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-field">
                  <label className="field-label">
                    <DollarSign size={16} /> Max Price: ${priceRange[1]}
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, parseInt(e.target.value)])
                    }
                    className="price-slider-full"
                  />
                </div>
              </div>

              <div className="amenities-group-full">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    className={`amenity-chip-full ${
                      selectedAmenities.includes(amenity) ? "active" : ""
                    }`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity === "wifi" && <Wifi size={16} />}
                    {amenity === "parking" && <Car size={16} />}
                    {amenity === "breakfast" && (
                      <UtensilsCrossed size={16} />
                    )}
                    {amenity === "coffee" && <Coffee size={16} />}
                    {amenity}
                  </button>
                ))}
              </div>

              <div className="controls-full">
                <div className="sort-section">
                  <span className="sort-label">Sort by:</span>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select-full"
                  >
                    <option value="rating">Rating (Highest)</option>
                    <option value="price-asc">Price Low to High</option>
                    <option value="price-desc">Price High to Low</option>
                    <option value="name">Name A to Z</option>
                  </select>
                </div>

                <div className="view-section">
                  <button
                    className={`view-btn-full ${
                      viewMode === "grid" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid size={16} /> Grid
                  </button>

                  <button
                    className={`view-btn-full ${
                      viewMode === "list" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List size={16} /> List
                  </button>
                </div>

                <button
                  className="clear-filters-btn"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="results-count-full">
          <span className="count-number">
            {filteredRestaurants.length}
          </span>{" "}
          restaurants found
        </div>

        <div className={`results-container-full ${viewMode}`}>
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className={`result-card-full ${viewMode}`}
            >
              <div className="card-image-area-full">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="card-img-full"
                />

                <span className="rating-badge-full">
                  <Star size={14} /> {restaurant.rating}
                </span>
              </div>

              <div className="card-details-full">
                <h3 className="hotel-title-full">{restaurant.name}</h3>

                <p className="hotel-location-full">
                  <MapPin size={15} /> {restaurant.city}
                </p>

                <p className="hotel-description-full">
                  {restaurant.description}
                </p>

                <div className="card-footer-full">
                  <div>
                    <span className="price-amount-full">
                      ${restaurant.price}
                    </span>
                    <span className="price-period-full"> /meal</span>
                  </div>

                  <Link
                    to={`/restaurant/${restaurant.id}`}
                    className="details-link-full"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .restaurants-page-full {
    --font-serif: "Times New Roman", Times, Georgia, "EB Garamond", serif;
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --gold: #b8860b;
    --gold-light: #d4af37;
    --gold-dim: #faf4e8;
    --dark: #1e2a2e;
    --gray: #5a6b6f;
    --gray-light: #ddd6c7;
    --bg: #fefcf8;
    --white: #ffffff;
    --shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
    --shadow-hover: 0 14px 40px rgba(0, 0, 0, 0.12);
    --transition: all 0.3s ease;
  }

  body {
    background: var(--bg);
  }

  /* HERO */
  .hero-full {
    width: 100%;
    background: linear-gradient(135deg, #16242c 0%, #0d161c 100%);
    padding: 4rem 1rem;
    text-align: center;
  }

  .hero-full-content {
    max-width: 800px;
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
    font-size: clamp(2rem, 5vw, 3rem);
    color: white;
    margin: 0.8rem 0 1rem;
    font-weight: 700;
  }

  .hero-description {
    font-family: var(--font-serif);
    font-size: 1rem;
    color: rgba(255,255,255,0.85);
    line-height: 1.7;
  }

  /* MAIN */
  .main-full {
    width: 100%;
    background: var(--bg);
  }

  /* FILTER BAR */
  .filter-bar-full {
    width: 100%;
    background: var(--white);
    border-bottom: 1px solid var(--gray-light);
    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
  }

  .filter-bar-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .filter-bar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .filter-bar-header:hover {
    background: rgba(184, 134, 11, 0.03);
  }

  .filter-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .filter-title {
    font-family: var(--font-serif);
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--dark);
  }

  .collapse-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--gold);
    font-weight: 700;
  }

  .filter-bar-body {
    overflow: hidden;
    transition: 0.4s ease;
  }

  .filter-bar-body.expanded {
    padding: 1.5rem;
    border-top: 1px solid var(--gray-light);
  }

  .filter-bar-body.collapsed {
    max-height: 0;
    padding: 0;
    opacity: 0;
  }

  /* FILTER GRID */
  .filters-grid-full {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .filter-field {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .field-label {
    font-family: var(--font-sans);
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--gray);
    text-transform: uppercase;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .field-input,
  .field-select {
    height: 50px;
    padding: 0 1rem;
    border: 1px solid var(--gray-light);
    border-radius: 14px;
    background: white;
    font-size: 0.95rem;
    font-family: var(--font-serif);
    transition: var(--transition);
  }

  .field-input:focus,
  .field-select:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 4px rgba(184,134,11,0.08);
  }

  /* PRICE SLIDER */
  .price-slider-full {
    width: 100%;
    height: 6px;
    border-radius: 10px;
    background: var(--gray-light);
    appearance: none;
    cursor: pointer;
  }

  .price-slider-full::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--gold);
    cursor: pointer;
  }

  /* AMENITIES */
  .amenities-group-full {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    padding-top: 1rem;
    padding-bottom: 1.5rem;
    border-top: 1px solid var(--gray-light);
    border-bottom: 1px solid var(--gray-light);
  }

  .amenity-chip-full {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.1rem;
    border: 1px solid var(--gray-light);
    border-radius: 30px;
    background: white;
    cursor: pointer;
    font-size: 0.85rem;
    font-family: var(--font-sans);
    transition: var(--transition);
  }

  .amenity-chip-full:hover {
    border-color: var(--gold);
    color: var(--gold);
    transform: translateY(-2px);
  }

  .amenity-chip-full.active {
    background: var(--gold);
    color: white;
    border-color: var(--gold);
    box-shadow: 0 8px 20px rgba(184,134,11,0.15);
  }

  /* CONTROLS */
  .controls-full {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding-top: 1.5rem;
  }

  .sort-section {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .sort-label {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--gray);
  }

  .sort-select-full {
    height: 44px;
    padding: 0 1rem;
    border: 1px solid var(--gray-light);
    border-radius: 30px;
    background: white;
    font-family: var(--font-sans);
  }

  .view-section {
    display: flex;
    gap: 0.6rem;
  }

  .view-btn-full {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.7rem 1.2rem;
    border: 1px solid var(--gray-light);
    border-radius: 30px;
    background: white;
    cursor: pointer;
    transition: var(--transition);
    font-family: var(--font-sans);
  }

  .view-btn-full:hover {
    border-color: var(--gold);
  }

  .view-btn-full.active {
    background: var(--gold);
    color: white;
    border-color: var(--gold);
  }

  .clear-filters-btn {
    border: none;
    background: none;
    color: var(--gold);
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
  }

  /* RESULTS COUNT */
  .results-count-full {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
    border-bottom: 1px solid var(--gray-light);
    text-align: right;
    font-family: var(--font-sans);
  }

  .count-number {
    color: var(--gold);
    font-size: 1.2rem;
    font-weight: 700;
  }

  /* RESULTS */
  .results-container-full {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .results-container-full.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 1.5rem;
  }

  .results-container-full.list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  /* CARD */
  .result-card-full {
    background: white;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
    border: 1px solid #f2eee4;
  }

  .result-card-full:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-hover);
  }

  .result-card-full.list {
    display: flex;
  }

  .result-card-full.list .card-image-area-full {
    width: 280px;
    min-width: 280px;
    height: auto;
  }

  .card-image-area-full {
    position: relative;
    height: 230px;
    overflow: hidden;
  }

  .card-img-full {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.4s;
  }

  .result-card-full:hover .card-img-full {
    transform: scale(1.05);
  }

  .rating-badge-full {
    position: absolute;
    top: 14px;
    right: 14px;
    background: var(--gold);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 30px;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .card-details-full {
    padding: 1.2rem;
    flex: 1;
  }

  .hotel-title-full {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.4rem;
  }

  .hotel-location-full {
    font-size: 0.85rem;
    color: var(--gray);
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .hotel-description-full {
    font-size: 0.9rem;
    color: var(--gray);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .card-footer-full {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid var(--gray-light);
  }

  .price-amount-full {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--gold);
    font-family: var(--font-serif);
  }

  .price-period-full {
    font-size: 0.8rem;
    color: var(--gray);
  }

  .details-link-full {
    text-decoration: none;
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--dark);
    transition: var(--transition);
  }

  .details-link-full:hover {
    color: var(--gold);
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .results-container-full.grid {
      grid-template-columns: 1fr;
    }

    .result-card-full.list {
      flex-direction: column;
    }

    .result-card-full.list .card-image-area-full {
      width: 100%;
      min-width: 100%;
      height: 220px;
    }

    .controls-full {
      flex-direction: column;
      align-items: stretch;
    }

    .sort-section {
      flex-direction: column;
      align-items: stretch;
    }

    .view-section {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 1.8rem;
    }

    .hero-description {
      font-size: 0.9rem;
    }

    .filter-title {
      font-size: 0.95rem;
    }

    .amenity-chip-full {
      width: 100%;
      justify-content: center;
    }
  }
`}</style>
    </div>
  );
};

export default Restaurants;