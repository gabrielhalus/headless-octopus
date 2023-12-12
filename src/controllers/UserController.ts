import { Request, Response } from "express";
import userService from "../services/UserService";
import IUser from "../interfaces/IUser";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      const usersWithLinks = users.map((user) => {
        return {
          ...user._doc,
          links: [
            { rel: "self", href: `/users/${user._id}` },
            { rel: "update", href: `/users/${user._id}`, method: "PUT" },
            { rel: "delete", href: `/users/${user._id}`, method: "DELETE" },
            { rel: "projects", href: `/users/${user._id}/projects` }
          ]
        }
      })
      res.json(usersWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id as string;

    try {
      const user = await userService.getUserById(userId);
      // Handle the case where user with the given ID was not found
      if (!user) return res.status(404).json({ error: `User with ID ${userId} not found` });
      const userWithLinks = {
        ...user._doc,
        links: [
          { rel: "self", href: `/users/${user._id}` },
          { rel: "update", href: `/users/${user._id}`, method: "PUT" },
          { rel: "delete", href: `/users/${user._id}`, method: "DELETE" },
          { rel: "projects", href: `/users/${user._id}/projects` }
        ]
      }
      res.json(userWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req: Request, res: Response) {
    const userData = req.body as IUser;

    try {
      const newUser = await userService.createUser(userData);
      const newUserWithLinks = {
        ...newUser._doc,
        links: [
          { rel: "self", href: `/users/${newUser._id}` },
          { rel: "update", href: `/users/${newUser._id}`, method: "PUT" },
          { rel: "delete", href: `/users/${newUser._id}`, method: "DELETE" },
        ]
      }
      res.status(201).json(newUserWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = req.params.id as string;
    const userData = req.body as IUser;

    try {
      const updatedUser = await userService.updateUser(userId, userData);
      // Handle the case where user with the given ID was not found
      if (!updatedUser) return res.status(404).json({ error: `User with ID ${userId} not found` });
      const updatedUserWithLinks = {
        ...updatedUser._doc,
        links: [
          { rel: "self", href: `/users/${updatedUser._id}` },
          { rel: "update", href: `/users/${updatedUser._id}`, method: "PUT" },
          { rel: "delete", href: `/users/${updatedUser._id}`, method: "DELETE" },
        ]
      }
      res.json(updatedUserWithLinks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const userId = req.params.id as string;

    try {
      const deletedUser = await userService.deleteUser(userId);
      // Handle the case where user with the given ID was not found
      if (!deletedUser) return res.status(404).json({ error: `User with ID ${userId} not found` });
      res.json({ 
        message: "Successfully deleted",
        links: [{ rel: "create", href: `/users`, method: "POST" }]
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
