"use client";

import IconTextLabel from "@/components/common/label-text-icon";
// https://www.behance.net/gallery/209595173/Expense-Tracker-Dashboard-UI-Design?tracking_source=search_projects|expense+dashboard&l=4

import BarChart from "@/components/feature/barchart";
import CategoryList from "@/components/feature/category";
import TransactionsLists from "@/components/feature/transaction";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";


import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';


// https://dribbble.com/shots/7705222-Hubio-Financial-Wallet-Web-Application-Design
export default function Page() {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={6}>
        <Typography variant="h6">Good Morning, Abinash Pradhan</Typography>
        <Typography variant="subtitle1" sx={{ color: "#737171" }}>
          Here is your current financial status
        </Typography>
      </Grid>
      <Grid size={6}></Grid>

      <Grid size={3}>
        <Card>
          <CardContent style={{ "padding":"14px 14px" }}>
            <Box sx={{ display:"flex",flexDirection: "row",justifyContent:"space-between", mb: 1  }}>
              <Typography variant="body2">
                TOTAL EARNINGS
              </Typography>
              <Typography variant="caption"> <CallMadeIcon sx={{fontSize:"11px"}}/> 10.05%</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "#909090" }}>
              Rs. 45,000.00
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={3}>
        <Card>
          <CardContent style={{ "padding":"14px 14px" }}>
            <Box sx={{ display:"flex",flexDirection: "row",justifyContent:"space-between", mb: 1  }}>
              <Typography variant="body2">
                TOTAL EXPENSES
              </Typography>
               <Typography variant="caption"> <CallReceivedIcon sx={{fontSize:"11px"}}/> 10.05%</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "#909090" }}>
              Rs. 45,000.00
            </Typography>
            <Box></Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={3}>
        <Card >
          <CardContent style={{ "padding":"14px 14px" }}>
            <Box sx={{ display:"flex",flexDirection: "row",justifyContent:"space-between", mb: 1 }}>
              <Typography variant="body2">
                CURRENT MONTH EARNING
              </Typography>
              <Typography variant="caption"> <CallMadeIcon sx={{fontSize:"11px"}}/> 10.05%</Typography>
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 600, color: "#909090" }}>
              Rs. 45,000.00
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={3}>
        <Card>
          <CardContent style={{ "padding":"14px 14px" }}>
            <Box sx={{ display:"flex",flexDirection: "row",justifyContent:"space-between", mb: 1  }}>
              <Typography variant="body2" >
                CURRENT MONTH EXPENSE
              </Typography>
               <Typography variant="caption"> <CallReceivedIcon sx={{fontSize:"11px"}}/> 10.05%</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "#909090" }}>
              Rs. 45,000.00
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

{
  /* <Grid container spacing={2} sx={{ mb: 3 }}>
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
    </Grid> */
}
