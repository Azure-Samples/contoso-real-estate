declare interface User {
  id: string;
  name: string;
  email?: string;
  address?: string;
  photo: string;
  role: UserRole;
  auth?: {
    provider: AuthProvider;
    lastLogin: string;
  };
}

declare interface UserClientPrincipal {
  userId: string;
  userDetails: string;
  userRoles: string[];
  claims: { typ: string; val: string }[];
  identityProvider: string;
}

declare type AuthProvider = "aad" | "github" | "twitter" | "google" | "facebook";
declare type UserRole = "guest" | "renter" | "admin";

declare interface Listing {
  // we will add attributes so we don't have to write a new component for search
  attributes?: ListingAttributes;
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

declare interface ListingAttributes {
  // we will add attributes so we don't have to write a new component for search
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
  photos: string;
  capacity: number;
  ammenities: string;
  reviews_stars: number;
  reviews_number: number;
  address: string;
  fees: string;
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
  id: string;
  userId: string;
  listingId: string;
  title: string;
  guests: number;
  from: Date;
  to: Date;
  status: "pending" | "active" | "cancelled" | "archived";
  createdAt: Date;
}

declare interface ReservationRequest {
  userId: string;
  listingId: string | undefined;
  from: string;
  to: string;
  guests: number;
}

declare interface Payment {
  id: string;
  userId: string;
  reservationId: string;
  provider: 'stripe' | 'paypal';
  status: 'pending' | 'declined' | 'completed' | 'cancelled';
  amount: number;
  currency: string;
  createdAt: Date;
}

declare interface CheckoutSession {
  sessionUrl: string;
}

declare interface SearchResult {
  listings: CleanResults;
}

declare interface CleanResults {
  data: Listing[];
}

declare interface ListingsResult {
  attributes: Listing
}
