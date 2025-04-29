import {Model} from "../../types/model";
import {IEvents} from "../base/events";
import {TContactsModel} from "../../types/contacts/contacts-model";

export class ContactsModel extends Model implements TContactsModel {
  email: string = '';
  number: string = '';

  constructor(events: IEvents) {
    super(events);
  }

  changeEmail(email: string) {
    this.email = email;
  }

  changeNumber(number: string) {
    this.number = number;
  }
}