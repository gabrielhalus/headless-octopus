import User from "../models/UserModel";
import IUser from "../interfaces/IUser";

class UserService {
  async getAllUsers() {
    try {
      return await User.find();
    } catch (error: any) {
      throw new Error(`Error in getUserById: ${error.message}`);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await User.findById(id);
      // Handle the case where user with the given ID was not found
      if (!user) return null;
      return user;
    } catch (error: any) {
      throw new Error(`Error in getUserById: ${error.message}`);
    }
  }

  async createUser(userData: IUser) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error: any) {
      throw new Error(`Error in createUser: ${error.message}`);
    }
  }

  async updateUser(id: string, userData: IUser) {
    try {
      const user = await User.findByIdAndUpdate(id, userData, { new: true });
      // Handle the case where user with the given ID was not found
      if (!user) return null;
      return user;
    } catch (error: any) {
      throw new Error(`Error in updateUser: ${error.message}`);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await User.findByIdAndDelete(id);
      // Handle the case where user with the given ID was not found
      if (!user) return null;
      return user;
    } catch (error: any) {
      throw new Error(`Error in deleteUser: ${error.message}`);
    }
  }
}

export default new UserService();
