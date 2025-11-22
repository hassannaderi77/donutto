import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,

  },
  comment: {
    type: String,
    trim: true,
  }
});

const User = models.User || model("User", userSchema);

export default User;
