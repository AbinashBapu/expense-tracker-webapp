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
import { useEffect, useState } from "react";
import z from "zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar } from "@/provider/SnackbarContext";
import { CategoryIdConsts } from "@/data/CategoryIdConsts";

type InvestmentSearchFormType = {
  subCategoryId: string;
  direction: string;
  asOfDate: Dayjs | null;
};

export default function InvestmentSearchForm({
  closeDrawer,
  subCatgories,
  applySearch,
  searchValues,
}: {
  closeDrawer: any;
  subCatgories: SubCategoryDto[];
  applySearch: any;
  searchValues: any;
}) {
  const { saveInvestmentPortfolio } = useFinance();
  const { showSnackbar } = useSnackbar();
  const formik = useFormik<InvestmentSearchFormType>({
    initialValues: {
      subCategoryId: searchValues.subCategoryId,
      direction: searchValues.direction,
      asOfDate: searchValues.asOfDate ? dayjs(searchValues.asOfDate) : null,
    },
    enableReinitialize: true, // <-- this is key

    onSubmit: (values) => {
      const investmentPayload = {
        subCategoryId: values.subCategoryId,
        direction: values.direction,
        asOfDate: values.asOfDate?.toISOString(),
      };
      applySearch(investmentPayload);

      console.log("Payload: ", investmentPayload);
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

        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
          <InputLabel id="direction-select-label">direction</InputLabel>
          <Select
            fullWidth
            labelId="subcategory-select-label"
            id="subcategory-select"
            name="direction"
            value={formik.values.direction}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        {/* <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
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
        </FormControl> */}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mr: 1 }}
          >
            Apply
          </Button>
          {/* <Button
            fullWidth
            size="small"
            variant="contained"
            color="error"
            type="submit"
            sx={{ mr: 1 }}
            onClick={() => formik.resetForm()}
          >
            Reset
          </Button> */}

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
