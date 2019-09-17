import * as yup from 'yup';
import GenericField from '@/shared/fields/generic-field';
import { i18n } from '@/i18n';
import { isInteger } from 'lodash';

export default class IntegerField extends GenericField {
  constructor(
    name,
    label,
    {
      required = false,
      min = undefined,
      max = undefined,
    } = {},
  ) {
    super(name, label);

    this.required = required;
    this.min = min;
    this.max = max;
  }

  forPresenter(value) {
    return value;
  }

  forFormInitialValue(value) {
    return value;
  }

  forFilterInitialValue(value) {
    return value;
  }

  forFilterRules() {
    return undefined;
  }

  forFilterCast() {
    return yup
      .number()
      .integer()
      .nullable(true)
      .label(this.label);
  }

  forFormCast() {
    let yupChain = yup
      .number()
      .integer()
      .nullable(true)
      .label(this.label);

    return yupChain;
  }

  forFormRules() {
    const output = [];

    const integerFn = (rule, value, callback) => {
      if (!value) {
        callback();
        return;
      }

      if (isInteger(value)) {
        callback();
        return;
      }

      callback(
        new Error(
          i18n('validation.number.integer').replace(
            '${path}',
            this.label,
          ),
        ),
      );
    };

    output.push({
      validator: integerFn,
    });

    if (this.required) {
      output.push({
        type: 'number',
        required: !!this.required,
        message: i18n('validation.mixed.required').replace(
          '${path}',
          this.label,
        ),
      });
    }

    if (this.min || this.min === 0) {
      output.push({
        type: 'number',
        min: this.min,
        message: i18n('validation.number.min')
          .replace('${path}', this.label)
          .replace('${min}', this.min),
      });
    }

    if (this.max || this.max === 0) {
      output.push({
        type: 'number',
        max: this.max,
        message: i18n('validation.number.max')
          .replace('${path}', this.label)
          .replace('${max}', this.max),
      });
    }

    return output;
  }

  forExport() {
    return yup.mixed().label(this.label);
  }

  forImport() {
    let yupChain = yup
      .number()
      .integer()
      .nullable(true)
      .label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }

    if (this.min || this.min === 0) {
      yupChain = yupChain.min(this.min);
    }

    if (this.max) {
      yupChain = yupChain.max(this.max);
    }

    return yupChain;
  }
}
