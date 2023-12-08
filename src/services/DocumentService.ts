import Document from "../models/DocumentModel";
import IDocument from "../interfaces/IDocument";

class DocumentService {
  async getAllDocuments() {
    try {
      return await Document.find();
    } catch (error: any) {
      throw new Error(`Error in getAllDocuments: ${error.message}`);
    }
  }

  async getDocumentById(id: string) {
    try {
      const document = await Document.findById(id);
      // Handle the case where document with the given ID was not found
      if (!document) return null;
      return document;
    } catch (error: any) {
      throw new Error(`Error in getDocumentById: ${error.message}`);
    }
  }

  async getDocumentsForSchema(id: string) {
    try {
      return await Document.find({ schema: id });
    } catch (error: any) {
      throw new Error(`Error in getDocumentsForSchema: ${error.message}`);
    }
  }

  async createDocument(documentData: IDocument) {
    try {
      const document = new Document(documentData);
      return await document.save();
    } catch (error: any) {
      throw new Error(`Error in createDocument: ${error.message}`);
    }
  }

  async updateDocument(id: string, documentData: IDocument) {
    try {
      const document = await Document.findByIdAndUpdate(id, documentData, { new: true });
      // Handle the case where document with the given ID was not found
      if (!document) return null;
      return document;
    } catch (error: any) {
      throw new Error(`Error in updateDocument: ${error.message}`);
    }
  }

  async deleteDocument(id: string) {
    try {
      const document = await Document.findByIdAndDelete(id);
      // Handle the case where document with the given ID was not found
      if (!document) return null;
      return document;
    } catch (error: any) {
      throw new Error(`Error in deleteDocument: ${error.message}`);
    }
  }
}

export default new DocumentService();
