export interface RequestQuery {
  page: number;
  pageSize: number;
  name: string;
  [key: string]: number | string;
}
