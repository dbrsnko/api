import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpDto {
  @Expose()
  @IsEmail()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  @IsStrongPassword()
  password: string;
}
