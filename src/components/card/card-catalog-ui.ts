import {Component} from "../../types/component";
import {TProduct} from "../../types";
import {IEvents} from "../base/events";
import {TCardCatalogUI} from "../../types/card/card-catalog-ui";
import {renderCardFields} from "./utils";

export class CardCatalogUI extends Component implements TCardCatalogUI {
  product: TProduct;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
  }

  render(product: TProduct): HTMLElement {
    this.product = product;

    renderCardFields(this.container, product);

    return this.container;
  }
}