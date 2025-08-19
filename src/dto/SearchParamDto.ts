export interface SearchParamDto {
  fromDate: string | null;
  toDate: string | null;
}

export interface ReportFilter {
  duration: string;
  startDate: string | null;
  endDate: string | null;
}
