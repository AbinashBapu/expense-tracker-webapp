import { Dayjs } from "dayjs";

interface SearchParamDto {
  fromDate: string | null;
  toDate: string | null;
  categoryId: string | null;
  subCategoryId: string | null;
  transactionType: string | null;
}
interface InvestmentSearchDto {
  page: number;
  size: number;
  sortBy: string;
  direction: "asc" | "desc";
  asOfDate: string | null;
  subCategoryId: string | null;
}

export type { SearchParamDto, InvestmentSearchDto };
