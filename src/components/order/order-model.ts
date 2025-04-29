import {Model} from "../../types/model";
import {IEvents} from "../base/events";
import {TOrderModel} from "../../types/order/order-model";

export class OrderModel extends Model implements TOrderModel {
  method: string = '';
  address: string = '';

  constructor(events: IEvents) {
    super(events);
  }

  changeMethod(method: string) {
    this.method = method;
  }

  changeAddress(address: string) {
    this.address = address;
  }
}