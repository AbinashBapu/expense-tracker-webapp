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
  Card,
  CardContent,
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
        <Accordion key={idx} defaultExpanded>
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
            <Box
              display="flex"
              flexWrap="wrap"
              gap={2}
              justifyContent="flex-start"
            >
              {category.subCategories.map((sub, subIdx) => (
                <Card
                  key={subIdx}
                  elevation={3}
                  sx={{
                    flex: "0 0 calc(33.33% - 16px)",
                    minWidth: 240,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {sub.subcategoryName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category:
                        <strong sx={{ ml: 1 }}>{category.categoryName}</strong>
                      </Typography>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mt: 2 }}
                    >
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Amount
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          ₹{sub.amount.toLocaleString()}
                        </Typography>
                      </Box>

                      <Box textAlign="right">
                        <Typography variant="body2" color="text.secondary">
                          Contribution
                        </Typography>
                        <Chip
                          label={sub.contributedPercentage}
                          size="small"
                          color="primary"
                          sx={{ fontWeight: 500 }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ExpenseSavingBreakdown;
