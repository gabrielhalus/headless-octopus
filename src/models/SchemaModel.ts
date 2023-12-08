import { Document, Schema, model } from "mongoose";
import ISchema from "../interfaces/ISchema";

const schemaSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    fields: [{ type: Object, required: true }],
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

export default model<ISchema & Document>("Schema", schemaSchema);
