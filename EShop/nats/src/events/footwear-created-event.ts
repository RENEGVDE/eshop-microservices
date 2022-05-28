import { Channels } from "./channels";

export interface FootwearCreatedEvent {
  channel: Channels.FootwearCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
