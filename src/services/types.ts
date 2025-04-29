export type Status = 'pending' | 'rejected' | 'fulfilled' | 'initial';

export interface IStateWithStatus<T> {
  items: T[];
  status: Status;
}
