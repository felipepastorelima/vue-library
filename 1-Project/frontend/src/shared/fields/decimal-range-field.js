import * as yup from 'yup';
import GenericField from '@/shared/fields/generic-field';
import { i18n } from '@/i18n';

export default class DecimalRangeField extends GenericField {
  forFilterInitialValue(value) {
    return value || [undefined, undefined];
  }

  forFilterRules() {
    const output = [];

    const decimalRangeValidator = yup
      .array()
      .ensure()
      .compact()
      .of(
        yup
          .number()
          .nullable(true)
          .label(this.label),
      )
      .label(this.label);

    const decimalRangeFn = (rule, value, callback) => {
      if (!value) {
        callback();
        return;
      }

      try {
        decimalRangeValidator.validateSync(value);
        callback();
      } catch (error) {
        callback(
          new Error(
            i18n('validation.number.invalid').replace(
              '${path}',
              this.label,
            ),
          ),
        );
      }
    };

    output.push({
      validator: decimalRangeFn,
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
          .nullable(true)
          .label(this.label),
      )
      .label(this.label);
  }
}
