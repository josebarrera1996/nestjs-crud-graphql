/* eslint-disable prettier/prettier */

import { Field, InputType } from "@nestjs/graphql";

// DTO de 'Posts'
// Servirá para detallar que es lo que recibirá del cliente (los datos)
@InputType()
export class CreatePostInput {

    @Field()
    title: string;

    @Field()
    content: string;
}
