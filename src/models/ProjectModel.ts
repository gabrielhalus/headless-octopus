import { Document, Schema, model } from "mongoose";
import IProject from "../interfaces/IProject";

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, rel: "User", required: true },
    website: { type: String },
  },
  { timestamps: true }
);

export default model<IProject & Document>("Project", projectSchema);
