import { OrderStatus } from "@rusnvc/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { FootwearDoc } from "./footwear";

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  footwear: FootwearDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  footwear: FootwearDoc;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attr: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    footwear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Footwear",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attr: OrderAttrs) => {
  return new Order(attr);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
