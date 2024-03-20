import { ObjectId } from "mongodb";
import { IPaymentStatus, IProvider, ReservationStatus } from "../types/models";

// Favorite
export interface Favorite {
    userId: string;
    listingId: string;
    createdAt?: string;
};

//#region 

// Listing
export interface Listing {
    _id: ObjectId;
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

export interface ListingProps {
    id: string | undefined;
    offset: number;
    limit: number;
    featured: boolean;
};

//#endregion

// Payment
export interface Payment {
    id: string;
    userId: string;
    reservationId: string;
    provider: IProvider;
    status: IPaymentStatus;
    amount: number;
    currency: string;
    createdAt: Date;
};


// ReservationRequest
export interface ReservationRequest {
    userId: string;
    listingId: string;
    from: string;
    to: string;
    guests: number;
};


// Reservation
export interface Reservation {
    id: string;
    userId: string;
    listingId: string;
    title: string;
    guests: number;
    from: Date;
    to: Date;
    status: ReservationStatus;
    createdAt: Date;
};


// User 
export interface User {
    _id: ObjectId;
    id: string;
    name: string;
    role: "guest" | "renter" | "admin";
    status: "active" | "suspended" | "inactive";
    photo: string;
    address: string;
    payment: {
      _id: ObjectId;
    };
    email: string;
    auth: {
      provider: "aad" | "twitter" | "google" | "facebook";
      token: string;
      lastLogin: number;
    };
    createdAt: Date;
};