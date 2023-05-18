import {
  Mutation,
  Query,
  Resolver,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';
import { UpdatePostInput } from './dto/update-post.input';
import { DeleteResult } from 'typeorm';

@Resolver((of) => Post)
// Definiendo las consultas que acceden los que consuman esta API
// Así como las mutaciones
export class PostsResolver {
  // Inyección de dependencias
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { description: 'Retornará un listado de posts' })
  posts() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { description: 'Retornará un post' })
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findById(id);
  }

  // Subconsulta para poder acceder a ciertos datos del 'Author' dentro de las queries 'posts' o 'post'
  @ResolveField(() => Author)
  author(@Parent() post: Post): Promise<Author> {
    return this.postsService.getAuthor(post.authorId);
  }

  @Mutation(() => Post, { description: 'Creará un nuevo post' })
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postsService.createPost(postInput);
  }

  @Mutation(() => Post, { description: 'Actualizará un post existente' })
  updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateInput') updateInput: UpdatePostInput,
  ) {
    return this.postsService.updatePost(id, updateInput);
  }

  @Mutation(() => Boolean, { description: 'Se eliminará un post' })
  deletePost(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.postsService.deletePost(id);
  }
}
