export interface TContactsModel {
  email: string;
  number: string;

  changeEmail(email: string): void;
  changeNumber(number: string): void;
}