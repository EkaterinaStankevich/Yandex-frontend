export interface TOrderModel {
  method: string;
  address: string;

  changeMethod(method: string): void;
  changeAddress(address: string): void;
}