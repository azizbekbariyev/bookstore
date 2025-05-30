import { Injectable } from "@nestjs/common";
import { CreateBookAuthorDto } from "./dto/create-book_author.dto";
import { UpdateBookAuthorDto } from "./dto/update-book_author.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BookAuthor } from "./entities/book_author.entity";
import { Repository } from "typeorm";
import { Book } from "../books/entities/book.entity";
import { Author } from "../authors/entities/author.entity";

@Injectable()
export class BookAuthorService {
  constructor(
    @InjectRepository(BookAuthor)
    private readonly bookAuthorRepository: Repository<BookAuthor>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>
  ) {}

  async create(createBookAuthorDto: CreateBookAuthorDto) {
    const book = await this.bookRepository.findOne({
      where: { id: createBookAuthorDto.bookId },
    });
    const author = await this.authorRepository.findOne({
      where: { id: createBookAuthorDto.authorId },
    });
    if (book && author) {
      return this.bookAuthorRepository.save({
        book: book,
        author: author,
        ...createBookAuthorDto,
      });
    }
    throw new Error("Book or Author not found");
  }

  findAll() {
    return this.bookAuthorRepository.find(
      {
        relations: ['book', 'author'],
      }
    );
  }

  findOne(id: number) {
    return this.bookAuthorRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateBookAuthorDto: UpdateBookAuthorDto) {
    const book = this.bookRepository.findOne({
      where: { id: updateBookAuthorDto.bookId },
    });
    const author = this.authorRepository.findOne({
      where: { id: updateBookAuthorDto.authorId },
    });
    if (!book && !author) {
      return this.bookAuthorRepository.update(
        { id },
        { book: book, author: author, ...updateBookAuthorDto }
      );
    }
    throw new Error("Book or Author not found");
  }

  remove(id: number) {
    return this.bookAuthorRepository.delete({ id });
  }
}
