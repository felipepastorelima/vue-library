import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import { GenericModel } from '@/shared/model/generic-model';
import EnumeratorField from '@/shared/fields/enumerator-field';
import { BookField } from '@/modules/book/book-field';
import { UserField } from '@/modules/auth/user-field';

function label(name) {
  return i18n(`entities.loan.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.loan.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  book: BookField.relationToOne('book', label('book'), {
    "required": true
  }),
  member: UserField.relationToOne('member', label('member'), {
    "required": true
  }),
  issueDate: new DateTimeField('issueDate', label('issueDate'), {
    "required": true
  }),
  dueDate: new DateTimeField('dueDate', label('dueDate'), {
    "required": true
  }),
  returnDate: new DateTimeField('returnDate', label('returnDate'), {}),
  status: new EnumeratorField('status', label('status'), [
    { id: 'inProgress', label: enumeratorLabel('status', 'inProgress') },
    { id: 'overdue', label: enumeratorLabel('status', 'overdue') },
    { id: 'closed', label: enumeratorLabel('status', 'closed') },
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
  issueDateRange: new DateTimeRangeField(
    'issueDateRange',
    label('issueDateRange'),
  ),
  dueDateRange: new DateTimeRangeField(
    'dueDateRange',
    label('dueDateRange'),
  ),
  returnDateRange: new DateTimeRangeField(
    'returnDateRange',
    label('returnDateRange'),
  ),
};

export class LoanModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
