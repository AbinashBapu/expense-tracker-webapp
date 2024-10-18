"use client";

import IconTextLabel from "@/components/common/label-text-icon";
// https://www.behance.net/gallery/209595173/Expense-Tracker-Dashboard-UI-Design?tracking_source=search_projects|expense+dashboard&l=4

import BarChart from "@/components/feature/barchart";
import CategoryList from "@/components/feature/category";
import TransactionsLists from "@/components/feature/transaction";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";

// https://dribbble.com/shots/7705222-Hubio-Financial-Wallet-Web-Application-Design
export default function Page() {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Current Month Analysis
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Box>
              <IconTextLabel
                icon={<AccountBalanceWalletRoundedIcon />}
                label="Income: "
                value="Rs. 45,000.00"
              />
            </Box>

            <Box>
              <IconTextLabel
                icon={<AccountBalanceWalletOutlinedIcon />}
                label="Expense: "
                value="Rs. 45,000.00"
              />
            </Box>

            <Box>
              <IconTextLabel
                icon={<SavingsIcon />}
                label="Saving: "
                value="Rs. 45,000.00"
              />
            </Box>

            <Box>
              <IconTextLabel
                icon={<CreditScoreOutlinedIcon />}
                label="Spend Limit: "
                value="Rs. 45,000.00"
              />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ mt: 1, height: "232px" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Jan-2025 Till Today
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Box>
              <IconTextLabel
                icon={<AccountBalanceWalletRoundedIcon />}
                label="Income: "
                value="Rs. 45,000.00"
              />
            </Box>

            <Box>
              <IconTextLabel
                icon={<AccountBalanceWalletOutlinedIcon />}
                label="Expense: "
                value="Rs. 45,000.00"
              />
            </Box>

            <Box>
              <IconTextLabel
                icon={<SavingsIcon />}
                label="Saving: "
                value="Rs. 45,000.00"
              />
            </Box>

            <Grid container spacing={2} mt={1}>
              <Grid size={6}>
                <Box sx={{ backgroundColor: "#f0d9d9", p: 1, borderRadius: 2 }}>
                  <Typography variant="caption">Estimated Spending</Typography>
                  <Typography sx={{ fontWeight: 600 }}>Rs. 3000</Typography>
                </Box>
              </Grid>
              <Grid size={6}>
                <Box sx={{ backgroundColor: "#c8d2ec", p: 1, borderRadius: 2 }}>
                  <Typography variant="caption">
                    Expenditure Incurred
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>Rs. 3000</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={8}>
        <Card>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={4}>
        <CategoryList />
      </Grid>
      <Grid size={8}>
        <TransactionsLists />
      </Grid>
    </Grid>
  );
}
