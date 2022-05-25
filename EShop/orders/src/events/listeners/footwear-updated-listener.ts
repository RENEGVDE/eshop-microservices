import { Channels, FootwearUpdatedEvent, Listener } from "@rusnvc/common";
import { Message } from "node-nats-streaming";
import { Footwear } from "../../models/footwear";
import { queueGroupName } from "./queue-group-name";

export class FootwearUpdatedListener extends Listener<FootwearUpdatedEvent> {
  channel: Channels.FootwearUpdated = Channels.FootwearUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: FootwearUpdatedEvent["data"], msg: Message) {
    const footwear = await Footwear.findByEvent(data);

    if (!footwear) {
      throw new Error("No footwear");
    }

    const { title, price } = data;
    footwear.set({ title, price });
    await footwear.save();

    msg.ack();
  }
}
