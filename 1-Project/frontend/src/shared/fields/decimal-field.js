import * as yup from 'yup';
import GenericField from '@/shared/fields/generic-field';
import { i18n } from '@/i18n';

export default class DecimalField extends GenericField {
  constructor(
    name,
    label,
    {
      required = false,
      min = undefined,
      max = undefined,
      scale = undefined,
    } = {},
  ) {
    super(name, label);

    this.required = required;
    this.min = min;
    this.max = max;
    this.scale = scale;
  }

  forPresenter(value) {
    if (!value) {
      return value;
    }

    if (this.scale === undefined || this.scale === null) {
      return value;
    }

    return Number(value).toFixed(this.scale);
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
      .nullable(true)
      .label(this.label);
  }

  forFormCast() {
    let yupChain = yup
      .number()
      .nullable(true)
      .label(this.label);

    return yupChain;
  }

  forFormRules() {
    const output = [];

    output.push({
      type: 'number',
      message: i18n('validation.number.invalid').replace(
        '${path}',
        this.label,
      ),
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
    return yup
      .mixed()
      .label(this.label)
      .transform((value) => this.forPresenter(value));
  }

  forImport() {
    let yupChain = yup
      .number()
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
