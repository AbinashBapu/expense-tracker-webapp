"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import {
  Avatar,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { MENUS } from "@/data/menu";
import { usePathname } from "next/navigation"; // import useRouter

export default function SideNavBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const pathName = usePathname();
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <Box
        sx={{
          backgroundColor: "#1876d2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 2,
          pb: 2,
        }}
      >
        <Box>
          <Avatar
            alt="Abinash pradhan"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            sx={{ height: 100, width: 100, mb: 1 }}
          />
        </Box>

        <Typography variant="subtitle1" sx={{ color: "white" }}>
          Abinash Pradhan
        </Typography>
        <Typography variant="caption" sx={{ color: "white" }}>
          abinash.pradhan@gmail.com
        </Typography>
      </Box>
      <Divider />

      <List>
        {MENUS.map((menu, index) => (
          <ListItem key={menu.name + "__" + index} disablePadding>
            <ListItemButton href={menu.url} selected={pathName === menu.url}>
              <ListItemIcon>
                <menu.icon />
              </ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      {!open && (
        <Stack spacing={2}>
          <Box sx={{ color: "white", cursor: "pointer" }}>
            {MENUS.map((menu) => (
              <Box key={menu.name}>
                <Tooltip title={menu.name} placement="right">
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    href={menu.url}
                    sx={{
                      mt: 2,
                      mb: 2,
                      backgroundColor: pathName === menu.url ? "#07539d" : "",
                    }}
                  >
                    <menu.icon />
                  </IconButton>
                </Tooltip>
                <Divider />
              </Box>
            ))}
          </Box>
        </Stack>
      )}
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </React.Fragment>
  );
}
