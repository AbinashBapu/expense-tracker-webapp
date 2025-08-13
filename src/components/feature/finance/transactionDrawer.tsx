import { CategoryDto, SubCategoryDto } from "@/dto/ClassificationDto";
import { TransactionPartyInfo } from "@/dto/Party";
import { useCategory } from "@/hooks/useCategory";
import { useFinance } from "@/hooks/useFinance";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  FormHelperText,
  Button,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import z from "zod";

type TransactionFormValues = {
  categoryId: string;
  subCategoryId: string;
  incurredById: TransactionPartyInfo | null;
  incurredForIds: Array<TransactionPartyInfo>;
  transactionType: string;
  amount: number;
  description: string;
};

export default function TransactionForm({
  closeDrawer,
  parties,
  categories,
}: {
  closeDrawer: any;
  parties: TransactionPartyInfo[];
  categories: CategoryDto[];
}) {
  const [subCategories, setSubCategories] = useState<SubCategoryDto[]>([]);

  const formik = useFormik<TransactionFormValues>({
    initialValues: {
      categoryId: "",
      subCategoryId: "",
      incurredById: null,
      transactionType: "",
      incurredForIds: [],
      amount: 0,
      description: "",
    },
    validate: transactionFormValidate,
    onSubmit: (values: any) => {
      console.log(values);
    },
  });

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: string; name: string }>
  ) => {
    const categoryId = event.target.value as string;

    formik.setFieldValue("categoryId", categoryId);
    formik.setFieldTouched("categoryId", true);

    // Filter the selected category and get subcategories
    const selectedCategory = categories.find(
      (cat) => cat.categoryId === categoryId
    );
    setSubCategories(selectedCategory?.subCategoryInfos ?? []);

    // Reset subcategory when category changes
    formik.setFieldValue("subCategoryId", "");
  };

  return (
    <Box sx={{ width: 400, p: 2 }} role="presentation">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Log Transactions
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          variant="standard"
          fullWidth
          sx={{ mb: 2 }}
          error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="categoryId"
            label="Category"
            value={formik.values.categoryId}
            onChange={handleCategoryChange}
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

        <FormControl
          variant="standard"
          fullWidth
          sx={{ mb: 1 }}
          error={
            formik.touched.subCategoryId && Boolean(formik.errors.subCategoryId)
          }
        >
          <InputLabel id="subcategory-select-label">Sub Category</InputLabel>
          <Select
            fullWidth
            labelId="subcategory-select-label"
            id="subcategory-select"
            name="subCategoryId"
            value={formik.values.subCategoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {subCategories.map((sub) => (
              <MenuItem key={sub.pkSubCategoryId} value={sub.pkSubCategoryId}>
                {sub.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.subCategoryId && formik.errors.subCategoryId}
          </FormHelperText>
        </FormControl>

        <FormControl
          variant="standard"
          fullWidth
          sx={{ mb: 1 }}
          error={
            formik.touched.incurredById && Boolean(formik.errors.incurredById)
          }
        >
          <Autocomplete
            id="incurred-for-autocomplete"
            size="small"
            options={parties}
            getOptionLabel={(option) => option.name}
            value={formik.values.incurredById}
            onChange={(_, value: TransactionPartyInfo | null) => {
              formik.setFieldValue("incurredById", value);
            }}
            onBlur={() => formik.setFieldTouched("incurredById", true)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Incurred By"
                placeholder="Select Party"
              />
            )}
          />
          <FormHelperText>
            {formik.touched.incurredById && formik.errors.incurredForIds}
          </FormHelperText>
        </FormControl>

        <FormControl
          variant="standard"
          fullWidth
          sx={{ mb: 1 }}
          error={
            formik.touched.incurredForIds &&
            Boolean(formik.errors.incurredForIds)
          }
        >
          <Autocomplete
            multiple
            id="incurred-for-autocomplete"
            size="small"
            options={parties}
            getOptionLabel={(option) => option.name}
            value={formik.values.incurredForIds}
            onChange={(_, value: Array<TransactionPartyInfo>) =>
              formik.setFieldValue("incurredForIds", value)
            }
            onBlur={() => formik.setFieldTouched("incurredForIds", true)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Incurred For"
                placeholder="Select parties for whom spents"
              />
            )}
          />
          <FormHelperText>
            {formik.touched.incurredForIds && formik.errors.incurredForIds}
          </FormHelperText>
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Transaction type
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"cr"}>Credit</MenuItem>
            <MenuItem value={"dr"}>Debit</MenuItem>
          </Select>
          <FormHelperText>Who spents</FormHelperText>
        </FormControl>

        <TextField
          sx={{ mt: 1 }}
          id="standard-basic"
          label="Amount"
          variant="standard"
          type="number"
          fullWidth
        />
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Description"
            name="description"
            variant="standard"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mr: 1 }}
          >
            Save
          </Button>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            color="secondary"
            onClick={closeDrawer}
            sx={{ ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </form>
      <Divider />
    </Box>
  );
}

const transactionFormValidate = (values: any) => {
  console.log("Category Form: ", values);
  const validateTransactionForm = z.object({
    categoryId: z.string().min(1, "Category is required"),
    subCategoryId: z.string().min(1, "Sub is required"),
    incurredById: z.custom(
      (val) => {
        if (
          !val ||
          typeof val !== "object" ||
          !("transactionPartyId" in val) ||
          !("name" in val) ||
          !("relationType" in val) ||
          typeof (val as any).transactionPartyId !== "string" ||
          !(val as any).transactionPartyId.trim()
        ) {
          return false;
        }
        return true;
      },
      {
        message: "Incurred by is required",
      }
    ),

    incurredForIds: z
      .array(
        z.object({
          transactionPartyId: z.string(),
          name: z.string(),
          relationType: z.string(),
          active: z.boolean(),
        })
      )
      .min(1, "Incurred for is required"),
  });
  try {
    validateTransactionForm.parse(values);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Error: " + JSON.stringify(error.formErrors.fieldErrors));
      return error.formErrors.fieldErrors;
    }
  }
};
