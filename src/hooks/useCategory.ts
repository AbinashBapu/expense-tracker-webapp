import { useFetch } from "@/hooks/useFetch";

const useCategory = () => {
  const { get, post, put, del } = useFetch();

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

    const fetchTypes = async () => {
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


  const saveCategory = async (data: any) => {
    try {
      const response = await post(
        `${process.env.NEXT_PUBLIC_BASEPATH_URL}/${process.env.NEXT_PUBLIC_V1API}/${process.env.NEXT_PUBLIC_CLASSIFFICATION_SERVICE}/category`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  return { fetchCategoryData,fetchTypes,saveCategory };
};

export { useCategory };
