import express from "express";
const router = express.Router();

import documentController from "./controllers/DocumentController";
import projectController from "./controllers/ProjectController";
import rootController from "./controllers/RootController";
import schemaController from "./controllers/SchemaController";
import userController from "./controllers/UserController";

// Root
router.get("/", rootController.getRootLinks);

// Users
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Projects
router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id", projectController.getProjectById);
router.get("/users/:id/projects", projectController.getProjectsForUser);
router.post("/projects", projectController.createProject);
router.put("/projects/:id", projectController.updateProject);
router.delete("/projects/:id", projectController.deleteProject);

// Schemas
router.get("/schemas", schemaController.getAllSchemas);
router.get("/schemas/:id", schemaController.getSchemaById);
router.get("/projects/:id/schemas", schemaController.getSchemasForProject);
router.post("/schemas", schemaController.createSchema);
router.put("/schemas/:id", schemaController.updateSchema);
router.delete("/schemas/:id", schemaController.deleteSchema);

// Documents
router.get("/documents", documentController.getAllDocuments);
router.get("/documents/:id", documentController.getDocumentById);
router.get("/schemas/:id/documents", documentController.getDocumentsForSchema);
router.post("/documents", documentController.createDocument);
router.put("/documents/:id", documentController.updateDocument);
router.delete("/documents/:id", documentController.deleteDocument);

export default router;
