export class PaginationMetaData{
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;

  constructor(page: number, pageSize: number, totalItems: number, totalPages: number) {
    this.page = page;
    this.pageSize = pageSize;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
  }
}