import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  // Inyección de dependencias
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private authorsService: AuthorsService,
  ) {}

  // Método para retornar los posts
  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    return posts;
  }

  // Método para retornar a un post en específico (gracias a su ID)
  async findById(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: {
        id,
      },
    });
  }

  // Método para traer los datos de un author en específico (gracias a su ID)
  async getAuthor(authorId: number): Promise<Author> {
    return await this.authorsService.findById(authorId);
  }

  // Método para crear un nuevo post
  // Implementando un DTO
  createPost(post: CreatePostInput): Promise<Post> {
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  // Método para actualizar un post en específico (gracias a su ID)
  async updatePost(id: number, data: UpdatePostInput): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    await this.postsRepository.update(post.id, { ...data });
    const postUpdated = this.postsRepository.create({ ...post, ...data });
    return postUpdated;
  }

  // Método para eliminar a un post en específico (gracias a su ID)
  async deletePost(id: number): Promise<boolean> {
    const post = await this.postsRepository.delete(id);
    if (post) {
      return true;
    }
    return false;
  }
}
