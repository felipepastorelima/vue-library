import importerStore from '@/shared/importer/importer-store';
import { BookService } from '@/modules/book/book-service';
import bookImporterFields from '@/modules/book/book-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  BookService.import,
  bookImporterFields,
  i18n('entities.book.importer.fileName'),
  i18n('entities.book.importer.hint'),
);
