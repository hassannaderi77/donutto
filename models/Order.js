import { Schema, models, model } from "mongoose";

const orderSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,

  },
  pay: {
    type: Boolean,
  }
});

const Order = models.Order || model("Order", orderSchema);

export default Order;
