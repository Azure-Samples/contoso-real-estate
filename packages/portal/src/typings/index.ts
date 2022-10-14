export interface Listing {
  bathrooms: number;
  bedrooms: number;
  createdAt: string;
  description: string;
  id: string;
  isFavorited: boolean;
  isFeatured: boolean;
  isRecommended: boolean;
  photos: string[];
  slug: string;
  title: string;
  address: Address;
  amenities: { id: string; label: string }[];
  fees: {
    discount: number;
    cleaning: number;
    service: number;
    occupancy: number;
    rent: number;
  };
}

export interface StageType {
  title: string;
  subtitle?: string;
  label?: string;
  url?: string;
  img: string;
}

export interface Address {
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
