import { OrderStatus } from "@rusnvc/common";
import mongoose from "mongoose";
import { Order } from "./order";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface FootwearAttrs {
  id: string;
  title: string;
  price: number;
  // version: number
}

export interface FootwearDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface FootwearModel extends mongoose.Model<FootwearDoc> {
  build(attr: FootwearAttrs): FootwearDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<FootwearDoc | null>;
}

const footwearSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.it = ret._id;
        delete ret._id;
      },
    },
  }
);

footwearSchema.set("versionKey", "version");
footwearSchema.plugin(updateIfCurrentPlugin);

footwearSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  return Footwear.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
footwearSchema.statics.build = (attr: FootwearAttrs) => {
  return new Footwear({
    _id: attr.id,
    title: attr.title,
    price: attr.price,
  });
};

footwearSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    footwear: this as any,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Footwear = mongoose.model<FootwearDoc, FootwearModel>(
  "Footwear",
  footwearSchema
);

export { Footwear };
