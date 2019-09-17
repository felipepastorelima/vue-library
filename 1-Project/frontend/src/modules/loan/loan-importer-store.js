import importerStore from '@/shared/importer/importer-store';
import { LoanService } from '@/modules/loan/loan-service';
import loanImporterFields from '@/modules/loan/loan-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  LoanService.import,
  loanImporterFields,
  i18n('entities.loan.importer.fileName'),
  i18n('entities.loan.importer.hint'),
);
