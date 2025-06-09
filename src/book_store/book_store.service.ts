import { Injectable } from "@nestjs/common";
import { CreateBookStoreDto } from "./dto/create-book_store.dto";
import { UpdateBookStoreDto } from "./dto/update-book_store.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BookStore } from "./entities/book_store.entity";
import { Repository } from "typeorm";
import { Address } from "../address/entities/address.entity";

@Injectable()
export class BookStoreService {
  constructor(
    @InjectRepository(BookStore)
    private readonly bookStoreRepository: Repository<BookStore>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) {}

  async create(createBookStoreDto: CreateBookStoreDto) {
    const address = await this.addressRepository.findOne({
      where: { id: createBookStoreDto.addressId },
    });
    if (address) {
      return this.bookStoreRepository.save(createBookStoreDto);
    }
    throw new Error("Address not found");
  }

  findAll() {
    return this.bookStoreRepository.find({
      relations: ["address"],
    });
  }

  findOne(id: number) {
    return this.bookStoreRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBookStoreDto: UpdateBookStoreDto) {
    const address = await this.addressRepository.findOne({
      where: { id: updateBookStoreDto.addressId },
    });
    if (address) {
      return this.bookStoreRepository.update(id, updateBookStoreDto);
    }

    throw new Error("Address not found");
  }

  remove(id: number) {
    return this.bookStoreRepository.delete(id);
  }
}
