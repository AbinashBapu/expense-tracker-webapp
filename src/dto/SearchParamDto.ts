import { Dayjs } from "dayjs";

export interface SearchParamDto {
  fromDate: string | null;
  toDate: string | null;
  categoryId: string | null;
  subCategoryId: string | null;
  transactionType: string | null;
}
