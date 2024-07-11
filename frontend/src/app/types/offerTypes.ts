export type Offer = {
  id: number;
  itemId: number;
  userId: number;
  expirationDate: Date;
  status: 'active' | 'completed' | 'rejected';
};
