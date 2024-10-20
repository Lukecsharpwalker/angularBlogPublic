export interface ModalStatus<T = unknown> {
  closeStatus: ModalCloseStatusEnum
  data?: T
}
export enum ModalCloseStatusEnum {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CLOSED = 'closed'
}
