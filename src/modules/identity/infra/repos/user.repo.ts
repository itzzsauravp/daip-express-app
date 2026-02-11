import prisma from 'src/lib/prisma.lib';
import { TCreateUser, TUpdateUser } from 'src/types/user.types';
import User from '../../domain/entities/User';

export class UserRepo {
  static async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return new User(user);
  }

  static async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return new User(user);
  }

  static async create(data: TCreateUser) {
    const user = await prisma.user.create({
      data,
    });
    return new User(user);
  }

  static async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  static async update(data: TUpdateUser) {
    await prisma.user.update({
      where: { id: data.id },
      data,
    });
  }
}
