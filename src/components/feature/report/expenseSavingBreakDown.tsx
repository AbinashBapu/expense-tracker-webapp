// ExpenseBreakdown.tsx

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface SubCategory {
  subcategoryName: string;
  amount: number;
  contributedPercentage: string;
}

interface Category {
  categoryName: string;
  color: string;
  subCategories: SubCategory[];
}

interface Props {
  data: Category[];
}

const ExpenseSavingBreakdown: React.FC<Props> = ({ data }) => {
  return (
    <Box
      sx={{
        maxHeight: 400,
        overflowY: "auto",
      }}
    >
      {data.map((category, idx) => (
        <Accordion key={idx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "4px",
                    backgroundColor: category.color,
                  }}
                />
                <Typography fontWeight="bold">
                  {category.categoryName}
                </Typography>
              </Box>
              <Chip
                label={`${category.subCategories.length} items`}
                size="small"
                color="default"
              />
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <List dense>
              {category.subCategories.map((sub, subIdx) => (
                <React.Fragment key={subIdx}>
                  <ListItem
                    secondaryAction={
                      <Box textAlign="right">
                        <Typography variant="body2">
                          ₹{sub.amount.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {sub.contributedPercentage}
                        </Typography>
                      </Box>
                    }
                  >
                    <ListItemText primary={sub.subcategoryName} />
                  </ListItem>
                  {subIdx < category.subCategories.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ExpenseSavingBreakdown;
