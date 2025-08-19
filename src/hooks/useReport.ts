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
    }
  };

  return { fetchFinanceSummary };
};

export { useReport };
