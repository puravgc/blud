import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    medicalConditions: {
      type: String,
    },
    additionalInfo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = models.User || model("User", UserSchema);

export default UserModel;
