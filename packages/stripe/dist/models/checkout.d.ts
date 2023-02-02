export interface Checkout {
    productName: string;
    userId: string;
    listingId: string;
    reservationId: string;
    from: string;
    to: string;
    guests: number;
    currency: string;
    amount: number;
    createdAt: string;
}
export declare function validateCheckout(checkout: Checkout): void;
