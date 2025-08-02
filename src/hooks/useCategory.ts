import { useFetch } from "@/hooks/useFetch";

const useCategory = () => {
  const { get } = useFetch();

  const fetchCategoryData = async () => {
    try {
      const categoryData = await get("/api/category");
      return categoryData;
    } catch (error) {
      console.error("Error fetching category data:", error);
      return null;
    }
  };

  return { fetchCategoryData };
};

export { useCategory };
