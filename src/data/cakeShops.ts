export interface CakeShop {
  id: number;
  name: string;
  city: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  specialties: string[];
  phone?: string;
  description?: string;
  delivery?: boolean;
}

export const cakeShops: CakeShop[] = [
  {
    id: 1,
    name: "La Parisienne",
    city: "Addis Ababa",
    location: "Bole",
    price: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
    category: "cakes",
    specialties: ["French Pastries", "Wedding Cakes", "Birthday Cakes", "Croissants"],
    phone: "+251 911 678 901",
    description: "Authentic French bakery and patisserie with the finest pastries and custom cakes in Addis. Perfect for special occasions.",
    delivery: true
  },
  {
    id: 2,
    name: "Sweet Tooth Bakery",
    city: "Addis Ababa",
    location: "Kazanchis",
    price: 12,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop",
    category: "cakes",
    specialties: ["Cupcakes", "Cheesecake", "Chocolate Cake", "Cookies"],
    phone: "+251 911 789 012",
    description: "Popular bakery known for creative cake designs, delicious cupcakes, and affordable prices for all celebrations.",
    delivery: true
  },
  {
    id: 3,
    name: "Patisserie Delice",
    city: "Addis Ababa",
    location: "Bole Medhanialem",
    price: 18,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    category: "cakes",
    specialties: ["Macarons", "Tarts", "Custom Cakes", "Wedding Cakes"],
    phone: "+251 911 890 123",
    description: "High-end patisserie offering exquisite French-inspired desserts and bespoke cake designs for luxury events.",
    delivery: false
  }
];