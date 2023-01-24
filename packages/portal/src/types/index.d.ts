declare interface User {
  id: string;
  name: string;
}

declare interface Listing {
  bathrooms: number;
  bedrooms: number;
  createdAt: string;
  description: string;
  id: string;
  isFeatured: boolean;
  isRecommended: boolean;
  photos: string[];
  slug: string;
  title: string;
  address: Address;
  capacity: number;
  amenities: { icon: string; label: string }[];
  reviews: {
    stars: number;
    number: number;
  };
  position: {
    lat: number;
    lng: number;
  },
  fees: {
    discount: number;
    cleaning: number;
    service: number;
    occupancy: number;
    rent: number;
    currency_code: string;
    currency_symbol: string;
  };
  $$isFavorited?: boolean;
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
  createdAt: string;
  id: string;
  slug: string;
  state: string;
  street: string;
  zipCode: string;
}

declare interface Reservation {
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
