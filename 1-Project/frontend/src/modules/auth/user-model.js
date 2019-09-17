import StringArrayField from '@/shared/fields/string-array-field';
import * as yup from 'yup';
import Roles from '@/security/roles';
import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import StringField from '@/shared/fields/string-field';
import BooleanField from '@/shared/fields/boolean-field';
import ImagesField from '@/shared/fields/images-field';
import DateTimeField from '@/shared/fields/date-time-field';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import GenericField from '@/shared/fields/generic-field';
import EnumeratorField from '@/shared/fields/enumerator-field';
import { GenericModel } from '@/shared/model/generic-model';

class RolesField extends StringArrayField {
  constructor(name, label, config) {
    super(name, label, config);

    this.options = Roles.selectOptions;
  }

  forExport() {
    return yup
      .mixed()
      .label(this.label)
      .transform((values) =>
        values
          ? values
              .map((value) => Roles.labelOf(value))
              .join(' ')
          : null,
      );
  }
}

class EmailsField extends StringArrayField {
  forFormRules() {
    let yupValidator = yup
      .array()
      .label(this.label)
      .of(
        yup
          .string()
          .email(i18n('user.validations.email'))
          .label(i18n('user.fields.email'))
          .max(255)
          .required(),
      );

    if (this.required) {
      yupValidator = yupValidator.required();
    }

    const validator = (rule, value, callback) => {
      try {
        yupValidator.validateSync(value);
        callback();
      } catch (error) {
        callback(error);
      }
    };

    return [{ validator }];
  }
}

function label(name) {
  return i18n(`user.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  firstName: new StringField(
    'firstName',
    label('firstName'),
    {
      max: 80,
    },
  ),
  authenticationUid: new StringField(
    'authenticationUid',
    label('authenticationUid'),
  ),
  lastName: new StringField('lastName', label('lastName'), {
    max: 175,
  }),
  password: new StringField('password', label('password'), {
    required: true,
  }),
  fullName: new StringField('fullName', label('fullName')),
  email: new StringField('email', label('email'), {
    required: true,
    max: 255,
  }),
  role: new EnumeratorField(
    'role',
    label('role'),
    Roles.selectOptions,
  ),
  rememberMe: new BooleanField(
    'rememberMe',
    label('rememberMe'),
  ),
  disabledAsStatus: new BooleanField(
    'disabled',
    label('status'),
    {
      noLabel: i18n('user.enabled'),
      yesLabel: i18n('user.disabled'),
    },
  ),
  disabled: new BooleanField(
    'disabled',
    label('disabled'),
    {
      noLabel: i18n('user.enabled'),
      yesLabel: i18n('user.disabled'),
    },
  ),
  phoneNumber: new StringField(
    'phoneNumber',
    label('phoneNumber'),
    {
      matches: /^[0-9]/,
      max: 24,
    },
  ),
  avatarsIam: new ImagesField(
    'avatars',
    label('avatars'),
    'user/avatars/iam',
    { max: 1 },
  ),
  avatarsProfile: new ImagesField(
    'avatars',
    label('avatars'),
    (id) => `user/avatars/profile/${id}`,
    { max: 1 },
  ),
  emails: new EmailsField('emails', label('emails'), {
    required: true,
  }),
  rolesRequired: new RolesField('roles', label('roles'), {
    required: true,
  }),
  roles: new RolesField('roles', label('roles')),
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
  roleUser: new GenericField('roleUser', label('roleUser')),
  status: new EnumeratorField('status', label('status'), [
    {
      id: 'enabled',
      label: i18n('user.enabled'),
    },
    {
      id: 'disabled',
      label: i18n('user.disabled'),
    },
  ]),
};

export class UserModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
