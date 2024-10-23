import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SecurityIcon from "@mui/icons-material/Security";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PaymentsIcon from "@mui/icons-material/Payments";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HealingIcon from "@mui/icons-material/Healing";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SportsIcon from "@mui/icons-material/Sports";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import SpaIcon from "@mui/icons-material/Spa";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import FaceIcon from "@mui/icons-material/Face";
import DryCleaningOutlinedIcon from "@mui/icons-material/DryCleaningOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import SavingsIcon from "@mui/icons-material/Savings";
import GavelIcon from "@mui/icons-material/Gavel";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import LaptopIcon from "@mui/icons-material/Laptop";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import RedeemIcon from "@mui/icons-material/Redeem";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PetsIcon from "@mui/icons-material/Pets";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // New icon for income
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PaidIcon from "@mui/icons-material/Paid";

// CATEGORY_SUBCATEGORY_DATA with MUI icons, including Incomes category
export const CATEGORY_SUBCATEGORY_DATA = {
  categories: [
    {
      id: 1,
      name: "Housing",
      icon: HomeIcon,
      subcategories: [
        { id: 1, name: "Rent/Mortgage", icon: ApartmentIcon },
        { id: 2, name: "Utilities", icon: FlashOnIcon },
        { id: 3, name: "Property Taxes", icon: AccountBalanceIcon },
        { id: 4, name: "Home Insurance", icon: SecurityIcon },
        { id: 5, name: "Maintenance & Repairs", icon: BuildIcon },
      ],
    },
    {
      id: 2,
      name: "Transportation",
      icon: DirectionsCarIcon,
      subcategories: [
        { id: 1, name: "Fuel", icon: LocalGasStationIcon },
        { id: 2, name: "Car Payments", icon: PaymentsIcon },
        { id: 3, name: "Public Transport", icon: DirectionsBusIcon },
        { id: 4, name: "Vehicle Insurance", icon: VerifiedUserIcon },
        { id: 5, name: "Vehicle Maintenance", icon: BuildCircleIcon },
        { id: 6, name: "Parking & Tolls", icon: LocalParkingIcon },
      ],
    },
    {
      id: 3,
      name: "Food",
      icon: RestaurantIcon,
      subcategories: [
        { id: 1, name: "Groceries", icon: ShoppingCartIcon },
        { id: 2, name: "Dining Out", icon: RestaurantMenuIcon },
        { id: 3, name: "Coffee & Snacks", icon: LocalCafeIcon },
        { id: 4, name: "Meal Delivery Services", icon: DeliveryDiningIcon },
      ],
    },
    {
      id: 4,
      name: "Health & Wellness",
      icon: HealthAndSafetyIcon,
      subcategories: [
        { id: 1, name: "Health Insurance", icon: LocalHospitalIcon },
        { id: 2, name: "Medical Bills", icon: ReceiptIcon },
        { id: 3, name: "Medications", icon: HealingIcon },
        { id: 4, name: "Fitness", icon: FitnessCenterIcon },
        { id: 5, name: "Therapy/Counseling", icon: PsychologyIcon },
      ],
    },
    {
      id: 5,
      name: "Entertainment & Recreation",
      icon: SportsEsportsIcon,
      subcategories: [
        { id: 1, name: "Subscriptions", icon: SubscriptionsIcon },
        { id: 2, name: "Movies & Events", icon: LocalMoviesIcon },
        { id: 3, name: "Sports & Hobbies", icon: SportsIcon },
        { id: 4, name: "Vacations/Travel", icon: AirplanemodeActiveIcon },
      ],
    },
    {
      id: 6,
      name: "Personal Care",
      icon: SpaIcon,
      subcategories: [
        { id: 1, name: "Haircuts & Grooming", icon: ContentCutIcon },
        { id: 2, name: "Skincare & Beauty Products", icon: FaceIcon },
        {
          id: 3,
          name: "Clothing & Accessories",
          icon: DryCleaningOutlinedIcon,
        },
      ],
    },
    {
      id: 7,
      name: "Financial Obligations",
      icon: AccountBalanceWalletIcon,
      subcategories: [
        { id: 1, name: "Debt Repayment", icon: MoneyOffIcon },
        { id: 3, name: "Taxes", icon: GavelIcon },
      ],
    },
    {
      id: 8,
      name: "Education",
      icon: SchoolIcon,
      subcategories: [
        { id: 1, name: "Tuition Fees", icon: AccountBalanceIcon },
        { id: 2, name: "Books & Supplies", icon: BookIcon },
        { id: 3, name: "Online Courses", icon: LaptopIcon },
        { id: 4, name: "School Fees", icon: LocalLibraryIcon },
      ],
    },
    {
      id: 9,
      name: "Gifts & Donations",
      icon: RedeemIcon,
      subcategories: [
        {
          id: 1,
          name: "Charitable Contributions",
          icon: VolunteerActivismIcon,
        },
        { id: 2, name: "Gifts for Family & Friends", icon: CardGiftcardIcon },
      ],
    },
    {
      id: 10,
      name: "Family & Children",
      icon: ChildFriendlyIcon,
      subcategories: [
        { id: 1, name: "Childcare", icon: ChildCareIcon },
        { id: 2, name: "Education", icon: SchoolIcon },
        { id: 3, name: "Baby Essentials", icon: BabyChangingStationIcon },
      ],
    },
    {
      id: 11,
      name: "Miscellaneous",
      icon: MoreHorizIcon,
      subcategories: [
        { id: 1, name: "Pet Care", icon: PetsIcon },
        { id: 2, name: "Household Supplies", icon: CleaningServicesIcon },
      ],
    },
    // New Incomes category
    {
      id: 12,
      name: "Incomes",
      icon: AttachMoneyIcon,
      subcategories: [
        { id: 1, name: "Salary", icon: BusinessCenterIcon },
        { id: 2, name: "Freelancing", icon: PaidIcon },
        { id: 4, name: "Gifts", icon: CardGiftcardIcon },
      ],
    },
    {
      id: 13,
      name: "Savings & Investments",
      icon: SavingsIcon,
      subcategories: [
        { id: 1, name: "Life Insurance (LIC)", icon: VerifiedUserIcon },
        { id: 2, name: "Mutual Funds", icon: GavelIcon },
        {
          id: 3,
          name: "Public Provident Fund (PPF)",
          icon: AccountBalanceIcon,
        },
        {
          id: 4,
          name: "National Pension Scheme (NPS)",
          icon: HealthAndSafetyIcon,
        },
        { id: 5, name: "Recurring Deposit (RD)", icon: ReceiptIcon },
        { id: 6, name: "Fixed Deposit (FD)", icon: AccountBalanceWalletIcon },
      ],
    },
  ],
};
