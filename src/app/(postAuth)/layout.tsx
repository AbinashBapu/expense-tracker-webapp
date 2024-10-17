import PersistentDrawerLeft from "@/components/common/side-top-navbar";
import SideNavBar from "@/components/common/sidebar";
import TopNavBar from "@/components/common/topnav";
import Box from "@mui/material/Box";

export default function postAuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>
        <TopNavBar />
        <SideNavBar />
      </nav>
      <Box ml={7}>{children}</Box>
    </section>
  );
}
