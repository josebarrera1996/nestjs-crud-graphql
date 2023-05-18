import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  // Inyección de dependencias
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  // Método para crear un nuevo 'author'
  // Implementando un DTO
  createAuthor(author: CreateAuthorInput): Promise<Author> {
    const newAuthor = this.authorsRepository.create(author);
    return this.authorsRepository.save(newAuthor);
  }

  // Método para retornar todos los 'authors'
  async findAll(): Promise<Author[]> {
    const authors = this.authorsRepository.find();
    return authors;
  }

  // Método para retornar un 'author' en específico (gracias a su ID)
  async findById(id: number): Promise<Author> {
    return this.authorsRepository.findOne({
      where: {
        id,
      },
    });
  }

  // Método para actualizar un 'author' en específico (gracias a su ID)
  async update(id: number, data: UpdateAuthorInput): Promise<Author> {
    const author = await this.authorsRepository.findOne({
      where: {
        id,
      },
    });

    await this.authorsRepository.update(author.id, { ...data });
    const authorUpdated = this.authorsRepository.create({ ...author, ...data });
    return authorUpdated;
  }

  // Método para eliminar a un 'author' en específico (gracias a su ID)
  async deleteAuthor(id: number): Promise<boolean> {
    const author = await this.authorsRepository.delete(id);
    if (author) {
      return true;
    }
    return false;
  }
}
