export interface ShoppingCenter {
  id: number;
  name: string;
  city: string;
  location: string;
  rating: number;
  image: string;
  category: string;
  stores: number;
  phone?: string;
  hasCinema?: boolean;
  hasFoodCourt?: boolean;
  description?: string;
}

export const shoppingCenters: ShoppingCenter[] = [
  {
    id: 1,
    name: "Edna Mall",
    city: "Addis Ababa",
    location: "Bole",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=400&h=300&fit=crop",
    category: "mall",
    stores: 120,
    phone: "+251 911 901 234",
    hasCinema: true,
    hasFoodCourt: true,
    description: "Addis Ababa's premier shopping destination with international brands, cinema complex, and diverse dining options."
  },
  {
    id: 2,
    name: "Addis Ababa Mall",
    city: "Addis Ababa",
    location: "Kazanchis",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop",
    category: "mall",
    stores: 85,
    phone: "+251 911 012 345",
    hasCinema: false,
    hasFoodCourt: true,
    description: "Convenient shopping center with a variety of local and international retail stores."
  },
  {
    id: 3,
    name: "The Mosaic",
    city: "Addis Ababa",
    location: "Bole Road",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=300&fit=crop",
    category: "mall",
    stores: 150,
    phone: "+251 911 123 456",
    hasCinema: true,
    hasFoodCourt: true,
    description: "Upscale shopping mall featuring luxury brands, fine dining, and entertainment options."
  }
];