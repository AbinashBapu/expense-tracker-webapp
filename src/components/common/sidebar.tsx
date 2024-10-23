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
import { useState } from "react";

import { Divider, IconButton, Stack, Toolbar, Tooltip } from "@mui/material";
import { MENUS } from "@/data/menu";

export default function SideNavBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
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
                    sx={{ mt: 2, mb: 2 }}
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
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </React.Fragment>
  );
}
