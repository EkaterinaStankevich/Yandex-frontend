export interface TProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export type TBasketProduct = Pick<TProduct, "id" | "title" | "price">