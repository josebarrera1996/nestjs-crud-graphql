import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Definiedno la entidad 'Post'
@Entity({ name: 'Authors' })
// Definiendo el type 'Author'
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  // Relación '1 a Muchos' (un autor puede tener muchas publicaciones)
  @OneToMany(() => Post, (post) => post.author)
  @Field(() => [Post], { nullable: true })
  posts: Post[];
}
