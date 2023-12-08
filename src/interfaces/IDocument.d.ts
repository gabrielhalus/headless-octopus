import { Types } from "mongoose";
import ISchema from "./ISchema";
import IDocumentField from "./IDocumentField";

interface IDocument {
  name: string;
  fields: IDocumentField[];
  schema: Types.ObjectId | ISchema;
}

export default IDocument;
