export interface Restaurant {
  id: number;
  name: string;
  city: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  cuisine?: string;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  coffee: boolean;
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: string;
  popularDishes?: string[];
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Addis Garden Restaurant",
    city: "Addis Ababa",
    category: "Fine Dining",
    price: 35,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    description: "Luxury dining experience nestled in a beautiful garden setting. Offers authentic Ethiopian and international dishes prepared by award-winning chefs. Perfect for romantic dinners and family gatherings.",
    cuisine: "Ethiopian & International",
    wifi: true,
    parking: true,
    breakfast: true,
    coffee: true,
    phone: "+251 911 234 567",
    email: "info@addisgarden.com",
    website: "www.addisgarden.com",
    openingHours: "10:00 AM - 10:00 PM",
    popularDishes: ["Doro Wat", "Tibs", "Mixed Platter", "Grilled Salmon"]
  },
  {
    id: 2,
    name: "Lake View Café",
    city: "Bahir Dar",
    category: "Cafe",
    price: 20,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    description: "Stunning café overlooking Lake Tana. Famous for fresh coffee, delicious breakfast options, and breathtaking sunset views. A favorite spot for both locals and tourists.",
    cuisine: "Cafe & Light Meals",
    wifi: true,
    parking: false,
    breakfast: true,
    coffee: true,
    phone: "+251 911 345 678",
    email: "hello@lakeviewcafe.com",
    website: "www.lakeviewcafe.com",
    openingHours: "7:00 AM - 9:00 PM",
    popularDishes: ["Fresh Coffee", "Full Breakfast", "Club Sandwich", "Cheesecake"]
  },
  {
    id: 3,
    name: "Harar Traditional House",
    city: "Harar",
    category: "Traditional",
    price: 25,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    description: "Authentic Harari cultural experience featuring traditional cuisine served in a historic setting. Experience the rich culinary heritage of Harar including the famous 'Ful' and 'Muqmet'. Traditional coffee ceremony included.",
    cuisine: "Harari Traditional",
    wifi: false,
    parking: true,
    breakfast: false,
    coffee: true,
    phone: "+251 911 456 789",
    email: "info@harartradhouse.com",
    website: "www.harartraditional.com",
    openingHours: "11:00 AM - 9:00 PM",
    popularDishes: ["Ful", "Muqmet", "Harar Coffee", "Doro Wat"]
  },
  {
    id: 4,
    name: "Sishu Restaurant",
    city: "Addis Ababa",
    category: "Fine Dining",
    price: 55,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    description: "Upscale restaurant offering a fusion of Ethiopian and international cuisines. Known for exceptional service, elegant atmosphere, and creative cocktails. Perfect for business dinners and special occasions.",
    cuisine: "Fusion & International",
    wifi: true,
    parking: true,
    breakfast: false,
    coffee: true,
    phone: "+251 911 567 890",
    email: "reservations@sishu.com",
    website: "www.sishurestaurant.com",
    openingHours: "12:00 PM - 11:00 PM",
    popularDishes: ["Beef Tartare", "Lamb Chop", "Seafood Paella", "Crème Brûlée"]
  },
  {
    id: 5,
    name: "Hawassa Fish Market Restaurant",
    city: "Hawassa",
    category: "Seafood",
    price: 18,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
    description: "Fresh catch of the day served right on the shores of Lake Hawassa. Choose your fish and watch it grilled to perfection. Casual dining with spectacular lake views.",
    cuisine: "Seafood & Local",
    wifi: false,
    parking: true,
    breakfast: false,
    coffee: true,
    phone: "+251 911 678 901",
    email: "info@hawassafish.com",
    website: "www.hawassafishmarket.com",
    openingHours: "10:00 AM - 8:00 PM",
    popularDishes: ["Grilled Tilapia", "Fish Tibs", "Shrimp Curry", "Fish Soup"]
  },
  {
    id: 6,
    name: "Yod Abyssinia",
    city: "Addis Ababa",
    category: "Traditional",
    price: 30,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&h=400&fit=crop",
    description: "Famous cultural restaurant offering traditional Ethiopian food with live music and dance performances. Experience the best of Ethiopian hospitality and cuisine in a vibrant atmosphere.",
    cuisine: "Traditional Ethiopian",
    wifi: true,
    parking: true,
    breakfast: false,
    coffee: true,
    phone: "+251 911 789 012",
    email: "info@yodabyssinia.com",
    website: "www.yodabyssinia.com",
    openingHours: "6:00 PM - 12:00 AM",
    popularDishes: ["Special Kitfo", "Gored Gored", "Tibs", "Coffee Ceremony"]
  },
  {
    id: 7,
    name: "Moyu Coffee & Bistro",
    city: "Addis Ababa",
    category: "Cafe",
    price: 15,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop",
    description: "Artisan coffee shop specializing in single-origin Ethiopian beans. Cozy bistro atmosphere perfect for remote work, casual meetings, or relaxing with a good book.",
    cuisine: "Coffee & Pastries",
    wifi: true,
    parking: false,
    breakfast: true,
    coffee: true,
    phone: "+251 911 890 123",
    email: "hello@moyucoffee.com",
    website: "www.moyucoffee.com",
    openingHours: "7:00 AM - 8:00 PM",
    popularDishes: ["Pour Over Coffee", "Avocado Toast", "Croissant", "Cheesecake"]
  },
  {
    id: 8,
    name: "Gondar Castle Restaurant",
    city: "Gondar",
    category: "Traditional",
    price: 22,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
    description: "Restaurant located near the historic Fasil Ghebbi castle complex. Offers traditional Gondar cuisine with a view of the ancient architecture. A must-visit for history enthusiasts.",
    cuisine: "Gondar Traditional",
    wifi: true,
    parking: true,
    breakfast: true,
    coffee: true,
    phone: "+251 911 901 234",
    email: "info@gondarcastle.com",
    website: "www.gondarcastle.com",
    openingHours: "8:00 AM - 10:00 PM",
    popularDishes: ["Gomen", "Shiro", "Bread", "Traditional Coffee"]
  },
  {
    id: 9,
    name: "Tomoca Coffee Bole",
    city: "Addis Ababa",
    category: "Coffee Shop",
    price: 5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    description: "The iconic Ethiopian coffee house serving the finest coffee since 1953. No-frills, authentic coffee experience that locals swear by. The original Addis coffee culture.",
    cuisine: "Coffee Shop",
    wifi: false,
    parking: false,
    breakfast: false,
    coffee: true,
    phone: "+251 911 012 345",
    email: "info@tomoca.com",
    website: "www.tomoca.com",
    openingHours: "6:00 AM - 10:00 PM",
    popularDishes: ["Macchiato", "Espresso", "American Coffee", "Shortbread"]
  },
  {
    id: 10,
    name: "Kategna Restaurant",
    city: "Addis Ababa",
    category: "Traditional",
    price: 28,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    description: "One of Addis Ababa's most beloved traditional restaurants, known for authentic flavors and cultural experiences. Offers live traditional music and cultural performances.",
    cuisine: "Traditional Ethiopian",
    wifi: true,
    parking: true,
    breakfast: false,
    coffee: true,
    phone: "+251 911 123 456",
    email: "info@kategna.com",
    website: "www.kategna.com",
    openingHours: "11:00 AM - 11:00 PM",
    popularDishes: ["Doro Wat", "Kitfo", "Tibs", "Coffee Ceremony"]
  }
];

// Export for backwards compatibility
export const restaurantData = restaurants;