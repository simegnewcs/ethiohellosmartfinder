export interface Pharmacy {
  id: number;
  name: string;
  city: string;
  location: string;
  rating: number;
  image: string;
  category: string;
  phone?: string;
  is24Hours?: boolean;
  hasDelivery?: boolean;
  hasEmergency?: boolean;
  description?: string;
}

export const pharmacies: Pharmacy[] = [
  {
    id: 1,
    name: "MediTech Pharmacy",
    city: "Addis Ababa",
    location: "Bole",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    category: "pharmacy",
    phone: "+251 911 789 012",
    is24Hours: true,
    hasDelivery: true,
    hasEmergency: true,
    description: "Full-service pharmacy with 24/7 emergency service, home delivery, and licensed pharmacists ready to assist with all your medication needs."
  },
  {
    id: 2,
    name: "Care Pharmacy",
    city: "Addis Ababa",
    location: "Kazanchis",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop",
    category: "pharmacy",
    phone: "+251 911 890 123",
    is24Hours: false,
    hasDelivery: true,
    hasEmergency: false,
    description: "Community pharmacy offering prescription medications, over-the-counter products, and health consultations."
  },
  {
    id: 3,
    name: "Wellness Pharmacy",
    city: "Addis Ababa",
    location: "Bole Road",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    category: "pharmacy",
    phone: "+251 911 901 234",
    is24Hours: true,
    hasDelivery: true,
    hasEmergency: true,
    description: "Comprehensive healthcare pharmacy with emergency services, home delivery, and a wide range of medical supplies."
  }
];