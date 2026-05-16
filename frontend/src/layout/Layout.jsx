import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from 'react-router-dom';

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        {/* Header */}
        <Header open={open} setOpen={setOpen} />

        {/* Page content */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
}