import { NumberLongType } from "./numberlongtype";

export interface CardType {
    title: string;
    city: string;
    slug: NumberLongType;
    amenities: string[];
    bedrooms: number;
    bathrooms: number;
    img: string;
    description: string;
}
