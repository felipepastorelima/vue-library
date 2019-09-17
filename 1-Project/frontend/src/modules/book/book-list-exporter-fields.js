import { BookModel } from '@/modules/book/book-model';

const { fields } = BookModel;

export default [
  fields.id,
  fields.isbn,
  fields.title,
  fields.author,
  fields.numberOfCopies,
  fields.stock,
  fields.images,
  fields.status,
  fields.createdAt
];
