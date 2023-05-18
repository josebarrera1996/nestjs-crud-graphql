/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

// Definiedno la entidad 'Post'
@Entity({ name: 'Posts' })
// Definiendo el type 'Post'
@ObjectType()
export class Post {

  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;
  
  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  content?: string;

  @Column()
  @Field(() => Int)
  authorId: number;

  // Relación 'Muchos a 1' (muchas publicaciones pueden pertenercer a un autor)
  @ManyToOne(() => Author, (author) => author.posts)
  @Field(() => Author)
  author: Author;
}
