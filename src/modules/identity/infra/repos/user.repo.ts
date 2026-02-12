import prisma from 'src/lib/prisma.lib';
import { TCreateUser, TUpdateUser } from 'src/shared/domain/types/user.types';
import { UserMapper } from './user.mapper';
import { IUserRepository } from '../../app/ports/IUserRepository';

export class UserRepo implements IUserRepository {

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return UserMapper.toDomain(user);
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return UserMapper.toDomain(user);
  }

  async create(data: TCreateUser) {
    const user = await prisma.user.create({
      data,
    });
    return UserMapper.toDomain(user);
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async save(data: TUpdateUser) {
    await prisma.user.update({
      where: { id: data.id },
      data,
    });
  }

}
