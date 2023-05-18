import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength, IsOptional } from 'class-validator';

// DTO de 'Authors'
// Con este se validarán los datos que recibamos del cliente para actualizar un 'author'
@InputType()
export class UpdateAuthorInput {
  @IsNotEmpty({ message: "Name can't be empty" })
  @MinLength(10, { message: 'Name is too short' })
  @MaxLength(100, { message: 'Name is too long' })
  @IsOptional()
  @Field()
  name: string;
}
