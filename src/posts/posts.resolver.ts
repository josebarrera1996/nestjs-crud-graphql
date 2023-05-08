import { Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';

@Resolver()
// Definiendo las consultas que acceden los que consuman esta API
export class PostsResolver {
  // Inyección de dependencias
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { description: 'Retornará un listado de posts' })
  posts() {
    return this.postsService.findAll();
  }
}
