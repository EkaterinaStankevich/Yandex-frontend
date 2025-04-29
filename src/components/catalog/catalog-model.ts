import {Model} from "../../types/model";
import {TProduct} from "../../types";
import {IEvents} from "../base/events";
import {TCatalogModel} from "../../types/catalog/catalog-model";

export class CatalogModel extends Model implements TCatalogModel {
  products: TProduct[];

  constructor(events: IEvents) {
    super(events);
  }

  set(products: TProduct[]) {
    this.products = products;
  }
}