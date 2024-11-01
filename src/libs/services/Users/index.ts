import { UsersModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type User = Prisma.User;

class UserService {
  #userModel: typeof UsersModels;

  constructor(userModel: typeof UsersModels) {
    this.#userModel = userModel;
  }

  async getUserByCredentials(where: {
    email?: string;
    phone_number?: string;
  }): Promise<User | null> {
    return await this.#userModel.findFirst({
      where,
    });
  }

  async getUsers(skip: number, limit: number, filter: any): Promise<User[]> {
    return await this.#userModel.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
      where: filter,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.#userModel.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.#userModel.findUnique({
      where: { email },
    });
  }

  async createUser(
    name: string,
    email: string,
    phone_number: string,
    password: string,
    role: Prisma.$Enums.Role
  ): Promise<User> {
    return await this.#userModel.create({
      data: {
        name,
        email,
        phone_number,
        password,
        role,
      },
    });
  }

  async updateUserById(id: number, data: Partial<User>): Promise<User> {
    return await this.#userModel.update({
      where: { id },
      data,
    });
  }

  async changePassword(id: number, password: string): Promise<User> {
    return await this.#userModel.update({
      where: { id },
      data: { password },
    });
  }

  async deleteUserById(id: number): Promise<void> {
    await this.#userModel.delete({ where: { id: Number(id) } });
  }

  async countTotalDataUser(): Promise<number> {
    return await this.#userModel.count();
  }
}

const userService = new UserService(UsersModels);

export default userService;
