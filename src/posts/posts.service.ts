import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

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
}
