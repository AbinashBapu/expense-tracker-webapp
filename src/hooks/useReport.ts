import { SearchParamDto } from "@/dto/SearchParamDto";
import { useFetch } from "@/hooks/useFetch";

const useReport = () => {
  const { get, post, put, del, postWithQueryParams } = useFetch();

  const fetchFinanceSummary = async (data: SearchParamDto) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/report/summary`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching summary data:", error);
      return error;
    }
  };

  const fetchFinanceSummaryForSplineChart = async (data: SearchParamDto) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/report/splineChartSummary`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching summary data:", error);
      return {
        categories: [],
        incomes: [],
        expense: [],
        saving: [],
      };
    }
  };

  const fetchFinanceSummaryForDonutChartBasedOnCategory = async (
    data: SearchParamDto
  ) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/report/categorySubcategoryDonutChartSummary`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching summary data:", error);
      return {
        categories: [],
        incomes: [],
        expense: [],
        saving: [],
      };
    }
  };

  const fetchExpenseInsights = async () => {
    try {
      const financeData = await get(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/report/expenseInsights`
      );
      return  financeData?.data??[];
    } catch (error) {
      console.error("Error fetching category data:", error);
      return [];
    }
  };

  const fetchExpensesByParty = async (data: SearchParamDto) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/report/expensesByParty`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching summary data:", error);
      return [];
    }
  };

  const fetchExpensesByCategory = async (data: SearchParamDto) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/report/expensesByCategory`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching summary data:", error);
      return [];
    }
  };

  const fetchDailyFinanceSummary = async () => {
    try {
      const financeData = await get(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/report/dailyFinanceSummary`
      );
      return financeData?.data??{};
    } catch (error) {
      console.error("Error fetching category data:", error);
      return [];
    }
  };

  const fetchDailyPortfolioSummary = async () => {
    try {
      const financeData = await get(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/report/dailyPortfolioSummary`
      );
      return financeData?.data??[];
    } catch (error) {
      console.error("Error fetching category data:", error);
      return [];
    }
  };

  const fetchPortfolioSavingByCategory = async (data: any) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/report/portfolioSavingByCategory`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching summary data:", error);
      return [];
    }
  };

  return {
    fetchFinanceSummary,
    fetchFinanceSummaryForSplineChart,
    fetchFinanceSummaryForDonutChartBasedOnCategory,
    fetchExpenseInsights,
    fetchExpensesByParty,
    fetchExpensesByCategory,
    fetchDailyFinanceSummary,
    fetchDailyPortfolioSummary,
    fetchPortfolioSavingByCategory,
  };
};

export { useReport };
