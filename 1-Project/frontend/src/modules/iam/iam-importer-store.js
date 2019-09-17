import importerStore from '@/shared/importer/importer-store';
import { IamService } from '@/modules/iam/iam-service';
import iamImporterFields from '@/modules/iam/iam-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  IamService.import,
  iamImporterFields,
  i18n('iam.importer.fileName'),
  i18n('iam.importer.hint'),
);
