import {Component} from "../../types/component";
import {IEvents} from "../base/events";
import {TOrderUI} from "../../types/order/order-ui";

export class OrderUI extends Component implements TOrderUI {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.container.querySelector("input[name=\"address\"]").addEventListener("input", (e) => {
      this.events.emit("order/changed/address", { value: (e.target as HTMLInputElement).value });
    })

    this.container.querySelectorAll(".button_alt").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.events.emit("order/changed/method", { value: (e.target as HTMLButtonElement).name });
      })
    });

    this.container.querySelector(".order__button").addEventListener("click", () => {
      this.events.emit("contacts/opened");
    })
  }

  render({ method, disabled }: { method: string, disabled: boolean }) {
    this.container.querySelectorAll(`.button_alt`).forEach(btn => btn.classList.remove("button_alt-active"));

    if (method) {
      this.container.querySelector(`.button_alt[name="${method}"]`).classList.add("button_alt-active");
    }

    (this.container.querySelector(".order__button") as HTMLButtonElement).disabled = disabled;

    return this.container;
  }
}