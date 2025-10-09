import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Fab,
  Typography,
  IconButton,
  Paper,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Autocomplete,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormik } from "formik";
import { z } from "zod";
import { CategoryDto, SubCategoryDto } from "@/dto/ClassificationDto";
import { TransactionPartyInfo } from "@/dto/Party";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "@/provider/SnackbarContext";
import CloseIcon from "@mui/icons-material/Close";
import { useFinance } from "@/hooks/useFinance";
const MAX_CARDS = 4;

const TransactionCardSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().min(1, "Subcategory is required"),
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
  transactionType: z.string().min(1, "Transaction is required"),
  amount: z.union([
    z.number().min(1, "Amount is required"),
    z.string().min(1, "Amount is required"),
  ]),
  description: z.string().min(1, "Description is required"),

  transactionDate: z.any().refine((val) => val != null && val !== "", {
    message: "Transaction date is required",
  }),
});

const FormSchema = z.object({
  transactions: z.array(TransactionCardSchema).min(1),
});

type FormValues = z.infer<typeof FormSchema>;

export function LogTransactionForm({
  parties,
  categories,
  refetch,
  closeTransactionForm,
}: {
  parties: TransactionPartyInfo[];
  categories: CategoryDto[];
  refetch: any;
  closeTransactionForm: any;
}) {
  const { showSnackbar } = useSnackbar();
  const today = useMemo(() => dayjs(), []);
  const [cards, setCards] = useState([
    {
      categoryId: "",
      subCategoryId: "",
      incurredById: parties?parties[0]:null,
      incurredForIds: parties?[parties[0]]:[],
      transactionType: "Dr",
      amount: "",
      description: "",
      transactionDate: today,
    },
  ]);
  const [subCategoriesState, setSubCategoriesState] = useState<
    SubCategoryDto[][]
  >([[]]);

  const { saveAllTransactions } = useFinance();
console.log("parties ", parties)
  const formik = useFormik<FormValues>({
    initialValues: {
      transactions: cards,
    },
    // validate: transactionFormValidate,
    onSubmit: (values: any) => {
      // console.log("Submitted:", values);

      const hasMissingFields = values.transactions.some((transaction: any) => {
        // console.log("Transaction: ", transaction);
        return (
          !transaction.categoryId ||
          !transaction.subCategoryId ||
          !transaction.amount ||
          isNaN(Number(transaction.amount)) ||
          !transaction.description ||
          !transaction.incurredById ||
          transaction.description.trim() === "" ||
          !["Dr", "Cr"].includes(transaction.transactionType) ||
          !transaction.transactionDate ||
          isNaN(Date.parse(transaction.transactionDate)) ||
          !Array.isArray(transaction.incurredForIds)
        );
      });

      if (hasMissingFields) {
        showSnackbar("Please fill all the required fields", "error");
      } else {
        const preparedPayloads = values.transactions.map((trx: any) => ({
          amount: trx.amount,
          categoryId: trx.categoryId,
          description: trx.description,
          incurredBy: trx.incurredById?.transactionPartyId,
          incurredFor: trx.incurredForIds.map((p: any) => p.transactionPartyId),
          spentOn: dayjs(trx.transactionDate).toISOString(),
          subCategoryId: trx.subCategoryId,
          type: trx.transactionType,
        }));

        console.log("Prepared Payloads:", preparedPayloads);

        saveAllTransactions(preparedPayloads)
          .then((response: any) => {
            showSnackbar("Transaction saved successfully", "success");
            closeTransactionForm();
            refetch();
          })
          .catch((error: any) => {
            console.log("Some error occureed");
            showSnackbar(
              "Transaction save unsuccessfull, Please retry after sometime.",
              "error"
            );
          });
      }
    },
    enableReinitialize: true,
  });

  const addCard = () => {
    if (formik.values.transactions.length < MAX_CARDS) {
      formik.setFieldValue("transactions", [
        ...formik.values.transactions,
        {
          categoryId: "",
          subCategoryId: "",
          incurredById: parties?parties[0]:null,
          incurredForIds: parties?[parties[0]]:[],
          transactionType: "Dr",
          amount: "",
          description: "",
          transactionDate: today,
        },
      ]);
    }
  };

  const removeCard = (index: number) => {
    const updated = [...formik.values.transactions];
    updated.splice(index, 1);
    formik.setFieldValue("transactions", updated);
  };

  const handleCategoryChange = (
    index: number,
    event: SelectChangeEvent<string>
  ) => {
    const categoryId = event.target.value;

    // Update categoryId for that transaction
    formik.setFieldValue(`transactions[${index}].categoryId`, categoryId);

    // Reset subCategoryId for that transaction
    formik.setFieldValue(`transactions[${index}].subCategoryId`, "");

    // Get selected category and subcategories
    const selectedCategory = categories.find(
      (cat) => cat.categoryId === categoryId
    );

    // Store the filtered subcategories per card
    const updatedSubcategories = [...subCategoriesState];
    updatedSubcategories[index] = selectedCategory?.subCategoryInfos ?? [];
    setSubCategoriesState(updatedSubcategories);
  };

  const closeCard = () => {
    if (formik.values.transactions.length > 1) {
      formik.setFieldValue("transactions", [
        ...formik.values.transactions.slice(0, -1),
      ]);
    }
    closeTransactionForm();
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Paper
          variant="outlined"
          sx={{ borderColor: "#ddd", borderRadius: 2, p: 2 }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Log Transactions
            </Typography>
            <Box>
              <Fab
                color="primary"
                size="small"
                onClick={addCard}
                disabled={formik.values.transactions.length >= MAX_CARDS}
                sx={{ boxShadow: 1 }}
              >
                <AddIcon />
              </Fab>

              <Fab
                color="error"
                size="small"
                onClick={closeCard}
                sx={{ boxShadow: 1, ml: 2 }}
              >
                <CloseIcon />
              </Fab>
            </Box>
          </Box>

          {/* Cards */}

          <Grid container spacing={2}>
            {formik.values.transactions.map((txn, index) => (
              <Grid size={{ xs: 12, sm: 4, md: 3 }} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    minHeight: 200,
                    borderRadius: 3,
                    boxShadow: 2,
                    position: "relative",
                  }}
                >
                  {/* Remove Button */}
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeCard(index)}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    disabled={formik.values.transactions.length === 1}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <CardContent>
                    <Grid container spacing={2}>
                      {/* Left Column */}
                      <Grid size={{ xs: 6 }}>
                        {/* Category */}
                        <FormControl
                          fullWidth
                          variant="standard"
                          sx={{ mb: 2 }}
                        >
                          <InputLabel>Category</InputLabel>
                          <Select
                            name={`transactions[${index}].categoryId`}
                            value={txn.categoryId}
                            onChange={(event) =>
                              handleCategoryChange(index, event)
                            }
                            onBlur={formik.handleBlur}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {categories.map((cat) => (
                              <MenuItem
                                key={cat.categoryId}
                                value={cat.categoryId}
                              >
                                {cat.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        {/* Transaction Type */}
                        <FormControl
                          fullWidth
                          variant="standard"
                          sx={{ mb: 2 }}
                        >
                          <InputLabel>Transaction Type</InputLabel>
                          <Select
                            name={`transactions[${index}].transactionType`}
                            value={txn.transactionType}
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

                        {/* Amount */}
                        <TextField
                          fullWidth
                          label="Amount"
                          name={`transactions[${index}].amount`}
                          variant="standard"
                          type="number"
                          value={txn.amount}
                          onChange={formik.handleChange}
                          sx={{ mb: 2 }}
                        />
                      </Grid>

                      {/* Right Column */}
                      <Grid size={{ xs: 6 }}>
                        {/* Subcategory */}
                        <FormControl
                          fullWidth
                          variant="standard"
                          sx={{ mb: 2 }}
                        >
                          <InputLabel>Subcategory</InputLabel>
                          <Select
                            name={`transactions[${index}].subCategoryId`}
                            value={txn.subCategoryId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {subCategoriesState[index]?.map((sub) => (
                              <MenuItem
                                key={sub.pkSubCategoryId}
                                value={sub.pkSubCategoryId}
                              >
                                {sub.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        {/* Transaction Date */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Transaction Date"
                            value={txn.transactionDate}
                            onChange={(value) =>
                              formik.setFieldValue(
                                `transactions[${index}].transactionDate`,
                                value
                              )
                            }
                            maxDate={dayjs()}
                            format="DD-MM-YYYY HH:mm"
                            slotProps={{
                              textField: {
                                variant: "standard",
                                fullWidth: true,
                              },
                            }}
                          />
                        </LocalizationProvider>

                        {/* Incurred By */}
                        <Autocomplete
                          options={parties}
                          getOptionLabel={(option) => option.name}
                          value={txn.incurredById}
                          onChange={(_, value) =>
                            formik.setFieldValue(
                              `transactions[${index}].incurredById`,
                              value
                            )
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Incurred By"
                              placeholder="Select person who spent"
                              fullWidth
                            />
                          )}
                          sx={{ mt: 2 }}
                        />
                      </Grid>
                    </Grid>

                    {/* Incurred For */}
                    <Autocomplete
                      multiple
                      options={parties}
                      getOptionLabel={(option) => option.name}
                      value={txn.incurredForIds}
                      onChange={(_, value) =>
                        formik.setFieldValue(
                          `transactions[${index}].incurredForIds`,
                          value
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Incurred For"
                          placeholder="Select parties"
                          fullWidth
                        />
                      )}
                      sx={{ mt: 2 }}
                    />

                    {/* Description */}
                    <TextField
                      fullWidth
                      label="Description"
                      name={`transactions[${index}].description`}
                      variant="standard"
                      multiline
                      minRows={3}
                      value={txn.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{ mt: 2 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Actions */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", p: 2, mt: 2 }}
          >
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="primary"
              sx={{ mr: 1 }}
            >
              Save All
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={closeTransactionForm}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}

const transactionFormValidate = (values: FormValues) => {
  // console.log("Category Form: ", values);
  const result = FormSchema.safeParse(values);

  if (!result.success) {
    const fieldErrors: any = {};

    // Manually map Zod errors to Formik-style errors
    result.error.errors.forEach((err) => {
      const path = err.path;

      if (path.length === 2 && path[0] === "transactions") {
        const index = path[1] as number;
        if (!fieldErrors.transactions) {
          fieldErrors.transactions = [];
        }
        if (!fieldErrors.transactions[index]) {
          fieldErrors.transactions[index] = {};
        }
        fieldErrors.transactions[index][path[2] ?? "categoryId"] = err.message;
      }
    });

    return fieldErrors;
  }

  return {};
};
