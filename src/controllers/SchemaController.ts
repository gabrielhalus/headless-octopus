import { Request, Response } from "express";
import schemaService from "../services/SchemaService";
import ISchema from "../interfaces/ISchema";

class SchemaController {
  async getAllSchemas(req: Request, res: Response) {
    try {
      const schemas = await schemaService.getAllSchemas();
      const schemasWithLinks = schemas.map((schema) => {
        return {
          ...schema._doc,
          _links: [
            { rel: "self", href: `/schemas/${schema._id}`, method: "GET" },
          ],
        };
      });
      res.json({
        _links: [
          { rel: "self", href: `/schemas`, method: "GET" },
          { rel: "create", href: `/schemas`, method: "POST" },
        ],
        schemas: schemasWithLinks,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSchemaById(req: Request, res: Response) {
    const schemaId = req.params.id as string;

    try {
      const schema = await schemaService.getSchemaById(schemaId);
      // Handle the case where schema with the given ID was not found
      if (!schema)
        return res
          .status(404)
          .json({ error: `Schema with ID ${schemaId} not found` });
      const schemaWithLinks = {
        ...schema._doc,
        _links: [
          { rel: "self", href: `/schemas/${schema._id}`, method: "GET" },
          { rel: "update", href: `/schemas/${schema._id}`, method: "PUT" },
          { rel: "delete", href: `/schemas/${schema._id}`, method: "DELETE" },
          {
            rel: "documents",
            href: `/schemas/${schema._id}/documents`,
            method: "GET",
          },
        ],
      };
      res.json(schemaWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSchemasForProject(req: Request, res: Response) {
    const projectId = req.params.id as string;

    try {
      const schemas = await schemaService.getSchemasForProject(projectId);
      const schemasWithLinks = schemas.map((schema) => {
        return {
          ...schema._doc,
          _links: [
            { rel: "self", href: `/schemas/${schema._id}`, method: "GET" },
            { rel: "update", href: `/schemas/${schema._id}`, method: "PUT" },
            { rel: "delete", href: `/schemas/${schema._id}`, method: "DELETE" },
            {
              rel: "documents",
              href: `/schemas/${schema._id}/documents`,
              method: "GET",
            },
          ],
        };
      });
      res.json(schemasWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createSchema(req: Request, res: Response) {
    const schemaData = req.body as ISchema;

    try {
      const newSchema = await schemaService.createSchema(schemaData);
      const newSchemaWithLinks = {
        ...newSchema._doc,
        _links: [
          { rel: "self", href: `/schemas/${newSchema._id}`, method: "GET" },
          { rel: "update", href: `/schemas/${newSchema._id}`, method: "PUT" },
          {
            rel: "delete",
            href: `/schemas/${newSchema._id}`,
            method: "DELETE",
          },
        ],
      };
      res.status(201).json(newSchemaWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSchema(req: Request, res: Response) {
    const schemaId = req.params.id as string;
    const schemaData = req.body as ISchema;

    try {
      const updatedSchema = await schemaService.updateSchema(
        schemaId,
        schemaData
      );
      // Handle the case where schema with the given ID was not found
      if (!updatedSchema)
        return res
          .status(404)
          .json({ error: `Schema with ID ${schemaId} not found` });
      const updatedSchemaWithLinks = {
        ...updatedSchema._doc,
        _links: [
          { rel: "self", href: `/schemas/${updatedSchema._id}`, method: "GET" },
          {
            rel: "update",
            href: `/schemas/${updatedSchema._id}`,
            method: "PUT",
          },
          {
            rel: "delete",
            href: `/schemas/${updatedSchema._id}`,
            method: "DELETE",
          },
        ],
      };
      res.json(updatedSchemaWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteSchema(req: Request, res: Response) {
    const schemaId = req.params.id as string;

    try {
      const deletedSchema = await schemaService.deleteSchema(schemaId);
      // Handle the case where schema with the given ID was not found
      if (!deletedSchema)
        return res
          .status(404)
          .json({ error: `Schema with ID ${schemaId} not found` });
      res.sendStatus(204);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SchemaController();
