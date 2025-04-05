export interface Location {
  id: string;
  name: string;
  category: string;
  rating: number;
  imageUrl: any;
  description: string;
  sourceLink: string;
  bookingLink?: string;
  address?: string;
  openingHours?: string;
  latitude?: number;
  longitude?: number;
}