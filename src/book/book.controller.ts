import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/CreateBookDto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getBooks() {
    return this.bookService.findAllBooks();
  }

  @Get(':id')
  getBook() {
    return this.bookService.findBook('id')
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() data: any) {
    return this.bookService.updateBook(id, data);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
