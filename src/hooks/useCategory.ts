import { useFetch } from "@/hooks/useFetch";

const useCategory = () => {
  const { get } = useFetch();

  const fetchCategoryData = async () => {
    try {
      const categoryData = await get(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_CLASSIFFICATION_SERVICE}/category`
      );
      return categoryData.data;
    } catch (error) {
      console.error("Error fetching category data:", error);
      return [];
    }
  };

  return { fetchCategoryData };
};

export { useCategory };
