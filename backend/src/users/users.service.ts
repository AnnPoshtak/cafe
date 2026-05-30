import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly usersRepo: Repository<User>
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async createUser(email: string, pass: string): Promise<User> {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = this.usersRepo.create({
      email,
      password: hashedPassword,
      role: "client"
    });

    return this.usersRepo.save(newUser);
  }

  async findOrCreateGoogleUser(email: string): Promise<User> {
    let user = await this.findUserByEmail(email);

    if (!user) {
      user = this.usersRepo.create({
        email,
        role: 'client'
      });
      user = await this.usersRepo.save(user);
    }

    return user;
  }

}