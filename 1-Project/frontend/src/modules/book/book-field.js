import { BookService } from '@/modules/book/book-service';
import RelationToOneField from '@/shared/fields/relation-to-one-field';
import RelationToManyField from '@/shared/fields/relation-to-many-field';
import Permissions from '@/security/permissions';

export class BookField {
  static relationToOne(name, label, options) {
    return new RelationToOneField(
      name,
      label,
      '/book',
      Permissions.values.bookRead,
      BookService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.isbn,
        };
      },
      options,
    );
  }

  static relationToMany(name, label, options) {
    return new RelationToManyField(
      name,
      label,
      '/book',
      Permissions.values.bookRead,
      BookService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.isbn,
        };
      },
      options,
    );
  }
}
