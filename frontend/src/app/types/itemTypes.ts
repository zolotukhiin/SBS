export type Item = {
  id: number,
  name: string,
  description: string,
  category: string,
  photos: string[],
  createdAt: Date,
  isActive: boolean,
  authorId: number
};