import {Component} from "../../types/component";
import {IEvents} from "../base/events";
import {TBasketUI} from "../../types/basket/basket-ui";
import {TBasketProduct} from "../../types";
import {BasketProductUI} from "../basket-product/basket-product-ui";
import {cloneTemplate} from "../../utils/utils";

export class BasketUI extends Component implements TBasketUI {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    document.querySelector("button.header__basket").addEventListener("click", () => this.events.emit("basket/opened"));
    (this.container.querySelector(".basket__button") as HTMLButtonElement).addEventListener("click", () => this.events.emit("order/opened"));
  }

  renderBadge(itemsCount: number) {
    document.querySelector(".header__basket-counter").textContent = String(itemsCount);
  }

  render(products: TBasketProduct[]) {
    const content = this.container.querySelector(".basket__list");

    if (products.length === 0) {
      content.replaceChildren("Корзина пуста");
    } else {
      content.replaceChildren(...products.map((product, index) => {
        return new BasketProductUI(cloneTemplate("#card-basket"), this.events).render({ index: index + 1, ...product })
      }))
    }

    (this.container.querySelector(".basket__button") as HTMLButtonElement).disabled = products.length === 0;
    const total = products.reduce((acc, item) => acc + item.price, 0);
    this.container.querySelector(".basket__price").textContent = `${total} синапсов`;

    return this.container;
  }
}