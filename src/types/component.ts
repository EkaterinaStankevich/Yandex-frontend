import {IEvents} from "../components/base/events";


export abstract class Component {
  protected container: HTMLElement;
  protected events: IEvents;

  protected constructor(container: HTMLElement, events: IEvents) {
    this.container = container;
    this.events = events;
  }

  render(data?: object) {
    return;
  }
}