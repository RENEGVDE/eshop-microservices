import { Channels, ExpirationCompleteEvent, Publisher } from "@rusnvc/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  channel: Channels.ExpirationComplete = Channels.ExpirationComplete;
}
