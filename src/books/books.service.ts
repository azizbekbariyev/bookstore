import { Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./entities/book.entity";
import { Repository } from "typeorm";
import { Genre } from "../genre/entities/genre.entity";
import { BookStore } from "../book_store/entities/book_store.entity";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(BookStore)
    private readonly bookStoreRepository: Repository<BookStore>
  ) {}
  async create(createBookDto: CreateBookDto) {
    const genre = await this.genreRepository.findOne({
      where: { id: createBookDto.genreId },
    });

    const bookStore = await this.bookStoreRepository.findOne({
      where: { id: createBookDto.bookStoreId },
    });
    if (genre && bookStore) {
      return this.bookRepository.save(createBookDto);
    }

    throw new Error("Genre or BookStore not found");
  }

  findAll() {
    return this.bookRepository.find({
      relations: ["genre"],
    });
  }

  findOne(id: number) {
    return this.bookRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const genre = await this.genreRepository.findOne({
      where: { id: updateBookDto.genreId },
    });

    const bookStore = await this.bookStoreRepository.findOne({
      where: { id: updateBookDto.bookStoreId },
    });
    if (genre && bookStore) {
      return this.bookRepository.save(updateBookDto);
    }

    throw new Error("Genre or BookStore not found");
  }

  remove(id: number) {
    return this.bookRepository.delete({ id });
  }
}
