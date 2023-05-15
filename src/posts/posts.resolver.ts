import { Mutation, Query, Resolver, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Resolver()
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
  post(@Args('productId', { type: () => Int }) productId: number) {
    return this.postsService.findById(productId);
  }

  @Mutation(() => Post, { description: 'Creará un nuevo post' })
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postsService.createPost(postInput);
  }
}
