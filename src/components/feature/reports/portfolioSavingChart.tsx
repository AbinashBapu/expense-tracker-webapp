import MultipleSeariesChart from "@/components/feature/multipleSeriesChart";
import { useReport } from "@/hooks/useReport";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";

export default function PortfolioSavingChart() {
  const { fetchDailyPortfolioSummary } = useReport();

  const {
    data: financeDailySummaryData,
    isLoading: isFinanceDailySummaryLoading,
    error: financeDailySummaryError,
    refetch: financeDailySummaryRefetch,
    isFetching: isFinanceDailySummaryFetching,
  } = useQuery({
    queryKey: ["dailyPortfolioSummary"],
    queryFn: () => fetchDailyPortfolioSummary(),
  });

  return (
    <>
      {isFinanceDailySummaryLoading ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : (
        <MultipleSeariesChart
          title="Portfolio Saving Analysis"
          data={financeDailySummaryData}
        />
      )}
    </>
  );
}
