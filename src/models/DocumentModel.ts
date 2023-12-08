import { Document, Schema, model } from "mongoose";
import IDocument from "../interfaces/IDocument";

const documentSchema = new Schema(
  {
    name: { type: String, required: true },
    fields: [{ type: Object, required: true }],
    schema: { type: Schema.Types.ObjectId, ref: "Schema", required: true },
  },
  { timestamps: true }
);

export default model<IDocument & Document>("Document", documentSchema);
