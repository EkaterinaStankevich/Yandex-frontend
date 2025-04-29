import {Component} from "../../types/component";
import {IEvents} from "../base/events";
import {TModal} from "../../types/modal/modal-ui";

export class Modal extends Component implements TModal {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.container.querySelector(".modal__close").addEventListener("click", () => this.close());
  }

  open(content: HTMLElement) {
    this.render({content});
    document.body.style.overflowY = "hidden";
    this.container.classList.add("modal_active");
  }

  close() {
    this.render(null);
    document.body.style.overflowY = "auto";
    document.querySelectorAll(".modal_active").forEach(modal => {
      modal.classList.remove("modal_active");
    });
  }

  render(data: {content: HTMLElement}) {
    if (!data) return;

    this.container.querySelector(".modal__content").replaceChildren(data.content);
  }
}