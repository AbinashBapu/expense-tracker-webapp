import { useFetch } from "@/hooks/useFetch";
import { postponeWithTracking } from "next/dist/server/app-render/dynamic-rendering";

const useFinance = () => {
  const { get, post, put, del, postWithQueryParams } = useFetch();

  const fetchParties = async () => {
    try {
      const financeData = await get(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/party`
      );
      return financeData?.data??[];
    } catch (error) {
      console.error("Error fetching category data:", error);
      return [];
    }
  };

  const createAParty = async (data: any) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/party`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const saveTransaction = async (data: any) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/transactions`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const saveAllTransactions = async (data: any) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/transactions/saveAll`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Please retry after sometime.", error);
    }
  };

  const fetchTransactions = async (data: any, config?: RequestInit) => {
    try {
      const response = await postWithQueryParams(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/transactions/search`,
        data.filters,
        {
          page: data.page,
          size: data.size,
          sortBy: data.sortBy,
          direction: data.direction,
        },
        config
      );
      return response?.data ?? {
        content: [],
        totalElements: 0,
        totalPages: 0,
        numberOfElements: 0,
      };;
    } catch (error) {
      console.error("Error fetching category data:", error);
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        numberOfElements: 0,
      };
    }
  };

  const saveInvestmentPortfolio = async (data: any) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/portfolio`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  /**
   * Fetches the investment growth values based on the given filters.
   * @param {any} data - The filters to be applied to the query.
   * @returns {Promise<{content: any[], totalElements: number, totalPages: number, numberOfElements: number}>}
   * The promise resolves with an object containing the fetched data and metadata.
   * The object will have the following structure:
   * {
   *   content: any[],
   *   totalElements: number,
   *   totalPages: number,
   *   numberOfElements: number
   * }
   */
  const fetchInvestmentGrowthValues = async (data: any) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/portfolio/search`,
        data
      );
      return response?.data ??  {
        content: [],
        totalElements: 0,
        totalPages: 0,
        numberOfElements: 0,
      };;
    } catch (error) {
      console.error("Error fetching category data:", error);
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        numberOfElements: 0,
      };
    }
  };
  const fetchInvestmentGrothAnalysisDtails = async (data: any) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/portfolio/growthAnalysis`,
        data
      );
      return response.data ?? [];
    } catch (error) {
      console.error("Error fetching category data:", error);
      return [];
    }
  };

  return {
    fetchParties,
    createAParty,
    saveTransaction,
    fetchTransactions,
    saveInvestmentPortfolio,
    fetchInvestmentGrowthValues,
    saveAllTransactions,
    fetchInvestmentGrothAnalysisDtails,
  };
};

export { useFinance };
