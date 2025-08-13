import { useFetch } from "@/hooks/useFetch";

const useFinance = () => {
  const { get, post, put, del } = useFetch();

  const fetchParties = async () => {
    try {
      const financeData = await get(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/party`
      );
      return financeData.data;
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

  const fetchTransactions = async (data: any, config?: RequestInit) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_FINANCE_SERVICE}/transactions/search`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  return { fetchParties, createAParty, saveTransaction, fetchTransactions };
};

export { useFinance };
