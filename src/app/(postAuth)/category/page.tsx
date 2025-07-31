// https://dribbble.com/shots/5450312-Expenses-Mileage-Tracker-Dashboard-Design-V2/attachments/1180110?mode=media
"use client";
import { CATEGORY_SUBCATEGORY_DATA } from "@/data/categorySubCategory";
import { StarBorder } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CategoryForm from "@/components/feature/categoryForm";

export default function page() {
  const [categoryId, setCategoryId] = useState(-1);
  const handleClick = (id: number) => {
    setCategoryId(categoryId == id ? -1 : id);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const options = ["Edit", "View Sub Category"];

  const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" size="small">
          Add Category
        </Button>
      </Box>

      <Grid container spacing={2}>
        {CATEGORY_SUBCATEGORY_DATA.categories.map((category) => (
          <Grid size={3} key={category.id}>
            <Tooltip
              title={`${category.name} has ${category.subcategories.length} sub categories.`}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                  backgroundColor: "#8080801c",
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <IconButton>
                    <category.icon />
                  </IconButton>
                  <Typography sx={{ mt: 1 }}>
                    {category.name} ({category.subcategories.length})
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClickMore}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    elevation={0}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} onClick={handleClose}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 6 }}>
        <Box>
          <Typography variant="h6">
            Sub Categories{" "}
            <span style={{ color: "green" }}>
              ({CATEGORY_SUBCATEGORY_DATA.categories[12].name})
            </span>
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" size="small">
            Add Sub Category
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}></Box>

      <Grid container spacing={2}>
        {CATEGORY_SUBCATEGORY_DATA.categories[12].subcategories.map(
          (subCategory) => (
            <Grid size={3} key={subCategory.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                  backgroundColor: "#8080801c",
                  borderRadius: 1,
                }}
              >
                {" "}
                <Box sx={{ display: "flex" }}>
                  <IconButton>
                    <subCategory.icon />
                  </IconButton>
                  <Typography sx={{ mt: 1 }}>{subCategory.name}</Typography>
                </Box>
                <Box>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClickMore}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    elevation={0}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} onClick={handleClose}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            </Grid>
          )
        )}
      </Grid>

      <CategoryForm />
    </Fragment>
  );
}
