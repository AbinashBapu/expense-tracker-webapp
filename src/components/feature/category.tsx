import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Menu,
  MenuItem,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CATEGORY_SUBCATEGORY_DATA } from "@/data/categorySubCategory";

export default function CategoryList() {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ maxHeight: "350px", overflowY: "auto" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            pt: 2,
            pb: 2,
            zIndex: 1,
          }}
        >
          <Box>
            <Typography variant="h6" component="div">
              Category
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" size="small">
              View
            </Button>
          </Box>
        </Box>
        {CATEGORY_SUBCATEGORY_DATA.categories.map((item) => (
          <Box key={item.id}>
            <List dense={dense}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
            </List>
            <Divider />
          </Box>
        ))}

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>View Details</MenuItem>
          <MenuItem onClick={handleClose}>Edit Category</MenuItem>
          <MenuItem onClick={handleClose}>View Sub Category</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}
