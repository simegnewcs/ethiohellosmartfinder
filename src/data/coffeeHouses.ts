export interface CoffeeHouse {
  id: number;
  name: string;
  city: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  coffeeTypes: string[];
  phone?: string;
  email?: string;
  description?: string;
  wifi?: boolean;
  outdoorSeating?: boolean;
  driveThru?: boolean;
}

export const coffeeHouses: CoffeeHouse[] = [
  {
    id: 1,
    name: "Tomoca Coffee",
    city: "Addis Ababa",
    location: "Bole",
    price: 5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop",
    category: "coffee",
    coffeeTypes: ["Yirgacheffe", "Sidama", "Harar"],
    phone: "+251 911 567 890",
    email: "info@tomoca.com",
    description: "Ethiopia's oldest and most famous coffee house, serving authentic Ethiopian coffee since 1953. Experience traditional coffee ceremonies and premium single-origin beans.",
    wifi: true,
    outdoorSeating: true,
    driveThru: false
  },
  {
    id: 2,
    name: "Kaldi's Coffee",
    city: "Addis Ababa",
    location: "Bole Road",
    price: 6,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    category: "coffee",
    coffeeTypes: ["Espresso", "Latte", "Cappuccino", "Cold Brew"],
    phone: "+251 911 678 901",
    email: "info@kaldiscoffee.com",
    description: "Modern coffeehouse chain offering specialty coffee drinks, pastries, and a cozy atmosphere for work or relaxation.",
    wifi: true,
    outdoorSeating: true,
    driveThru: true
  },
  {
    id: 3,
    name: "Moyu Coffee",
    city: "Addis Ababa",
    location: "Kazanchis",
    price: 7,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    category: "coffee",
    coffeeTypes: ["Pour Over", "Cold Brew", "Macchiato", "Affogato"],
    phone: "+251 911 789 012",
    description: "Artisanal coffee roastery and cafe known for their meticulous brewing methods and unique flavor profiles.",
    wifi: true,
    outdoorSeating: false,
    driveThru: false
  }
];