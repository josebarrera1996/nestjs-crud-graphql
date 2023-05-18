import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

// DTO de 'Authors'
// Con este se validarán los datos que recibamos del cliente para crear un nuevo 'author'
@InputType()
export class CreateAuthorInput {
  @IsNotEmpty({ message: "Name can't be empty" })
  @MinLength(10, { message: 'Name is too short' })
  @MaxLength(100, { message: 'Name is too long' })
  @Field()
  name: string;
}
