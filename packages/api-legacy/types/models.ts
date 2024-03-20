
export type IProvider = "stripe" | "paypal";
export type IPaymentStatus = "pending" | "declined" | "completed" | "cancelled";

// enum ReservationStatus
export enum ReservationStatus { 
    Pending = "pending", 
    Active = "active", 
    Cancelled = "cancelled" , 
    Archived = "archived" 
};