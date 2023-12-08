import { Request, Response } from "express";
import documentService from "../services/DocumentService";
import IDocument from "../interfaces/IDocument";

class DocumentController {
  async getAllDocuments(req: Request, res: Response) {
    try {
      const documents = await documentService.getAllDocuments();
      res.json(documents);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocumentById(req: Request, res: Response) {
    const documentId = req.params.id as string;
    try {
      const document = await documentService.getDocumentById(documentId);
      // Handle the case where document with the given ID was not found
      if (!document) return res.status(404).json({ error: `Document with ID ${documentId} not found` });
      res.json(document);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocumentsForSchema(req: Request, res: Response) {
    const schemaId = req.params.id as string;

    try {
      const documents = await documentService.getDocumentsForSchema(schemaId);
      res.json(documents);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDocument(req: Request, res: Response) {
    const documentData = req.body as IDocument;

    try {
      const document = await documentService.createDocument(documentData);
      res.status(201).json(document);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDocument(req: Request, res: Response) {
    const documentId = req.params.id as string;
    const documentData = req.body as IDocument;

    try {
      const updatedDocument = await documentService.updateDocument(documentId, documentData);
      // Handle the case where document with the given ID was not found
      if (!updatedDocument) return res.status(404).json({ error: `Document with ID ${documentId} not found` });
      res.json(updatedDocument);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDocument(req: Request, res: Response) {
    const documentId = req.params.id as string;

    try {
      const deletedDocument = await documentService.deleteDocument(documentId);
      // Handle the case where document with the given ID was not found
      if (!deletedDocument) return res.status(404).json({ error: `Document with ID ${documentId} not found` });
      res.json(deletedDocument);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new DocumentController();
