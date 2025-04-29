import {Component} from "../../types/component";
import {IEvents} from "../base/events";
import {TCatalogUI} from "../../types/catalog/catalog-ui";
import {TProduct} from "../../types";
import {cloneTemplate} from "../../utils/utils";
import {CardCatalogUI} from "../card/card-catalog-ui";

export class CatalogUI extends Component implements TCatalogUI {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
  }

  render(products: TProduct[]) {
    this.container.replaceChildren(...products.map(product => {
      const productUI = new CardCatalogUI(cloneTemplate("#card-catalog"), this.events);
      const productView = productUI.render(product);

      productView.addEventListener("click", () => {
        this.events.emit("card/opened", productUI.product);
      })

      return productView;
    }));
  }
}