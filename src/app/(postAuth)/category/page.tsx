// https://dribbble.com/shots/5450312-Expenses-Mileage-Tracker-Dashboard-Design-V2/attachments/1180110?mode=media
"use client";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Drawer,
  Typography,
} from "@mui/material";
import {  useState } from "react";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import { useCategory } from "@/hooks/useCategory";
import { CategoryDto, SubCategoryDto } from "@/dto/ClassificationDto";
import CreateSubCategoryForm from "@/components/feature/category/subCategoryForm";
import CreateCategoryForm from "@/components/feature/category/categoryForm";

export default function page() {
  const { fetchCategoryData, saveCategory, fetchTypes } = useCategory();
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const toggleSubCategoryDrawer = () => {
    setOpenSubCategory((prev) => !prev);
  };
  const toggleCategoryDrawer = () => {
    setOpenCategory((prev) => !prev);
  };

  const {
    data: types,
    isLoading: isLoadingTypes,
    error: typesError,
    refetch: refetchTypes,
  } = useQuery({
    queryKey: ["types"],
    queryFn: () => fetchTypes(),
  });

  const {
    data: categoryData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoryData(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => toggleCategoryDrawer()}
        >
          Add Category
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => toggleSubCategoryDrawer()}
        >
          Add Subcategory
        </Button>
      </Box>

      <Grid container spacing={2}>
        {categoryData.map((category: CategoryDto) => (
          <Grid size={3} key={category.categoryId}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.label} ({category.type.typeName})
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 2 }}
                  >
                    {category.description}
                  </Typography>

                  {category.subCategoryInfos.map(
                    (subCategory: SubCategoryDto) => (
                      <Chip
                        label={subCategory.label}
                        key={subCategory.pkSubCategoryId}
                        sx={{ mr: 1, mb: 1 }}
                        variant="outlined"
                      />
                    )
                  )}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  EDIT
                </Button>
                <Button size="small" color="primary">
                  Sub Category
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Drawer
        open={openSubCategory}
        onClose={() => toggleSubCategoryDrawer()}
        anchor="right"
      >
        <Box sx={{ width: 400, p: 2 }} role="presentation">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add/Update Subcategory
          </Typography>
          <CreateSubCategoryForm closeDrawer={toggleSubCategoryDrawer} categories={categoryData}/>
        </Box>
      </Drawer>

      <Drawer
        open={openCategory}
        onClose={() => toggleCategoryDrawer()}
        anchor="right"
      >
        <Box sx={{ width: 400, p: 2 }} role="presentation">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add/Update Category
          </Typography>
          <CreateCategoryForm
            closeCategory={toggleCategoryDrawer}
            saveCategory={saveCategory}
            fetchCategory={refetch}
            types={  types}
          />
        </Box>
      </Drawer>
    </>
  );
}
