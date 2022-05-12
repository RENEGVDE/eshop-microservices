import mongoose from "mongoose";

interface FootwearAttrs {
  title: string;
  price: number;
  userId: string;
}

interface FootwearDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface FootwearModel extends mongoose.Model<FootwearDoc> {
  build(attrs: FootwearAttrs): FootwearDoc;
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
    },
    userId: {
      type: String,
      required: true,
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

footwearSchema.statics.build = (attr: FootwearAttrs) => {
  return new Footwear(attr);
};

const Footwear = mongoose.model<FootwearDoc, FootwearModel>(
  "Footwear",
  footwearSchema
);

export { Footwear };
