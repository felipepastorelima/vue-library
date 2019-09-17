import * as yup from 'yup';
import GenericField from '@/shared/fields/generic-field';
import { i18n } from '@/i18n';

export default class FilesField extends GenericField {
  constructor(
    name,
    label,
    path,
    {
      required = false,
      min = undefined,
      max = undefined,
      size = undefined,
      formats = undefined,
    } = {},
  ) {
    super(name, label);

    this.path = path;
    this.required = required;
    this.min = min;
    this.max = max;
    this.size = size;
    this.formats = formats;
  }

  forPresenter(value) {
    return value || [];
  }

  forFormInitialValue(value) {
    return value || [];
  }

  forFormRules() {
    const output = [];

    if (this.required) {
      output.push({
        type: 'array',
        required: !!this.required,
        message: i18n('validation.mixed.required').replace(
          '${path}',
          this.label,
        ),
      });
    }

    if (this.min || this.min === 0) {
      output.push({
        type: 'array',
        min: this.min,
        message: i18n('validation.array.min')
          .replace('${path}', this.label)
          .replace('${min}', this.min),
      });
    }

    if (this.max || this.max === 0) {
      output.push({
        type: 'array',
        max: this.max,
        message: i18n('validation.array.max')
          .replace('${path}', this.label)
          .replace('${max}', this.max),
      });
    }

    return output;
  }

  forFormCast() {
    let yupChain = yup
      .array()
      .nullable(true)
      .label(this.label);

    return yupChain;
  }

  forExport() {
    return yup
      .mixed()
      .label(this.label)
      .transform((value, originalValue) => {
        if (!originalValue || !originalValue.length) {
          return null;
        }

        return originalValue
          .map((value) => value.publicUrl)
          .join(' ');
      });
  }

  forImport() {
    let yupChain = yup
      .array()
      .compact()
      .ensure()
      .label(this.label)
      .nullable(true)
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null;
        }

        if (Array.isArray(originalValue)) {
          return originalValue;
        }

        return originalValue
          .trim()
          .split(' ')
          .map((value) => {
            return {
              name: value.trim(),
              publicUrl: value.trim(),
              new: true,
            };
          });
      });

    if (this.required || this.min) {
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

  get fileSchema() {
    return {
      size: this.size,
      formats: this.formats,
    };
  }
}
