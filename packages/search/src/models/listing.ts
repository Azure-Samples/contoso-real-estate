export type Listing = {
  id: string;
  title: string;
  slug: string;
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
  createdAt: string;
};
