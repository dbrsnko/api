import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  password: string;

}
