import { models, model, Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  detail: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
  },
  url: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
