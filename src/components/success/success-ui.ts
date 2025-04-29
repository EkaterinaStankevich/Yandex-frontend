import {Component} from "../../types/component";
import {IEvents} from "../base/events";
import {TSuccessUI} from "../../types/success/success-ui";

export class SuccessUI extends Component implements TSuccessUI {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.container.querySelector(".order-success__close").addEventListener("click", () => {
      this.events.emit("modal/closed");
    })
  }

  render({ total }: {total: number}) {
    this.container.querySelector(".order-success__description").textContent = `Списано ${total || 0} синапсов`;
    return this.container;
  }
}