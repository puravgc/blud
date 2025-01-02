import mongoose, { Schema, Document } from "mongoose";

interface IRequest extends Document {
  bloodGroup: string;
  address: string;
  hospital: string;
}

const requestSchema: Schema = new Schema(
  {
    bloodGroup: { type: String, required: true },
    address: { type: String, required: true },
    hospital: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const RequestModel =
  mongoose.models.RequestModel ||
  mongoose.model<IRequest>("RequestModel", requestSchema);

export default RequestModel;
