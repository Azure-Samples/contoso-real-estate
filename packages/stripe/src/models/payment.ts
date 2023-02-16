export interface Payment {
  id: string;
  userId: string;
  reservationId: string;
  provider: 'stripe' | 'paypal';
  status: 'pending' | 'declined' | 'completed' | 'cancelled';
  amount: number;
  currency: string;
}
