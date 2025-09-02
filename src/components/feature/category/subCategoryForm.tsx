import React from "react";
import { useFormik } from "formik";
import { z } from "zod";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { CategoryDto } from "@/dto/ClassificationDto";
import { useCategory } from "@/hooks/useCategory";
import { useSnackbar } from "@/provider/SnackbarContext";

export const subCategoryFormValidate = (values: any) => {
  const validateSubCtegorySchema = z.object({
    categoryId: z.string().min(1, "Category is required"),
    subCategoryName: z.string().min(1, "Subcategory name is required"),
    description: z.string().min(1, "Description is required"),
  });

  try {
    validateSubCtegorySchema.parse(values);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Error: " + JSON.stringify(error.formErrors.fieldErrors));
      return error.formErrors.fieldErrors;
    }
  }
};

const CreateSubCategoryForm = ({
  closeDrawer,
  categories,
}: {
  closeDrawer: any;
  categories: Array<CategoryDto>;
}) => {
  const { saveSubcategory } = useCategory();
  const { showSnackbar } = useSnackbar();

  const formik: any = useFormik({
    initialValues: {
      categoryId: "",
      subCategoryName: "",
      description: "",
    },
    validate: subCategoryFormValidate,
    onSubmit: (values: any) => {
      let payload = {
        categoryId: values.categoryId,
        label: values.subCategoryName,
        description: values.description,
      };

      saveSubcategory(payload)
        .then((response: any) => {
          showSnackbar("SubCategory saved successfully", "success");
          closeDrawer();
        })
        .catch((error: any) => {
          console.log("Some error occureed");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
      >
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="categoryId"
          label="Category"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {categories.map((category: CategoryDto) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched.categoryId && formik.errors.categoryId}
        </FormHelperText>
      </FormControl>

      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Subcategory Name"
          name="subCategoryName"
          variant="standard"
          value={formik.values.subCategoryName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.subCategoryName &&
            Boolean(formik.errors.subCategoryName)
          }
          helperText={
            formik.touched.subCategoryName && formik.errors.subCategoryName
          }
        />
      </FormControl>

      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Description"
          variant="standard"
          name="description"
          rows={3}
          multiline
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </FormControl>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button
          fullWidth
          size="small"
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mr: 2 }}
        >
          Save
        </Button>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => closeDrawer()}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default CreateSubCategoryForm;
