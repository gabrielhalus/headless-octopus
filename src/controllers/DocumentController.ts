import { Request, Response } from "express";
import documentService from "../services/DocumentService";
import IDocument from "../interfaces/IDocument";

class DocumentController {
  async getAllDocuments(req: Request, res: Response) {
    try {
      const documents = await documentService.getAllDocuments();
      const documentsWithLinks = documents.map((document) => {
        return {
          ...document._doc,
          _links: [{ rel: "self", href: `/documents/${document._id}` }],
        };
      });
      res.json({
        _links: [{ rel: "create", href: `/documents`, method: "POST" }],
        documents: documentsWithLinks,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocumentById(req: Request, res: Response) {
    const documentId = req.params.id as string;
    try {
      const document = await documentService.getDocumentById(documentId);
      // Handle the case where document with the given ID was not found
      if (!document)
        return res
          .status(404)
          .json({ error: `Document with ID ${documentId} not found` });
      const documentWithLinks = {
        ...document._doc,
        _links: [
          { rel: "self", href: `/documents/${document._id}` },
          { rel: "update", href: `/documents/${document._id}`, method: "PUT" },
          {
            rel: "delete",
            href: `/documents/${document._id}`,
            method: "DELETE",
          },
        ],
      };
      res.json(documentWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocumentsForSchema(req: Request, res: Response) {
    const schemaId = req.params.id as string;

    try {
      const documents = await documentService.getDocumentsForSchema(schemaId);
      const documentsWithLinks = documents.map((document) => {
        return {
          ...document._doc,
          _links: [
            { rel: "self", href: `/documents/${document._id}` },
            {
              rel: "update",
              href: `/documents/${document._id}`,
              method: "PUT",
            },
            {
              rel: "delete",
              href: `/documents/${document._id}`,
              method: "DELETE",
            },
          ],
        };
      });
      res.json(documentsWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDocument(req: Request, res: Response) {
    const documentData = req.body as IDocument;

    try {
      const newDocument = await documentService.createDocument(documentData);
      const newDocumentWithLinks = {
        ...newDocument._doc,
        _links: [
          { rel: "self", href: `/documents/${newDocument._id}` },
          {
            rel: "update",
            href: `/documents/${newDocument._id}`,
            method: "PUT",
          },
          {
            rel: "delete",
            href: `/documents/${newDocument._id}`,
            method: "DELETE",
          },
        ],
      };
      res.status(201).json(newDocumentWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDocument(req: Request, res: Response) {
    const documentId = req.params.id as string;
    const documentData = req.body as IDocument;

    try {
      const updatedDocument = await documentService.updateDocument(
        documentId,
        documentData
      );
      // Handle the case where document with the given ID was not found
      if (!updatedDocument)
        return res
          .status(404)
          .json({ error: `Document with ID ${documentId} not found` });
      const updatedDocumentWithLinks = {
        ...updatedDocument._doc,
        _links: [
          { rel: "self", href: `/documents/${updatedDocument._id}` },
          {
            rel: "update",
            href: `/documents/${updatedDocument._id}`,
            method: "PUT",
          },
          {
            rel: "delete",
            href: `/documents/${updatedDocument._id}`,
            method: "DELETE",
          },
        ],
      };
      res.json(updatedDocumentWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDocument(req: Request, res: Response) {
    const documentId = req.params.id as string;

    try {
      const deletedDocument = await documentService.deleteDocument(documentId);
      // Handle the case where document with the given ID was not found
      if (!deletedDocument)
        return res
          .status(404)
          .json({ error: `Document with ID ${documentId} not found` });
      res.json({
        message: "Successfully deleted",
        _links: [{ rel: "create", href: `/documents`, method: "POST" }],
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new DocumentController();
