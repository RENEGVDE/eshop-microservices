import { Message } from "node-nats-streaming";
import { Listener } from "./listener";
import { FootwearCreatedEvent } from "./footwear-created-event";
import { Channels } from "./channels";

export class FootwearCreatedListener extends Listener<FootwearCreatedEvent> {
  channel: Channels.FootwearCreated = Channels.FootwearCreated;
  queueGroupName = "payments-service";

  onMessage(data: FootwearCreatedEvent["data"], msg: Message) {
    console.log("Event data.", data);

    console.log(data.id);
    console.log(data.title);

    msg.ack();
  }
}
