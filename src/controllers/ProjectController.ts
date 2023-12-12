import { Request, Response } from "express";
import projectService from "../services/ProjectService";
import IProject from "../interfaces/IProject";

class ProjectController {
  async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await projectService.getAllProjects();
      const projectsWithLinks = projects.map((project) => {
        return {
          ...project._doc,
          links: [
            { rel: "self", href: `/projects/${project._id}` },
            { rel: "update", href: `/projects/${project._id}`, method: "PUT" },
            { rel: "delete", href: `/projects/${project._id}`, method: "DELETE" },
            { rel: "schemas", href: `/projects/${project._id}/schemas` },
          ]
        }
      })
      res.json(projectsWithLinks);
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
      const projectWithLinks = {
        ...project._doc,
          links: [
            { rel: "self", href: `/projects/${project._id}` },
            { rel: "update", href: `/projects/${project._id}`, method: "PUT" },
            { rel: "delete", href: `/projects/${project._id}`, method: "DELETE" },
            { rel: "schemas", href: `/projects/${project._id}/schemas` },
          ]
      }
      res.json(projectWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProjectsForUser(req: Request, res: Response) {
    const userId = req.params.id as string;

    try {
      const projects = await projectService.getProjectsForUser(userId);
      const projectsWithLinks = projects.map((project) => {
        return {
          ...project._doc,
          links: [
            { rel: "self", href: `/projects/${project._id}` },
            { rel: "update", href: `/projects/${project._id}`, method: "PUT" },
            { rel: "delete", href: `/projects/${project._id}`, method: "DELETE" },
            { rel: "schemas", href: `/projects/${project._id}/schemas` },
          ]
        }
      })
      res.json(projectsWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProject(req: Request, res: Response) {
    const projectData = req.body as IProject;

    try {
      const newProject = await projectService.createProject(projectData);
      const newProjectWithLinks = {
        ...newProject._doc,
          links: [
            { rel: "self", href: `/projects/${newProject._id}` },
            { rel: "update", href: `/projects/${newProject._id}`, method: "PUT" },
            { rel: "delete", href: `/projects/${newProject._id}`, method: "DELETE" },
          ]
      }
      res.status(201).json(newProjectWithLinks);
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
      const updatedProjectWithLinks = {
        ...updatedProject._doc,
          links: [
            { rel: "self", href: `/projects/${updatedProject._id}` },
            { rel: "update", href: `/projects/${updatedProject._id}`, method: "PUT" },
            { rel: "delete", href: `/projects/${updatedProject._id}`, method: "DELETE" },
          ]
      }
      res.json(updatedProjectWithLinks);
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
      res.json({
        message: "Successfully deleted",
        links: [{ rel: "create", href: `/projects`, method: "POST" }]
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProjectController();
