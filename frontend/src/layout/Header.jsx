import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "background.paper", color: "text.primary" }} elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>

        {/* Avatar */}
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar />
        </IconButton>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
}