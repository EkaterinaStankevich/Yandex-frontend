import {Model} from "../../types/model";
import {TBasketProduct} from "../../types";
import {IEvents} from "../base/events";
import {TBasketModel} from "../../types/basket/basket-model";

export class BasketModel extends Model implements TBasketModel {
  products: Set<TBasketProduct> = new Set<TBasketProduct>();

  constructor(events: IEvents) {
    super(events);
  }

  add(item: TBasketProduct) {
    this.products.add(item);
  }

  remove(id: string) {
    const removedItem = Array.from(this.products.values()).find(product => product.id === id);

    this.products.delete(removedItem);
  }

  hasProduct(id: string) {
    return Array.from(this.products).some(product => product.id === id);
  }

  clear() {
    this.products.clear();
  }

  getTotalCost() {
    return Array.from(this.products).reduce((acc, item) => acc + item.price, 0);
  }

  getItemsIds() {
    return Array.from(this.products).map(product => product.id);
  }
}