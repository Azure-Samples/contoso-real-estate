declare interface User {
  id: string;
  name: string;
}

declare interface Listing {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  bathrooms: number;
  bedrooms: number;
  description: string;
  type: string;
  isFeatured: boolean;
  isRecommended: boolean;
  photos: string[];
  capacity: number;
  amenities: { icon: string; label: string }[];
  reviews: { stars: number; number: number };
  address: Address;
  fees: Fees;
  $$isFavorited?: boolean;
}

declare interface Reviews {
  id: string;
  createdAt: string;
  rating: number;
  review: string;
  user: User;
}

declare interface Fees {
  discount: number;
  cleaning: number;
  service: number;
  occupancy: number;
  rent: number;
  currency_code: string;
  currency_symbol: string;
}

declare interface StageType {
  title: string;
  subtitle?: string;
  label?: string;
  url?: string;
  img: string;
}

declare interface Address {
  buildingNumber: string;
  city: string;
  country: string;
  state: string;
  street: string;
  zipCode: string;
  position: string;
}

declare interface Reservation {
  id?: string;
}

declare interface ReservationRequest {
  userId: string;
  listingId: string | undefined;
  from: string;
  to: string;
  guests: number;
}

declare interface CheckoutSession {
  sessionUrl: string;
}
