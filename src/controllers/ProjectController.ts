import { Request, Response } from "express";
import projectService from "../services/ProjectService";
import IProject from "../interfaces/IProject";

class ProjectController {
  async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await projectService.getAllProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProjectById(req: Request, res: Response) {
    const projectId = req.params.id as string;

    try {
      const project = await projectService.getProjectById(projectId);
      // Handle the case where project with the given ID was not found
      if (!project) return res.status(404).json({ error: `Project with ID ${projectId} not found` });
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProjectsForUser(req: Request, res: Response) {
    const userId = req.params.id as string;

    try {
      const projects = await projectService.getProjectsForUser(userId);
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProject(req: Request, res: Response) {
    const projectData = req.body as IProject;

    try {
      const project = await projectService.createProject(projectData);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProject(req: Request, res: Response) {
    const projectId = req.params.id as string;
    const projectData = req.body as IProject;

    try {
      const updatedProject = await projectService.updateProject(projectId, projectData);
      // Handle the case where project with the given ID was not found
      if (!updatedProject) return res.status(404).json({ error: `Project with ID ${projectId} not found` });
      res.json(updatedProject);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProject(req: Request, res: Response) {
    const projectId = req.params.id as string;

    try {
      const deletedProject = await projectService.deleteProject(projectId);
      // Handle the case where project with the given ID was not found
      if (!deletedProject) return res.status(404).json({ error: `Project with ID ${projectId} not found` });
      res.json(deletedProject);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProjectController();
