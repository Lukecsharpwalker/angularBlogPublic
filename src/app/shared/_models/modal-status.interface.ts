export interface ModalStatus {
  status: ModalStatusEnum
}
export enum ModalStatusEnum {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CLOSED = 'closed'
}
