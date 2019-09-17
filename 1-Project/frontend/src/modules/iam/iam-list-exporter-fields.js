import { UserModel } from '@/modules/auth/user-model';

const { fields } = UserModel;

export default [
  fields.id,
  fields.email,
  fields.fullName,
  fields.phoneNumber,
  fields.avatarsIam,
  fields.roles,
  fields.disabled,
  fields.createdAt,
];
