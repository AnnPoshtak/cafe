import { Injectable, NotFoundException } from '@nestjs/common';
import { GiveRoleDto } from './dto/give-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepo: Repository<User>, 
  ) {}

  async create(giveRoleDto: GiveRoleDto) {
    const userData = await this.userRepo.findOne({ 
      where: { email: giveRoleDto.email } 
    });

    if (!userData) {
      throw new NotFoundException(`User with email ${giveRoleDto.email} not found`);
    }
    userData.role = "barista";
    return await this.userRepo.save(userData);
  }

  async remove(giveRoleDto: GiveRoleDto) {
    const userData = await this.userRepo.findOne({ 
      where: { email: giveRoleDto.email } 
    });

    if (!userData) {
      throw new NotFoundException(`User with email ${giveRoleDto.email} not found`);
    }

    userData.role = "client";
    return await this.userRepo.save(userData);
  }
}