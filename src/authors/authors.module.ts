import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])], // Integrando TypeORM
  providers: [AuthorsResolver, AuthorsService],
  exports: [AuthorsService], // Exportando este servicio
})
export class AuthorsModule {}
