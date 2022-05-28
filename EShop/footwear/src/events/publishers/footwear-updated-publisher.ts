import { Publisher, Channels, FootwearUpdatedEvent } from "@rusnvc/common";

export class FootwearUpdatedPublisher extends Publisher<FootwearUpdatedEvent> {
  channel: Channels.FootwearUpdated = Channels.FootwearUpdated;
}
