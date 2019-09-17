import * as yup from 'yup';
import moment from 'moment';
import { i18n } from '@/i18n';
import GenericField from '@/shared/fields/generic-field';

export default class DateField extends GenericField {
  constructor(name, label, { required = false } = {}) {
    super(name, label);

    this.required = required;
  }

  forPresenter(value) {
    return value;
  }

  forFilterCast() {
    return yup
      .mixed()
      .nullable(true)
      .label(this.label)
      .transform((value) =>
        value ? moment(value).format('YYYY-MM-DD') : null,
      );
  }

  forFormRules() {
    const output = [];

    if (this.required) {
      output.push({
        required: true,
        message: i18n('validation.mixed.required').replace(
          '${path}',
          this.label,
        ),
      });
    }

    return output;
  }

  forFilterRules() {
    return undefined;
  }

  forFormInitialValue(value) {
    return value ? moment(value, 'YYYY-MM-DD') : null;
  }

  forFormCast() {
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(this.label)
      .transform((value) =>
        value ? moment(value).format('YYYY-MM-DD') : null,
      );

    return yupChain;
  }

  forExport() {
    return yup.mixed().label(this.label);
  }

  forImport() {
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(this.label)
      .test(
        'is-date',
        i18n('validation.mixed.default'),
        (value) => {
          if (!value) {
            return true;
          }

          return moment(value, 'YYYY-MM-DD').isValid();
        },
      );

    if (this.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  }
}
