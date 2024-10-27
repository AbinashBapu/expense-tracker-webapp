import { AppBar, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MENUS } from "@/data/menu";

export default function TopNavBar({ setOpen }: { setOpen: any }) {
  const pathName = usePathname();
  const [activeMenuName, setActiveMenuName] = useState("");
  useEffect(() => {
    MENUS.forEach((element) => {
      if (element.url === pathName) {
        setActiveMenuName(element.name);
      }
    });
  });
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setOpen((prev: any) => !prev)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          {activeMenuName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
