import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CalculateIcon from "@mui/icons-material/Calculate";
import CreditScoreSharpIcon from "@mui/icons-material/CreditScoreSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

export const MENUS = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    url: "/dashboard",
  },
  {
    name: "Log Transactions",
    icon: EditNoteSharpIcon,
    url: "/trackActivities",
  },
  {
    name: "Investment Growth",
    icon: AutoGraphIcon,
    url: "/investmentGrowth",
  },
  {
    name: "Reports",
    icon: InsertChartIcon,
    url: "/reports",
  },
  {
    name: "Category",
    icon: CategoryIcon,
    url: "/category",
  },
  {
    name: "Party",
    icon: PersonAddAltIcon,
    url: "/parties",
  },
  {
    name: "Budget Setup",
    icon: CreditScoreSharpIcon,
    url: "/budgeting",
  },
  {
    name: "Sign Out",
    icon: LogoutIcon,
    url: "/",
  },
];
