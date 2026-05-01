// src/types/hotel.ts

export interface Hotel {
  id: number;
  name: string;
  city: string;
  location: string;

  /* NEW */
  category: string;

  image: string;
  price: number;
  rating: number;
  description: string;

  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  swimmingPool: boolean;

  /* NEW */
  phone?: string;
  email?: string;
  website?: string;
}