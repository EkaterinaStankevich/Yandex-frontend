import {TProduct} from "../index";

export interface TCatalogModel {
  products: TProduct[];

  set(products: TProduct[]): void;
}