import { Box, Typography } from "@mui/material";

type IconLabelValue = {
  icon: any;
  label: string;
  value: string;
};

export default function IconTextLabel({ icon, label, value }: IconLabelValue) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box>{icon}</Box>
      <Box sx={{ ml: 1 }}>
        <Typography>{label} </Typography>
      </Box>
      <Box sx={{ ml: 1 }}>
        <Typography>{value}</Typography>
      </Box>
    </Box>
  );
}
