import {TProduct} from "../../types";
import {CDN_URL} from "../../utils/constants";

const productCategory = {
  "софт-скил": "soft",
  "другое": "other",
  "дополнительное": "additional",
  "кнопка": "button",
  "хард-скил": "hard"
}

export function renderCardFields(container: HTMLElement, product: TProduct) {
  container.querySelector(".card__title").textContent = product.title;

  const price = product.price ? product.price + " синапсов" : "Бесценно";
  container.querySelector(".card__price").textContent = price;

  container.querySelector(".card__category").textContent = product.category;
  const category = productCategory[product.category as keyof typeof productCategory];
  container.querySelector(".card__category").classList.add(
    `card__category_${category}`
  );
  (container.querySelector(".card__image") as HTMLImageElement).src = CDN_URL + "/" + product.image;
}