import { Request, Response } from "express";
import userService from "../services/UserService";
import IUser from "../interfaces/IUser";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
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
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req: Request, res: Response) {
    const userData = req.body as IUser;

    try {
      const newUser = await userService.createUser(userData);
      res.status(201).json(newUser);
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
      res.json(updatedUser);
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
      res.json(deletedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
