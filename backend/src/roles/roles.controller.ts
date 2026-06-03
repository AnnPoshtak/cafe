import { Controller, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { GiveRoleDto } from './dto/give-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post("give")
  create(@Body() giveRoleDto: GiveRoleDto) {
    return this.rolesService.create(giveRoleDto);
  }

  @Post("remove")
  remove(@Body() giveRoleDto: GiveRoleDto) {
    return this.rolesService.remove(giveRoleDto);
  }

}
