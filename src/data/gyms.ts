export interface Gym {
  id: number;
  name: string;
  city: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  facilities: string[];
  phone?: string;
  is24Hours?: boolean;
  description?: string;
}

export const gyms: Gym[] = [
  {
    id: 1,
    name: "World Gym Addis",
    city: "Addis Ababa",
    location: "Bole",
    price: 50,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    category: "gym",
    facilities: ["Cardio", "Weight Training", "Sauna", "Pool", "Personal Training", "Group Classes"],
    phone: "+251 911 890 123",
    is24Hours: true,
    description: "Premium fitness center with state-of-the-art equipment, professional trainers, and a wide range of classes for all fitness levels."
  },
  {
    id: 2,
    name: "Fitness Hub",
    city: "Addis Ababa",
    location: "Kazanchis",
    price: 35,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
    category: "gym",
    facilities: ["Cardio", "Weight Training", "Zumba", "Yoga", "Spin Class"],
    phone: "+251 911 901 234",
    is24Hours: false,
    description: "Modern fitness center offering diverse group classes and functional training areas."
  },
  {
    id: 3,
    name: "Elite Fitness",
    city: "Addis Ababa",
    location: "Bole Medhanialem",
    price: 70,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop",
    category: "gym",
    facilities: ["Cardio", "Weight Training", "Pool", "Sauna", "Steam Room", "Personal Training", "CrossFit", "Juice Bar"],
    phone: "+251 911 012 345",
    is24Hours: true,
    description: "Luxury fitness club with premium amenities, expert trainers, and exclusive member benefits."
  }
];