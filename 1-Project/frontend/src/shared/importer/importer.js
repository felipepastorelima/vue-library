import XLSX from 'xlsx';
import { ImporterSchema } from '@/shared/importer/importer-schema';
import { Excel } from '@/shared/excel/excel';
import { i18n } from '@/i18n';

export default class Importer {
  constructor(fields) {
    this.schema = new ImporterSchema(fields);
  }

  downloadTemplate(templateFileName) {
    return Excel.exportAsExcelFile(
      [],
      this.schema.labels,
      templateFileName,
    );
  }

  async castForDisplay(row, index) {
    return this.schema.castForDisplay(row, index);
  }

  async castForImport(row) {
    return this.schema.castForImport(row);
  }

  async convertExcelFileToJson(file, skipHeader = true) {
    const workbook = await this._convertExcelFileToWorkbook(
      file,
    );

    const json = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]],
      {
        header: 1,
        blankrows: false,
        range: skipHeader ? 1 : undefined,
        raw: true,
      },
    );

    return json;
  }

  async _convertExcelFileToWorkbook(file) {
    try {
      const data = await this._readFile(file);
      return XLSX.read(data, {
        type: 'array',
      });
    } catch (error) {
      throw new Error(
        i18n('importer.errors.invalidFileUpload'),
      );
    }
  }

  async _readFile(file) {
    if (!file) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject();
      };

      reader.readAsArrayBuffer(file);
    });
  }
}
