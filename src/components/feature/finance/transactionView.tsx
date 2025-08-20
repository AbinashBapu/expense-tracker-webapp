import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Transaction {
  category: string;
  subcategory: string;
  transactionOn: string; // formatted date
  incurredFor: string[];
  incurredBy: string;
  description: string;
  amount: number;
}

interface Props {
  transaction: Transaction;
}

const TransactionView: React.FC<Props> = ({ transaction }) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ width: 600, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          {/* Top section: Category/Subcategory + Amount */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            {/* Category/Subcategory */}
            <Typography
              variant="h6"
              fontWeight="bold"
              noWrap
              sx={{
                maxWidth: "65%", // keep more space for amount
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {transaction.category} / {transaction.subcategory}
            </Typography>

            {/* Amount with style */}
            <Box
              display="flex"
              alignItems="center"
              px={1.5}
              py={0.5}
              borderRadius={2}
              sx={{
                bgcolor:
                  transaction.amount >= 0
                    ? "rgba(46, 125, 50, 0.1)" // light green bg
                    : "rgba(211, 47, 47, 0.1)", // light red bg
                color: transaction.amount >= 0 ? "success.main" : "error.main",
                fontWeight: "bold",
              }}
            >
              {transaction.amount >= 0 ? (
                <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} />
              ) : (
                <ArrowDownwardIcon fontSize="small" sx={{ mr: 0.5 }} />
              )}
              <Typography variant="h6">
                ₹ {Math.abs(transaction.amount).toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {/* Transaction On */}
            <Grid size={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Transaction On
              </Typography>
              <Typography variant="body1">
                {transaction.transactionOn}
              </Typography>
            </Grid>

            {/* Incurred By */}
            <Grid size={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Incurred By
              </Typography>
              <Typography variant="body1">{transaction.incurredBy}</Typography>
            </Grid>

            {/* Incurred For */}
            <Grid size={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Incurred For
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {transaction.incurredFor.map((person) => (
                  <Chip key={person} label={person} />
                ))}
              </Box>
            </Grid>

            {/* Description */}
            <Grid size={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1">{transaction.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionView;
