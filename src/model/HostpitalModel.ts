import mongoose, { Schema, Document } from "mongoose";

interface IHospital extends Document {
  name: string;
  email: string;
  password: string;
  hospitalCode: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
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
});

hospitalSchema.index({ location: "2dsphere" });

// Check if the model is already compiled, otherwise compile it
const Hospital =
  mongoose.models.Hospital ||
  mongoose.model<IHospital>("Hospital", hospitalSchema);

export default Hospital;
