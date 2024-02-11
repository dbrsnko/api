import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignInDto {
  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  password: string;
}
