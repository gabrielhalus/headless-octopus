import { Types } from "mongoose";
import IField from "./IField";
import IProject from "./IProject";

interface ISchema {
  name: string;
  title: string;
  fields: IField[];
  project: Types.ObjectId | IProject;
  _doc: any;
}

export default ISchema;
