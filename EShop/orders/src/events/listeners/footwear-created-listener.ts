import { Listener, FootwearCreatedEvent, Channels } from "@rusnvc/common";
import { Message } from "node-nats-streaming";
import { Footwear } from "../../models/footwear";
import { queueGroupName } from "./queue-group-name";

export class FootwearCreatedListener extends Listener<FootwearCreatedEvent> {
  channel: Channels.FootwearCreated = Channels.FootwearCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: FootwearCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const footwear = Footwear.build({
      id,
      title,
      price,
    });
    await footwear.save();

    msg.ack();
  }
}
