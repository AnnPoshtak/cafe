import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class GiveRoleDto {
  @ApiProperty({ 
    example: 'test@gmail.com', 
    description: "User's email to whom the role will be given"
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}