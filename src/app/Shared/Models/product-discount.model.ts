export interface ProductDiscount {
  id: number;
  productName: string;
  storeName: string;
  originalPrice: number;
  discountPrice: number;
  imageUrl?: string;
  validUntil: Date;
}
