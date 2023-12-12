import { Types } from "mongoose";
import IUser from "./IUser";

interface IProject {
  name: string;
  title: string;
  user: Types.ObjectId | IUser;
  website: string;
  _doc: any;
}

export default IProject;
