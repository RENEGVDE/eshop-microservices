import { Channels } from "./channels";

export interface FootwearUpdatedEvent {
  channel: Channels.FootwearUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
