import Project from "../models/ProjectModel";
import IProject from "../interfaces/IProject";

class ProjectService {
  async getAllProjects() {
    try {
      return await Project.find();
    } catch (error: any) {
      throw new Error(`Error in getAllProject: ${error.message}`);
    }
  }

  async getProjectById(id: string) {
    try {
      const project = await Project.findById(id);
      // Handle the case where project with the given ID was not found
      if (!project) return null;
      return project;
    } catch (error: any) {
      throw new Error(`Error in getProjectById: ${error.message}`);
    }
  }

  async getProjectsForUser(id: string) {
    try {
      return await Project.find({ user: id });
    } catch (error: any) {
      throw new Error(`Error in getProjectsForUser: ${error.message}`);
    }
  }

  async createProject(projectData: IProject) {
    try {
      const project = new Project(projectData);
      return await project.save();
    } catch (error: any) {
      throw new Error(`Error in createProject: ${error.message}`);
    }
  }

  async updateProject(id: string, projectData: any) {
    try {
      const project = await Project.findByIdAndUpdate(id, projectData, { new: true });
      // Handle the case where project with the given ID was not found
      if (!project) return null;
      return project;
    } catch (error: any) {
      throw new Error(`Error in updateProject: ${error.message}`);
    }
  }

  async deleteProject(id: string) {
    try {
      const project = await Project.findByIdAndDelete(id);
      // Handle the case where project with the given ID was not found
      if (!project) return null;
      return project;
    } catch (error: any) {
      throw new Error(`Error in deleteProject: ${error.message}`);
    }
  }
}

export default new ProjectService();
