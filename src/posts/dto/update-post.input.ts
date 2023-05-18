/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsNotEmpty, MaxLength, MinLength } from "class-validator";

// DTO de 'Posts'
// Servirá para detallar que es lo que recibirá del cliente (los datos)
// Y para implementar validaciones
@InputType()
export class UpdatePostInput {

    @IsNotEmpty({ message: "Title can't be empty" })
    @MinLength(10, { message: 'Title is too short' })
    @MaxLength(100, { message: 'Title is too long' })
    @IsOptional()
    @Field()
    title: string;

    @MaxLength(400, { message: 'Title is too long' })
    @Field({ nullable: true })
    @IsOptional()
    content?: string;
}
