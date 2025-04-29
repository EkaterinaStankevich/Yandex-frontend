import {Component} from "../../types/component";
import {IEvents} from "../base/events";
import {TBasketProduct} from "../../types";
import {TBasketProductUI} from "../../types/basket-product/basket-product-ui";

export class BasketProductUI extends Component implements TBasketProductUI {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
  }

  render(product: TBasketProduct & { index: number }) {
    this.container.querySelector(".card__title").textContent = product.title;
    this.container.querySelector(".card__price").textContent = product.price + " синапсов";
    this.container.querySelector(".basket__item-index").textContent = String(product.index);
    this.container.querySelector(".basket__item-delete")
      .addEventListener("click", () => this.events.emit("basket/removed", {id: product.id}))

    return this.container;
  }
}