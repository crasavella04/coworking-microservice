export interface IKafkaMessage<T> {
  topic: string;
  particion: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: T;
  headers: Record<string, any>;
}
