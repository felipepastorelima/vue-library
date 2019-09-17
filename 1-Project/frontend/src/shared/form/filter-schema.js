import * as yup from 'yup';
import { values as _values } from 'lodash';

export class FilterSchema {
  fields;

  constructor(fields) {
    this.fields = fields;
  }

  initialValues(record = {}, queryParams = {}) {
    queryParams = queryParams || {};
    record = record || {};

    const hasFilterFromQuery = _values(queryParams).some(
      (filterValue) => !!filterValue,
    );

    if (hasFilterFromQuery) {
      record = queryParams;
    }

    const casted = {};

    for (const field of this.fields) {
      casted[field.name] = field.forFilterInitialValue(
        record[field.name],
      );
    }

    return casted;
  }

  rules() {
    const rules = {};

    this.fields.forEach((field) => {
      rules[field.name] = field.forFilterRules();
    });

    return rules;
  }

  castSchema() {
    const shape = {};

    this.fields.forEach((field) => {
      shape[field.name] = field.forFilterCast();
    });

    return yup.object().shape(shape);
  }

  cast(values) {
    return this.castSchema().cast(values);
  }
}
