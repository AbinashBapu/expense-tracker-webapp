import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Button,
  Divider,
  Pagination,
  Stack,
  Tooltip,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function TransactionList() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          p: 1,
        }}
      >
        <Typography variant="h6">Transactions</Typography>
        <Tooltip title="Download Report In Excel">
          <Button variant="outlined">
            <CloudDownloadIcon />
          </Button>
        </Tooltip>
      </Box>

      <Divider />
      <Box>
        {[1, 2, 3, 3, 4, 5].map((item) => (
          <Card elevation={0} key={item}>
            <CardHeader
              avatar={
                <IconButton
                  aria-label="settings"
                  sx={{ backgroundColor: "gray", color: "white" }}
                >
                  <ShareIcon />
                </IconButton>
              }
              title={
                <Box>
                  <Typography
                    sx={{ color: "text.secondary" }}
                    variant="subtitle1"
                  >
                    Income (Saary)
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: item % 2 == 0 ? "#b02a37" : "#0d6efd",
                          fontWeight: "bold",
                        }}
                      >
                        Rs. 40,000.00
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ color: "text.secondary" }}
                        variant="subtitle2"
                      >
                        05-Feb-1992
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    - Salary credited from BIPROS to self
                  </Typography>
                </Box>
              }
              sx={{ p: 1 }}
            />
          </Card>
        ))}
      </Box>
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Pagination count={215} page={1} />
      </Box>
    </React.Fragment>
  );
}
