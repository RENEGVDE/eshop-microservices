import { Channels, PaymentCreatedEvent, Publisher } from "@rusnvc/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  channel: Channels.PaymentCreated = Channels.PaymentCreated;
}
