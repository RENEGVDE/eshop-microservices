import { Stan } from "node-nats-streaming";
import { Channels } from "./channels";

interface Event {
  channel: Channels;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract channel: T["channel"];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.channel, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log('Event published to ', this.channel)
        resolve();
      });
    });
  }
}