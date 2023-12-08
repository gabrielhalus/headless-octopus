import { Request, Response } from "express";
import schemaService from "../services/SchemaService";
import ISchema from "../interfaces/ISchema";

class SchemaController {
  async getAllSchemas(req: Request, res: Response) {
    try {
      const schemas = await schemaService.getAllSchemas();
      res.json(schemas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSchemaById(req: Request, res: Response) {
    const schemaId = req.params.id as string;

    try {
      const schema = await schemaService.getSchemaById(schemaId);
      // Handle the case where schema with the given ID was not found
      if (!schema) return res.status(404).json({ error: `Schema with ID ${schemaId} not found` });
      res.json(schema);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSchemasForProject(req: Request, res: Response) {
    const projectId = req.params.id as string;

    try {
      const schemas = await schemaService.getSchemasForProject(projectId);
      res.json(schemas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createSchema(req: Request, res: Response) {
    const schemaData = req.body as ISchema;

    try {
      const schema = await schemaService.createSchema(schemaData);
      res.status(201).json(schema);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSchema(req: Request, res: Response) {
    const schemaId = req.params.id as string;
    const schemaData = req.body as ISchema;

    try {
      const updatedSchema = await schemaService.updateSchema(schemaId, schemaData);
      // Handle the case where schema with the given ID was not found
      if (!updatedSchema) return res.status(404).json({ error: `Schema with ID ${schemaId} not found` });
      res.json(updatedSchema);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteSchema(req: Request, res: Response) {
    const schemaId = req.params.id as string;

    try {
      const deletedSchema = await schemaService.deleteSchema(schemaId);
      // Handle the case where schema with the given ID was not found
      if (!deletedSchema) return res.status(404).json({ error: `Schema with ID ${schemaId} not found` });
      res.json(deletedSchema);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SchemaController();
