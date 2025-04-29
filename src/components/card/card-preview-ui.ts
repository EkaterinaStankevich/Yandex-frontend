import {Component} from "../../types/component";
import {TProduct} from "../../types";
import {IEvents} from "../base/events";
import {TCardPreviewUI} from "../../types/card/card-preview-ui";
import {renderCardFields} from "./utils";

export class CardPreviewUI extends Component implements TCardPreviewUI {
  product: TProduct;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.container.querySelector(".card__button").addEventListener("click", () => {
      this.events.emit("basket/added", this.product);
      this.render({product: this.product, disabled: true});
    })
  }

  render(data: {product: TProduct, disabled: boolean}): HTMLElement {

    this.product = data.product;

    renderCardFields(this.container, data.product);

    this.container.querySelector(".card__text").textContent = data.product.description;
    (this.container.querySelector(".card__button") as HTMLButtonElement).disabled = data.disabled;

    return this.container;
  }
}