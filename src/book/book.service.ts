import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { CreateBookDto } from './dto/CreateBookDto';
import { Book, BookDocument } from './schemas/book.schema';
import { serviceInfo } from './types/serviceTypes';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async createBook(data: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return await book.save();
  }

  public async findAllBooks(): Promise<BookDocument[]> {
    return this.BookModel.find();
  }

  public async findBook(id: string): Promise<BookDocument | serviceInfo> {
    const book = this.BookModel.findById(id);
    if (book) {
      return book;
    } else {
      return {
        status: 'error',
        message: 'The Book with this id was not found',
      };
    }
  }

  public async updateBook(
    id: string,
    data: any,
  ): Promise<BookDocument | serviceInfo> {
    const book = await this.BookModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (book) {
      return book;
    } else {
      return {
        status: 'error',
        message: 'The Book with this id was not found',
      };
    }
  }

  public async deleteBook(id: string): Promise<serviceInfo> {
    await this.BookModel.deleteOne({ _id: id });
    return {
      status: 'ok',
      message: 'Book successfully deleted!',
    };
  }
}
