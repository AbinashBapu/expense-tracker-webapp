import {
  FormControl,
  TextField,
  MenuItem,
  Box,
  Button,
  FormHelperText,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { SearchParamDto } from "@/dto/SearchParamDto";
import { CategoryDto, SubCategoryDto } from "@/dto/ClassificationDto";
import { TransactionPartyInfo } from "@/dto/Party";
import { useFormik } from "formik";

interface SearchReportFormProps {
  closeDrawer: any;
  onSearch: (filter: SearchParamDto) => void;
  parties: TransactionPartyInfo[];
  categories: CategoryDto[];
  filter: SearchParamDto;
}
export interface ReportFilter {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  categoryId: string | null;
  subCategoryId: string | null;
  transactionType: string | null;
}

export default function SearchReportForm({
  closeDrawer,
  onSearch,
  parties,
  categories,
  filter,
}: SearchReportFormProps) {
  const [subCategories, setSubCategories] = useState<SubCategoryDto[]>([]);
  const today = useMemo(() => dayjs(), []);
  const formik = useFormik<ReportFilter>({
    initialValues: {
      fromDate: filter.fromDate
        ? dayjs(filter.fromDate)
        : today.startOf("month"),
      toDate: filter.toDate ? dayjs(filter.toDate) : today.endOf("day"),
      categoryId: filter.categoryId ?? "",
      subCategoryId: filter.subCategoryId ?? "",
      transactionType: filter.transactionType ?? "",
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      const filter: SearchParamDto = {
        fromDate: dayjs(values.fromDate).toISOString(),
        toDate: dayjs(values.toDate).toISOString(), //values.toDate,
        categoryId: values.categoryId,
        subCategoryId: values.subCategoryId,
        transactionType: values.transactionType,
      };
      console.log("Filter: ", filter);
      onSearch(filter);
    },
  });
  const handleCategoryChange = (event: SelectChangeEvent<string | unknown>) => {
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
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              value={formik.values.fromDate}
              onChange={(value) => {
                formik.setFieldValue("fromDate", value);
              }}
              maxDate={dayjs()}
              format="DD-MM-YYYY HH:mm"
              slotProps={{
                textField: {
                  variant: "standard",
                },
              }}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="To Date"
              value={formik.values.toDate}
              onChange={(value) => {
                formik.setFieldValue("toDate", value);
              }}
              maxDate={dayjs()}
              format="DD-MM-YYYY HH:mm"
              slotProps={{
                textField: {
                  variant: "standard",
                  onBlur: () => formik.setFieldTouched("toDate", true),
                },
              }}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
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
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
          <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
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

        <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
          <InputLabel id="relation-label">Transaction Type</InputLabel>
          <Select
            labelId="transaction-type-label"
            name="transactionType"
            value={formik.values.transactionType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Cr">Credit</MenuItem>
            <MenuItem value="Dr">Debit</MenuItem>
          </Select>
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
            Apply
          </Button>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSubCategories([]);
              formik.setValues({
                fromDate: today.startOf("month"),
                toDate: today.endOf("day"),
                categoryId: "",
                subCategoryId: "",
                transactionType: "",
              });
            }}
            sx={{ ml: 1 }}
          >
            Clear
          </Button>
        </Box>
      </form>
    </>
  );
}

// const DATE_RANGE_PRESETS = [
//   { value: "today", label: "Today" },
//   { value: "currentWeek", label: "Current Week" },
//   { value: "currentMonth", label: "Current Month" },
//   { value: "currentYear", label: "Current Year" },
//   { value: "last7days", label: "Last 7 Days" },
//   { value: "last30days", label: "Last 30 Days" },
//   { value: "customDate", label: "Custom Date" },
// ];

// interface SearchReportFormProps {
//   closeDrawer: any;
//   onSearch: (filter: ReportFilter) => void;
//   filter: ReportFilter;
//   parties: TransactionPartyInfo[];
//   categories: CategoryDto[];
// }

// export default function SearchReportForm({
//   closeDrawer,
//   onSearch,
//   filter,
//   parties,
//   categories,
// }: SearchReportFormProps) {
//   const [duration, setDuration] = useState<any>(filter.duration);
//   const [startDate, setStartDate] = useState<Dayjs | null>(
//     filter.startDate ? dayjs(filter.startDate) : null
//   );
//   const [endDate, setEndDate] = useState<Dayjs | null>(
//     filter.endDate ? dayjs(filter.endDate) : null
//   );
//   const [subCategories, setSubCategories] = useState<SubCategoryDto[]>([]);

//   const handleReset = () => {
//     setDuration("");
//     setStartDate(null);
//     setEndDate(null);
//   };

//   const handleSearch = () => {
//     const newFilter: ReportFilter = {
//       duration,
//       startDate: startDate ? startDate?.toISOString() : null,
//       endDate: endDate ? endDate?.toISOString() : null,
//     };
//     onSearch(newFilter);
//     closeDrawer();
//   };

//   const handleOnChangeDuration = (value: any) => {
//     setDuration(value);
//     switch (value) {
//       case "today":
//         setStartDate(dayjs().startOf("day"));
//         setEndDate(dayjs().endOf("day"));
//         break;
//       case "currentWeek":
//         setStartDate(dayjs().startOf("week"));
//         setEndDate(dayjs().endOf("week"));
//         break;
//       case "currentMonth":
//         setStartDate(dayjs().startOf("month"));
//         setEndDate(dayjs().endOf("month"));
//         break;
//       case "currentYear":
//         setStartDate(dayjs().startOf("year"));
//         setEndDate(dayjs().endOf("year"));
//         break;
//       case "last7days":
//         setStartDate(dayjs().subtract(7, "day"));
//         setEndDate(dayjs());
//         break;
//       case "last30days":
//         setStartDate(dayjs().subtract(30, "day"));
//         setEndDate(dayjs());
//         break;
//       case "customDate":
//         setStartDate(startDate ? dayjs(startDate) : null);
//         setEndDate(endDate ? dayjs(endDate) : null);
//         break;
//       default:
//         setStartDate(dayjs().startOf("week"));
//         setEndDate(dayjs().endOf("week"));
//         break;
//     }
//   };

//   return (
//     <>
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <TextField
//           select
//           label="Duration"
//           value={duration}
//           onChange={(e) => handleOnChangeDuration(e.target.value)}
//           size="small"
//         >
//           {DATE_RANGE_PRESETS.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//       </FormControl>

//       {duration === "customDate" && (
//         <>
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Transaction From"
//                 value={startDate}
//                 onChange={(newValue) => setStartDate(newValue)}
//                 slotProps={{
//                   textField: {
//                     size: "small",
//                     fullWidth: true,
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </FormControl>

//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Transaction To"
//                 value={endDate}
//                 onChange={(newValue) => setEndDate(newValue)}
//                 // @ts-ignore
//                 minDate={startDate}
//                 slotProps={{
//                   textField: {
//                     size: "small",
//                     fullWidth: true,
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </FormControl>
//         </>
//       )}

//       <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
//         <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
//         <Select
//           fullWidth
//           labelId="demo-simple-select-standard-label"
//           id="demo-simple-select-standard"
//           name="categoryId"
//           label="Category"
//           value={formik.values.categoryId}
//           onChange={handleCategoryChange}
//           onBlur={formik.handleBlur}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>

//           {categories.map((category: CategoryDto) => (
//             <MenuItem key={category.categoryId} value={category.categoryId}>
//               {category.label}
//             </MenuItem>
//           ))}
//         </Select>
//         <FormHelperText>
//           {formik.touched.categoryId && formik.errors.categoryId}
//         </FormHelperText>
//       </FormControl>

//       <FormControl variant="standard" fullWidth sx={{ mb: 1 }}>
//         <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
//         <Select
//           fullWidth
//           labelId="subcategory-select-label"
//           id="subcategory-select"
//           name="subCategoryId"
//           value={formik.values.subCategoryId}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           {subCategories.map((sub) => (
//             <MenuItem key={sub.pkSubCategoryId} value={sub.pkSubCategoryId}>
//               {sub.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           gap: 2,
//         }}
//       >
//         <Button variant="outlined" fullWidth onClick={handleReset}>
//           Reset
//         </Button>
//         <Button variant="contained" fullWidth onClick={handleSearch}>
//           Search
//         </Button>
//       </Box>
//     </>
//   );
// }
