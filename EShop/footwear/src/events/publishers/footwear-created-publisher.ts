import { Publisher, Channels, FootwearCreatedEvent } from "@rusnvc/common";

export class FootwearCreatedPublisher extends Publisher<FootwearCreatedEvent> {
  channel: Channels.FootwearCreated = Channels.FootwearCreated;
}
