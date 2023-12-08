import { Document, Schema, model } from "mongoose";
import IUser from "../interfaces/IUser";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IUser & Document>("User", userSchema);
