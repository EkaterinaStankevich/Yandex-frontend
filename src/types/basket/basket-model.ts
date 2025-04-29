import {TBasketProduct} from "../index";

export interface TBasketModel {
  products: Set<TBasketProduct>;

  add(item: TBasketProduct): void;
  remove(id: string): void;
  clear(): void;
}