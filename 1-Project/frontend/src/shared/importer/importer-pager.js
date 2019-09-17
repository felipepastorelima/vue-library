import { sortBy } from 'lodash';

export class ImporterPager {
  sortData = null;
  pageSize = 10;
  currentPage = 1;

  constructor() {}

  sortChange(sortData) {
    this.sortData = sortData || null;
  }

  pageSizeChange(pageSizeData) {
    this.pageSize = pageSizeData || 10;
  }

  slice(list) {
    const currentPageToSlice = this.currentPage - 1;
    return list.slice(
      currentPageToSlice * this.pageSize,
      (currentPageToSlice + 1) * this.pageSize,
    );
  }

  sort(list) {
    if (
      !this.sortData ||
      !this.sortData.prop ||
      !this.sortData.order
    ) {
      return list;
    }

    if (this.sortData.order === 'descending') {
      return sortBy(list, [this.sortData.prop]).reverse();
    }

    return sortBy(list, [this.sortData.prop]);
  }

  sortedList(fullList) {
    return this.sort(fullList);
  }

  paginate(fullList) {
    return this.slice(this.sortedList(fullList));
  }
}
