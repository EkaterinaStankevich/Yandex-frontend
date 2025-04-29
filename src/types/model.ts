import {IEvents} from "../components/base/events";

export abstract class Model {
  protected events: IEvents;

  protected constructor(events: IEvents) {
    this.events = events;
  }
}