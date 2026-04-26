import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    default: ""
  },

  firstName: {
    type: String,
    default: ""
  },

  lastName: {
    type: String,
    default: ""
  },

  photo: {
    type: String,
    default: ""
  },

  creditBalance: {
    type: Number,
    default: 5
  }
});

const userModel =
  mongoose.models.user ||
  mongoose.model("user", userSchema);

export default userModel;