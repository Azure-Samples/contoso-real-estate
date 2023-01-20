declare interface User {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
}

declare interface UserClientPrincipal {
  userId: string;
  userDetails: string;
  userRoles: string[];
  claims: { typ: string; val: string }[];
  identityProvider: string;
}

declare type UserRole = "guest" | "user" | "admin";

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
  ammenities: string[];
  reviews_stars: number;
  reviews_number: number;
  address: string[];
  fees: string[];
  $$isFavorited?: boolean;
}

declare interface Reviews {
  id: string;
  createdAt: string;
  rating: number;
  review: string;
  user: User;
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
