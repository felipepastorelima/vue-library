import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import { GenericModel } from '@/shared/model/generic-model';
import IntegerField from '@/shared/fields/integer-field';
import IntegerRangeField from '@/shared/fields/integer-range-field';
import StringField from '@/shared/fields/string-field';
import EnumeratorField from '@/shared/fields/enumerator-field';
import ImagesField from '@/shared/fields/images-field';

function label(name) {
  return i18n(`entities.book.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.book.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  isbn: new StringField('isbn', label('isbn'), {
    "required": true,
    "max": 13,
    "min": 13
  }),
  title: new StringField('title', label('title'), {
    "required": true,
    "max": 255
  }),
  author: new StringField('author', label('author'), {
    "required": true,
    "max": 255
  }),
  numberOfCopies: new IntegerField('numberOfCopies', label('numberOfCopies'), {
    "required": true,
    "min": 1
  }),
  stock: new IntegerField('stock', label('stock'), {}),
  images: new ImagesField('images', label('images'), 'book/images',{
    "max": 3,
    "size": 3000000
  }),
  status: new EnumeratorField('status', label('status'), [
    { id: 'available', label: enumeratorLabel('status', 'available') },
    { id: 'unavailable', label: enumeratorLabel('status', 'unavailable') },
  ],{}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
  numberOfCopiesRange: new IntegerRangeField(
    'numberOfCopiesRange',
    label('numberOfCopiesRange'),
  ),
  stockRange: new IntegerRangeField(
    'stockRange',
    label('stockRange'),
  ),
};

export class BookModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
