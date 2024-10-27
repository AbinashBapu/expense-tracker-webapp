"use client";
import SideNavBar from "@/components/common/sidebar";
import TopNavBar from "@/components/common/topnav";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function postAuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      <nav style={{ position: "sticky", top: "0", zIndex: 1 }}>
        <TopNavBar setOpen={setOpen} />
      </nav>
      <Box
        sx={{
          width: "64px",
          position: "fixed",
          backgroundColor: "#2E76D2",
          textAlign: "center",
          height: "1",
          paddingTop: 2,
        }}
      >
        <SideNavBar open={open} setOpen={setOpen} />
      </Box>

      <Box ml={9} mt={2} mr={2}>
        {children}
      </Box>
    </section>
  );
}
