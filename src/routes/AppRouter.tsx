import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

// Main Pages
import Home from "../pages/Home";
import Hotels from "../pages/Hotels";
import HotelDetails from "../pages/HotelDetails";
import Restaurants from "../pages/Restaurants";
import RestaurantDetails from "../pages/RestaurantDetails";
import SuperMarkets from "../pages/SuperMarkets";
import SuperMarketDetails from "../pages/SuperMarketDetails";
import CoffeeHouses from "../pages/CoffeeHouses";
import CoffeeHouseDetails from "../pages/CoffeeHouseDetails";
import CakeShops from "../pages/CakeShops";
import CakeShopDetails from "../pages/CakeShopDetails";
import Pharmacies from "../pages/Pharmacies";
import PharmacyDetails from "../pages/PharmacyDetails";
import Gyms from "../pages/Gyms";
import GymDetails from "../pages/GymDetails";
import ShoppingCenters from "../pages/ShoppingCenters";
import ShoppingCenterDetails from "../pages/ShoppingCenterDetails";
import Bars from "../pages/Bars";
import BarDetails from "../pages/BarDetails";
import Hospitals from "../pages/Hospitals";
import HospitalDetails from "../pages/HospitalDetails";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";

// ComingSoon fallback component
function ComingSoon() {
  return (
    <div style={{ 
      padding: "60px 40px", 
      textAlign: "center",
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ 
        fontSize: "64px", 
        marginBottom: "20px",
        fontFamily: "Times New Roman, serif"
      }}>
        ✦
      </div>
      <h2 style={{ 
        fontFamily: "Times New Roman, serif",
        color: "#b8860b",
        marginBottom: "12px"
      }}>
        Coming Soon
      </h2>
      <p style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#6b7b7e"
      }}>
        This feature is under development. Stay tuned!
      </p>
    </div>
  );
}

// Error page component
function ErrorPage() {
  return (
    <div style={{ 
      padding: "60px 40px", 
      textAlign: "center",
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ 
        fontSize: "80px", 
        marginBottom: "20px",
        fontFamily: "Times New Roman, serif",
        color: "#b8860b"
      }}>
        404
      </div>
      <h2 style={{ 
        fontFamily: "Times New Roman, serif",
        color: "#1e2a2e",
        marginBottom: "12px"
      }}>
        Page Not Found
      </h2>
      <p style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#6b7b7e",
        marginBottom: "24px"
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a 
        href="/" 
        style={{
          display: "inline-block",
          padding: "10px 24px",
          background: "#b8860b",
          color: "white",
          textDecoration: "none",
          borderRadius: "40px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#9a7209";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#b8860b";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Go Back Home
      </a>
    </div>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // HOME
      {
        index: true,
        element: <Home />,
      },
      
      // ============ HOTELS ROUTES ============
      {
        path: "hotels",
        element: <Hotels />,
      },
      {
        path: "hotel/:id",
        element: <HotelDetails />,
      },

      // ============ RESTAURANTS ROUTES ============
      {
        path: "restaurants",
        element: <Restaurants />,
      },
      {
        path: "restaurant/:id",
        element: <RestaurantDetails />,
      },

      // ============ SUPERMARKETS ROUTES ============
      {
        path: "supermarkets",
        element: <SuperMarkets />,
      },
      {
        path: "supermarket/:id",
        element: <SuperMarketDetails />,
      },

      // ============ COFFEE HOUSES ROUTES ============
      {
        path: "coffee-houses",
        element: <CoffeeHouses />,
      },
      {
        path: "coffee-house/:id",
        element: <CoffeeHouseDetails />,
      },

      // ============ CAKE SHOPS ROUTES ============
      {
        path: "cake-shops",
        element: <CakeShops />,
      },
      {
        path: "cake-shop/:id",
        element: <CakeShopDetails />,
      },

      // ============ PHARMACIES ROUTES ============
      {
        path: "pharmacies",
        element: <Pharmacies />,
      },
      {
        path: "pharmacy/:id",
        element: <PharmacyDetails />,
      },

      // ============ GYMS ROUTES ============
      {
        path: "gyms",
        element: <Gyms />,
      },
      {
        path: "gym/:id",
        element: <GymDetails />,
      },

      // ============ SHOPPING CENTERS ROUTES ============
      {
        path: "shopping-centers",
        element: <ShoppingCenters />,
      },
      {
        path: "shopping-center/:id",
        element: <ShoppingCenterDetails />,
      },

      // ============ BARS & NIGHTCLUBS ROUTES ============
      {
        path: "bars",
        element: <Bars />,
      },
      {
        path: "bar/:id",
        element: <BarDetails />,
      },

      // ============ HOSPITALS ROUTES ============
      {
        path: "hospitals",
        element: <Hospitals />,
      },
      {
        path: "hospital/:id",
        element: <HospitalDetails />,
      },

      // ============ CATEGORY FILTER ROUTES ============
      {
        path: "category/:category",
        element: <Home />,
      },
      {
        path: "search",
        element: <Hotels />,
      },

      // ============ STATIC PAGES ============
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      // ============ USER ACCOUNT ROUTES (Coming Soon) ============
      {
        path: "profile",
        element: <ComingSoon />,
      },
      {
        path: "bookings",
        element: <ComingSoon />,
      },
      {
        path: "wishlist",
        element: <ComingSoon />,
      },
      {
        path: "login",
        element: <ComingSoon />,
      },

      // ============ BUSINESS ROUTES (Coming Soon) ============
      {
        path: "business/dashboard",
        element: <ComingSoon />,
      },
      {
        path: "business/settings",
        element: <ComingSoon />,
      },

      // ============ ADMIN ROUTES (Coming Soon - Protected) ============
      {
        path: "admin/dashboard",
        element: <ComingSoon />,
      },
      {
        path: "admin/users",
        element: <ComingSoon />,
      },
      {
        path: "admin/businesses",
        element: <ComingSoon />,
      },
    ],
  },
]);

export default AppRouter;