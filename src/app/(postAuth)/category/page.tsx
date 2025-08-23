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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryDto | null>(null);

  const toggleSubCategoryDrawer = () => {
    setOpenSubCategory((prev) => !prev);
  };
  const toggleCategoryDrawer = () => {
    setOpenCategory((prev) => !prev);
  };

  const handleChipClick = (subCategory: SubCategoryDto) => {
    setSelectedSubCategory(subCategory);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubCategory(null);
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

      <Grid container spacing={3} padding={2}>
        {categoryData.map((category: any) => (
          <Grid size={4} key={category.categoryId}>
            <Card
              elevation={4}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardActionArea sx={{ flexGrow: 1, padding: 2 }}>
                <CardContent sx={{ paddingBottom: "16px !important" }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    fontWeight="600"
                    color="primary.dark"
                    sx={{ mb: 1 }}
                  >
                    {category.label}{" "}
                    <Typography
                      component="span"
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ fontWeight: 500, ml: 1 }}
                    >
                      ({category.type.typeName})
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.5 }}
                  >
                    {category.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    {category.subCategoryInfos.map((subCategory: any) => (
                      <Tooltip
                        title={subCategory.description}
                        key={subCategory.pkSubCategoryId}
                      >
                        <Chip
                          label={subCategory.label}
                          variant="outlined"
                          color="primary"
                          sx={{ cursor: "pointer", userSelect: "none" }}
                          size="small"
                          onClick={() => handleChipClick(subCategory)}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>

              <CardActions
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                  justifyContent: "flex-end",
                  paddingRight: 2,
                  paddingBottom: 2,
                  gap: 1,
                }}
              >
                <Button variant="outlined" size="small" color="primary">
                  Edit
                </Button>
                <Button variant="contained" size="small" color="primary">
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
          <CreateSubCategoryForm
            closeDrawer={toggleSubCategoryDrawer}
            categories={categoryData}
          />
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
            types={types}
          />
        </Box>
      </Drawer>

      {/* Dialog for SubCategory details */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedSubCategory?.label}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText sx={{ whiteSpace: "pre-line" }}>
            {selectedSubCategory?.description || "No description available."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
