export interface ModalConfig<T = unknown> {
  title?: string;
  content?: string;
  primaryButton?: string;
  secondaryButton?: string;
  data?: T;
}
