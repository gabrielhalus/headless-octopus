import ISchema from "../interfaces/ISchema";
import Schema from "../models/SchemaModel";

class SchemaService {
  async getAllSchemas() {
    try {
      return await Schema.find();
    } catch (error: any) {
      throw new Error(`Error in getAllSchemas: ${error.message}`);
    }
  }

  async getSchemaById(id: string) {
    try {
      const schema = await Schema.findById(id);
      // Handle the case where schema with the given id was not found
      if (!schema) return null;
      return schema;
    } catch (error: any) {
      throw new Error(`Error in getSchemaById: ${error.message}`);
    }
  }

  async getSchemasForProject(id: string) {
    try {
      return await Schema.find({ project: id });
    } catch (error: any) {
      throw new Error(`Error in getSchemasForProject: ${error.message}`);
    }
  }

  async createSchema(schemaData: ISchema) {
    try {
      const schema = new Schema(schemaData);
      return await schema.save();
    } catch (error: any) {
      throw new Error(`Error in createSchema: ${error.message}`);
    }
  }

  async updateSchema(id: string, schemaData: ISchema) {
    try {
      const schema = await Schema.findByIdAndUpdate(id, schemaData, { new: true });
      // Handle the case where schema with the given id was not found
      if (!schema) return null;
      return schema;
    } catch (error: any) {
      throw new Error(`Error in updateSchema: ${error.message}`);
    }
  }

  async deleteSchema(id: string) {
    try {
      const schema = await Schema.findByIdAndDelete(id);
      // Handle the case where schema with the given id was not found
      if (!schema) return null;
      return schema;
    } catch (error: any) {
      throw new Error(`Error in deleteSchema: ${error.message}`);
    }
  }
}

export default new SchemaService();
