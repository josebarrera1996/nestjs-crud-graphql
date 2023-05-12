import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
  // Inyección de dependencias
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  // Método para retornar los posts
  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    return posts;
  }

  // Método para crear un nuevo post
  // Implementando un DTO
  createPost(post: CreatePostInput): Promise<Post> {
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }
}
