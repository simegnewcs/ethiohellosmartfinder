export interface Hospital {
  id: number;
  name: string;
  city: string;
  location: string;
  rating: number;
  image: string;
  category: string;
  is24Hours?: boolean;
  hasEmergency?: boolean;
  phone?: string;
  description?: string;
}

export const hospitals: Hospital[] = [
  {
    id: 1,
    name: "St. Paul's Hospital",
    city: "Addis Ababa",
    location: "Gulele",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    category: "hospital",
    is24Hours: true,
    hasEmergency: true,
    phone: "+251 911 123 456",
    description: "Leading medical facility providing comprehensive healthcare services with specialized departments and experienced physicians."
  },
  {
    id: 2,
    name: "Myungsung Christian Medical Center",
    city: "Addis Ababa",
    location: "Gurd Shola",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
    category: "hospital",
    is24Hours: true,
    hasEmergency: true,
    phone: "+251 911 234 567",
    description: "Internationally recognized hospital offering advanced medical treatments and compassionate care."
  },
  {
    id: 3,
    name: "Kadisco General Hospital",
    city: "Addis Ababa",
    location: "Bole",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1581300741113-6b4c2050fa44?w=400&h=300&fit=crop",
    category: "hospital",
    is24Hours: true,
    hasEmergency: true,
    phone: "+251 911 345 678",
    description: "Multi-specialty hospital known for quality healthcare services and patient-centered approach."
  }
];