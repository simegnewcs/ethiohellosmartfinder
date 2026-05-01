export interface Bar {
  id: number;
  name: string;
  city: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  hasLiveMusic?: boolean;
  hasOutdoorSeating?: boolean;
  phone?: string;
  description?: string;
}

export const bars: Bar[] = [
  {
    id: 1,
    name: "Black Rose Lounge",
    city: "Addis Ababa",
    location: "Bole",
    price: 12,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    category: "bar",
    hasLiveMusic: true,
    hasOutdoorSeating: true,
    phone: "+251 911 012 345",
    description: "Experience the best nightlife in Addis Ababa at Black Rose Lounge. Enjoy live music, signature cocktails, and a vibrant atmosphere perfect for socializing and making memories."
  },
  {
    id: 2,
    name: "Club Millennium",
    city: "Addis Ababa",
    location: "Kazanchis",
    price: 15,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop",
    category: "nightclub",
    hasLiveMusic: true,
    hasOutdoorSeating: false,
    phone: "+251 911 123 456",
    description: "One of Addis Ababa's premier nightclubs featuring international DJs and an electrifying atmosphere."
  },
  {
    id: 3,
    name: "The Irish Pub",
    city: "Addis Ababa",
    location: "Bole",
    price: 8,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    category: "pub",
    hasLiveMusic: true,
    hasOutdoorSeating: true,
    phone: "+251 911 234 567",
    description: "Authentic Irish pub experience with imported beers, whiskey selection, and live sports screenings."
  }
];