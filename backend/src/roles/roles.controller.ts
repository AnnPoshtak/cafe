import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { GiveRoleDto } from './dto/give-role.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from "../auth/decorators/roles.decorator"

@UseGuards(RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles("admin")
  @Post("give")
  create(@Body() giveRoleDto: GiveRoleDto) {
    return this.rolesService.create(giveRoleDto);
  }
  
  @Roles("admin")
  @Post("remove")
  remove(@Body() giveRoleDto: GiveRoleDto) {
    return this.rolesService.remove(giveRoleDto);
  }

}
