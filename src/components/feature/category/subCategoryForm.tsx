import React from "react";
import { useFormik } from "formik";
import { z } from "zod";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";

export const subCategoryFormValidate = (values: any) => {
  const validateSubCtegorySchema = z.object({
    categoryName: z.string().min(1, "Category is required"),
    subCategoryName: z.string().min(1, "Sub category name is required"),
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

const CreateSubCategoryForm = () => {
  const [category, setCategory] = React.useState("");

  const validationSchema = subCategoryFormValidate;

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      subCategoryName: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
        <InputLabel id="category-name">Category</InputLabel>
        <Select
          labelId="category-name"
          id="category-name-id"
          label="Category Name"
        >
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Sub Category Name"
          id="subcategory-name"
          variant="standard"
        />
      </FormControl>

      <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Description"
          id="subcategory-description"
          variant="standard"
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
          onClick={() => {
            // Handle cancel logic here
            console.log("Cancelled");
          }}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default CreateSubCategoryForm;
