import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  // Método para reteornar los posts
  findAll(): Post[] {
    return [
      {
        id: 1,
        title: 'Hello World',
        content: 'This is a sample post',
      },
    ];
  }
}
