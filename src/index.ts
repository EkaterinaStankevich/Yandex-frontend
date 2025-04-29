import './scss/styles.scss';
import {Api, ApiListResponse} from "./components/base/api";
import {API_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import {TProduct} from "./types";
import {CatalogModel} from "./components/catalog/catalog-model";
import {CatalogUI} from "./components/catalog/catalog-ui";
import {Modal} from "./components/modal/modal-ui";
import {CardPreviewUI} from "./components/card/card-preview-ui";
import {cloneTemplate} from "./utils/utils";
import {BasketUI} from "./components/basket/basket-ui";
import {BasketModel} from "./components/basket/basket-model";
import {OrderModel} from "./components/order/order-model";
import {OrderUI} from "./components/order/order-ui";
import {ContactsModel} from "./components/contacts/contacts-model";
import {ContactsUI} from "./components/contacts/contacts-ui";
import {SuccessUI} from "./components/success/success-ui";

const api = new Api(API_URL);
const events = new EventEmitter();

const modalUI = new Modal(document.querySelector(".modal"), events);
events.on("modal/opened", (data: {content: HTMLElement}) => modalUI.open(data.content));
events.on("modal/closed", () => modalUI.close());

const basket = new BasketModel(events);
const basketUI = new BasketUI(cloneTemplate("#basket"), events);
events.on("basket/opened", () => events.emit("modal/opened", {content: basketUI.render(Array.from(basket.products))}));
events.on("basket/added", ({ id, price, title }: TProduct) => {
  basket.add({ id, price, title });
  basketUI.renderBadge(basket.products.size);
});
events.on("basket/removed", ({ id }: { id: string }) => {
  basket.remove(id);
  basketUI.render(Array.from(basket.products));
  basketUI.renderBadge(basket.products.size);
});
events.on("basket/cleared", () => {
  basket.clear();
  basketUI.renderBadge(0);
});

const catalog = new CatalogModel(events);
const catalogUI = new CatalogUI(document.querySelector(".gallery"), events);

api.get("/product/").then((response: ApiListResponse<TProduct>) => events.emit("catalog/fulfilled", response.items));

events.on("catalog/fulfilled", (products: TProduct[]) => catalog.set(products));
events.on("catalog/fulfilled", (products: TProduct[]) => catalogUI.render(products));

events.on("card/opened", (product: TProduct) => {
  const previewUI = new CardPreviewUI(cloneTemplate("#card-preview"), events);

  events.emit(
    "modal/opened",
    {
      content: previewUI.render(
        {
          product,
          disabled: product.price === null || basket.hasProduct(product.id)
        }
      )
    }
  )
});

const order = new OrderModel(events);
const orderUI = new OrderUI(cloneTemplate("#order"), events);

function renderOrder() {
  return orderUI.render({ method: order.method, disabled: (!order.method || !order.address) })
}

events.on("order/opened", () => {
  events.emit("modal/opened", { content: renderOrder() });
});
events.on("order/changed/address", ({ value }: { value: string }) => {
  order.changeAddress(value);
  renderOrder();
});
events.on("order/changed/method", ({ value }: { value: string }) => {
  order.changeMethod(value);
  renderOrder();
})

const contacts = new ContactsModel(events);
const contactsUI = new ContactsUI(cloneTemplate("#contacts"), events);

function renderContacts() {
  return contactsUI.render({ disabled: (!contacts.number || !contacts.email) });
}

events.on("contacts/opened", () => {
  events.emit("modal/opened", { content: renderContacts() });
});

events.on("contacts/changed/email", ({ value }: { value: string }) => {
  contacts.changeEmail(value);
  renderContacts();
});

events.on("contacts/changed/number", ({ value }: { value: string }) => {
  contacts.changeNumber(value);
  renderContacts();
});

const successUI = new SuccessUI(cloneTemplate("#success"), events);
events.on("success/opened", () => {
  api.post("/order", {
    "payment": order.method,
    "email": contacts.email,
    "phone": contacts.number,
    "address": order.address,
    "total": basket.getTotalCost(),
    "items": basket.getItemsIds()
  }).then((resp: { id: string; total: number }) => {
    events.emit("modal/opened", { content: successUI.render({ total: resp.total }) });
    events.emit("basket/cleared");
  })
});