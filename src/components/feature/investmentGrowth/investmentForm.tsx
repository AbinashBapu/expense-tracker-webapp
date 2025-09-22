import { CategoryDto, SubCategoryDto } from "@/dto/ClassificationDto";
import { TransactionPartyInfo } from "@/dto/Party";
import { useCategory } from "@/hooks/useCategory";
import { useFinance } from "@/hooks/useFinance";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  SelectChangeEvent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import z from "zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar } from "@/provider/SnackbarContext";
import { CategoryIdConsts } from "@/data/CategoryIdConsts";

type InvestmentGrowthFormType = {
  subCategoryId: string;
  investedAmount: string | number;
  portfolioAmount: string | number;
  description: string;
  asOfDate: Dayjs | null;
};

export default function InvestmentGrowthForm({
  closeDrawer,
  subCatgories,
}: {
  closeDrawer: any;
  subCatgories: SubCategoryDto[];
}) {
  const { saveInvestmentPortfolio } = useFinance();
  const { showSnackbar } = useSnackbar();
  const today = useMemo(() => dayjs(), []);
  const formik = useFormik<InvestmentGrowthFormType>({
    initialValues: {
      subCategoryId: "",
      investedAmount: "",
      portfolioAmount: "",
      description: "",
      asOfDate: today, // Set default to today
    },
    enableReinitialize: true,
    validate: validateInvestmentForm, // enable this
    onSubmit: (values) => {
      const investmentPayload = {
        categoryId: CategoryIdConsts.SavingId,
        subCategoryId: values.subCategoryId,
        investedAmount: values.investedAmount,
        portfolioAmount: values.portfolioAmount,
        description: values.description,
        asOfDate: values.asOfDate?.toISOString(),
      };

      saveInvestmentPortfolio(investmentPayload)
        .then((response: any) => {
          console.log("Transaction Saved: ", response);
          showSnackbar("Successfully saved the investment", "success");
          closeDrawer();
        })
        .catch((error: any) => {
          showSnackbar("Unable to process your request, please contact support!", "error");
        });
    },
  });

  return (
    <>

      <form onSubmit={formik.handleSubmit}>
        <FormControl
          variant="standard"
          fullWidth
          sx={{ mb: 1 }}
          error={
            formik.touched.subCategoryId && Boolean(formik.errors.subCategoryId)
          }
        >
          <InputLabel id="subcategory-select-label">SubCategory</InputLabel>
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
            {subCatgories.map((sub) => (
              <MenuItem key={sub.pkSubCategoryId} value={sub.pkSubCategoryId}>
                {sub.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.subCategoryId && formik.errors.subCategoryId}
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="As Of Date"
              value={formik.values.asOfDate}
              onChange={(value) => {
                formik.setFieldValue("asOfDate", value);
              }}
              maxDate={dayjs()}
              format="DD-MM-YYYY HH:mm"
              slotProps={{
                textField: {
                  variant: "standard",
                  onBlur: () => formik.setFieldTouched("asOfDate", true),
                  error:
                    formik.touched.asOfDate && Boolean(formik.errors.asOfDate),
                  helperText: formik.touched.asOfDate && formik.errors.asOfDate,
                },
              }}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Invested Amount"
            name="investedAmount"
            variant="standard"
            type="number"
            value={formik.values.investedAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.investedAmount &&
              Boolean(formik.errors.investedAmount)
            }
            helperText={
              formik.touched.investedAmount && formik.errors.investedAmount
            }
          />
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Portfolio Amount"
            name="portfolioAmount"
            variant="standard"
            type="number"
            value={formik.values.portfolioAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.portfolioAmount &&
              Boolean(formik.errors.portfolioAmount)
            }
            helperText={
              formik.touched.portfolioAmount && formik.errors.portfolioAmount
            }
          />
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Description"
            name="description"
            variant="standard"
            multiline
            minRows={3}
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
            onClick={() => closeDrawer()}
            sx={{ ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </>
  );
}

const validateInvestmentForm = (values: any) => {
  const validateInvestmentForm = z.object({
    subCategoryId: z.string().min(1, "Subcategory is required"),
    investedAmount: z
      .union([
        z.number().min(1, "Invested amount is required"),
        z
          .string()
          .refine((val) => !!val && !isNaN(Number(val)) && Number(val) > 0, {
            message: "Invested amount is required",
          }),
      ]),
    portfolioAmount: z
      .union([
        z.number().min(1, "Portfolio amount is required"),
        z
          .string()
          .refine((val) => !!val && !isNaN(Number(val)) && Number(val) > 0, {
            message: "Portfolio amount is required",
          }),
      ]),
    description: z.string().min(1, "Description is required"),
    asOfDate: z
      .any()
      .refine((val) => val != null && val !== "", {
        message: "As of date is required",
      }),
  });

  try {
    validateInvestmentForm.parse(values);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Error: " + JSON.stringify(error.formErrors.fieldErrors));
      return error.formErrors.fieldErrors;
    }
  }
};