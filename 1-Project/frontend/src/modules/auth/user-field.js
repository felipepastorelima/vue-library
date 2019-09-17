import RelationToOneField from '@/shared/fields/relation-to-one-field';
import { IamService } from '@/modules/iam/iam-service';
import RelationToManyField from '@/shared/fields/relation-to-many-field';
import Permissions from '@/security/permissions';

export class UserField {
  static relationToOne(name, label, options) {
    return new RelationToOneField(
      name,
      label,
      '/iam',
      Permissions.values.iamRead,
      IamService.fetchUserAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        let label = record.email;

        if (record.fullName) {
          label = `${record.fullName} <${record.email}>`;
        }

        return {
          id: record.id,
          label,
        };
      },
      options,
    );
  }

  static relationToMany(name, label, options) {
    return new RelationToManyField(
      name,
      label,
      '/iam',
      Permissions.values.iamRead,
      IamService.fetchUserAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        let label = record.email;

        if (record.fullName) {
          label = `${record.fullName} <${record.email}>`;
        }

        return {
          id: record.id,
          label,
        };
      },
      options,
    );
  }
}
