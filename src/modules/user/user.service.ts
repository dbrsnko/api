import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const boss = await this.usersRepository.findOne({ where: { id: user.id } });
    const users: User[] = [];
    users.push(boss);
    return  this.findUserRecursion(users,user.id);
  }

  private async findUserRecursion(users: User [], bossId: number) {
    const user = await this.usersRepository.findOne({where:{bossId},lock: { mode: "pessimistic_write"} });
    if (!user) 
      return null;
    users.push(user);
    await this.findUserRecursion(users,bossId);
    return users;
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

  async changeBoss(user: JWTUser, userId, newBossId){
    return this.changeBossByRoleMap(user, userId, newBossId)
  }
  
  private async changeBossByRoleMap (user: JWTUser, userId, newBossId) {
    const map: Record<UserRole, (user: JWTUser, userId: string, newBossId: string) => Promise<User>> = {
      [UserRole.User]: ()=>{throw new HttpException('No Access', HttpStatus.FORBIDDEN)},
      //[UserRole.Boss]: this.setBoss.bind(this), 
      [UserRole.Admin]: ()=>{throw new HttpException('No Access', HttpStatus.FORBIDDEN)},
      [UserRole.Boss]:(user, userId, newBossId) => this.setBoss(user, userId, newBossId),
    };
    
    const users = await map[user.role](user, userId, newBossId);
    return users;
  }

  private async setBoss(user: JWTUser, userId, newBossId){
    let subordinate = await this.usersRepository.findOne({ where: { id: userId } });
    const newBoss = await this.usersRepository.findOne({ where: { id: newBossId } });
    if((user.id === subordinate.bossId || subordinate.bossId === null) && newBoss!=null)      
      await this.usersRepository.update(userId, { bossId: newBossId });    
    subordinate = await this.usersRepository.findOne({ where: { id: userId } });
    return subordinate;
  }
}
