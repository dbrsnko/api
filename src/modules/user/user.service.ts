import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JWTUser } from '../jwt';
import { UserRole } from 'src/shared/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(user: Partial<User>) {
    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  private async findAdminUsers() {
    const users = await this.findAll();
    return users;
  }

  private async findBossUsers(user: JWTUser) {
    return [];
  }

  private async findDefaultUserUsers(user: JWTUser) {
    return this.usersRepository.find({ where: { id: user.id } });
  }

  private async findUsersByRoleMap(user: JWTUser) {
    const map: Record<UserRole, (user: JWTUser) => Promise<User[]>> = {
      [UserRole.User]: this.findDefaultUserUsers.bind(this),
      [UserRole.Boss]: this.findBossUsers.bind(this),
      [UserRole.Admin]: this.findAdminUsers.bind(this),
    };

    const users = await map[user.role](user);
    return users;
  }

  async findSubordinateUsers(user: JWTUser) {
    return this.findUsersByRoleMap(user);
  }
}
