import {Component} from "../../types/component";
import {IEvents} from "../base/events";
import {TContactsUI} from "../../types/contacts/contacts-ui";

export class ContactsUI extends Component implements TContactsUI {
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.container.querySelector("input[name=\"email\"]").addEventListener("input", (e) => {
      this.events.emit("contacts/changed/email", { value: (e.target as HTMLInputElement).value });
    })

    this.container.querySelector("input[name=\"phone\"]").addEventListener("input", (e) => {
      this.events.emit("contacts/changed/number", { value: (e.target as HTMLInputElement).value });
    })

    this.container.querySelector(".button").addEventListener("click", (e) => {
      e.preventDefault();
      this.events.emit("success/opened");
    })
  }

  render({ disabled }: { disabled: boolean }) {
    (this.container.querySelector(".button") as HTMLButtonElement).disabled = disabled;

    return this.container;
  }
}