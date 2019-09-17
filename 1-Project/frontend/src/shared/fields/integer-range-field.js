import * as yup from 'yup';
import GenericField from '@/shared/fields/generic-field';
import { i18n } from '@/i18n';

export default class IntegerRangeField extends GenericField {
  forFilterInitialValue(value) {
    return value || [undefined, undefined];
  }

  forFilterRules() {
    const output = [];

    const integerRangeValidator = yup
      .array()
      .ensure()
      .compact()
      .of(
        yup
          .number()
          .integer()
          .nullable(true)
          .label(this.label),
      )
      .label(this.label);

    const integerRangeFn = (rule, value, callback) => {
      if (!value) {
        callback();
        return;
      }

      try {
        integerRangeValidator.validateSync(value);
        callback();
      } catch (error) {
        callback(
          new Error(
            i18n('validation.number.integer').replace(
              '${path}',
              this.label,
            ),
          ),
        );
      }
    };

    output.push({
      validator: integerRangeFn,
    });

    return output;
  }

  forFilterCast() {
    return yup
      .array()
      .ensure()
      .compact()
      .of(
        yup
          .number()
          .integer()
          .nullable(true)
          .label(this.label),
      )
      .label(this.label);
  }
}
