import * as yup from 'yup';
import GenericField from '@/shared/fields/generic-field';
import moment from 'moment';

export default class DateRangeField extends GenericField {
  forFilterInitialValue(value) {
    return value || [];
  }

  forFilterRules() {
    return undefined;
  }

  forFilterCast() {
    return yup.mixed().transform((value, originalValue) => {
      if (!originalValue) {
        return originalValue;
      }

      if (!originalValue.length) {
        return originalValue;
      }

      return originalValue.map((value) => {
        return value ? moment(value).format('YYYY-MM-DD') : null;
      });
    });
  }
}
