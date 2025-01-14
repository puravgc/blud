import mongoose, { Schema, Document } from "mongoose";

interface IHospital extends Document {
  name: string;
  email: string;
  password: string;
  hospitalCode: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  bloodRequested: boolean;
  bloodGroupRequested: string[];
}

const hospitalSchema = new Schema<IHospital>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  hospitalCode: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },

    coordinates: {
      type: [Number],
      required: true,
    },
  },
  bloodRequested: {
    type: Boolean,
    default: false,
  },
  bloodGroupRequested: [
    {
      type: String,
    },
  ],
});

hospitalSchema.index({ location: "2dsphere" });
const Hospital =
  mongoose.models.Hospital ||
  mongoose.model<IHospital>("Hospital", hospitalSchema);

export default Hospital;
