import MultipleSeariesChart from "@/components/feature/multipleSeriesChart";
import { useReport } from "@/hooks/useReport";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";

export default function IncomeSavingExpenseChart() {
  const { fetchDailyFinanceSummary } = useReport();

  const {
    data: financeDailySummaryData,
    isLoading: isFinanceDailySummaryLoading,
    error: financeDailySummaryError,
    refetch: financeDailySummaryRefetch,
    isFetching: isFinanceDailySummaryFetching,
  } = useQuery({
    queryKey: ["financeDailySummary"],
    queryFn: () => fetchDailyFinanceSummary(),
  });

  return (
    <>
      {isFinanceDailySummaryLoading ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : (
        <MultipleSeariesChart
          title="Income Vs Saving Vs Expense"
          data={financeDailySummaryData}
        />
      )}
    </>
  );
}
