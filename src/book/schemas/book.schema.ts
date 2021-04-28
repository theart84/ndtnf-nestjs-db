import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  public title: String;

  @Prop()
  public description: String;

  @Prop({ required: true })
  public authors: [String];

  @Prop()
  public favorite: String;

  @Prop()
  public fileCover: String;

  @Prop()
  public fileName: String;

  @Prop()
  public fileBook: String;
}

export const BookSchema = SchemaFactory.createForClass(Book);
