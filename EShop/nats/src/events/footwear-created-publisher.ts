import { Publisher } from "./publisher";
import { FootwearCreatedEvent } from "./footwear-created-event";
import { Channels } from "./channels";

export class FootwearCreatedPublisher extends Publisher<FootwearCreatedEvent> {
  channel: Channels.FootwearCreated = Channels.FootwearCreated;
}
