/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
// Definiendo el type 'Post'
export class Post {

  @Field((type) => Int)
  id: number;
  
  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;
}
