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
} from "@mui/material";
import { TypeDto } from "@/dto/ClassificationDto";
import { useSnackbar } from "@/provider/SnackbarContext";

type CategoryFormValues = {
  typeId: string;
  categoryName: string;
  categoryDescription: string;
};

const categoryFormValidate = (values: CategoryFormValues) => {
  console.log("Category Form: ", values);

  const validateCategoryForm = z.object({
    typeId: z.string().min(1, "Type is required"),
    categoryName: z.string().min(1, "Category is required"),
    categoryDescription: z.string().min(1, "Description is required"),
  });
  try {
    validateCategoryForm.parse(values);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Error: " + JSON.stringify(error.formErrors.fieldErrors));
      return error.formErrors.fieldErrors;
    }
  }
};

const CreateCategoryForm = ({
  closeCategory,
  saveCategory,
  fetchCategory,
  types,
}: {
  closeCategory: any;
  saveCategory: any;
  fetchCategory: any;
  types: TypeDto[];
}) => {
  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      typeId: "",
      categoryName: "",
      categoryDescription: "",
    },
    validate: categoryFormValidate,
    onSubmit: (values: any) => {
      let payload = {
        typeId: values.typeId,
        label: values.categoryName,
        description: values.categoryDescription,
      };

      saveCategory(payload)
        .then((response: any) => {
          console.log("Category Saved: ", response);
          closeCategory();
          fetchCategory();
          showSnackbar("Category saved successfully", "success");
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
        error={formik.touched.typeId && Boolean(formik.errors.typeId)}
      >
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="typeId"
          label="Type"
          value={formik.values.typeId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {types.map((type: TypeDto) => (
            <MenuItem key={type.typeId} value={type.typeId}>
              {type.typeName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched.typeId && formik.errors.typeId}
        </FormHelperText>
      </FormControl>

      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Category Name"
          name="categoryName"
          variant="standard"
          value={formik.values.categoryName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.categoryName && Boolean(formik.errors.categoryName)
          }
          helperText={formik.touched.categoryName && formik.errors.categoryName}
        />
      </FormControl>

      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Description"
          variant="standard"
          name="categoryDescription"
          rows={3}
          multiline
          value={formik.values.categoryDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.categoryDescription &&
            Boolean(formik.errors.categoryDescription)
          }
          helperText={
            formik.touched.categoryDescription &&
            formik.errors.categoryDescription
          }
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
          onClick={() => closeCategory()}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default CreateCategoryForm;
