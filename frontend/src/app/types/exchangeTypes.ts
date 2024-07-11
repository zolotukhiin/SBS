export type Exchange = {
  id: number;
  requesterId: number;
  requesterItemId: number;
  offerId: number;
  offerOwnerId: number;
  offerOwnerItemId: number;
  status: 'no answer' | 'completed' | 'rejected' | 'offer expired';
};