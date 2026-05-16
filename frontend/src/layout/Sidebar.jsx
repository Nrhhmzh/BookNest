import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
} from "@mui/material";

import BookIcon from "@mui/icons-material/Book";
import AddIcon from "@mui/icons-material/Add";

import { Link, useLocation } from "react-router-dom";

import logo from "@/assets/logo.png";

const drawerWidth = 240;

export default function Sidebar() {
  const location = useLocation();
  const theme = useTheme();

  // helper to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "none",
          boxShadow: "none",
        },
      }}
    >
      {/* TOP SECTION */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2.5,
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{
            height: 44,
          }}
        />
      </Box>

      {/* MENU SECTION */}
      <Box sx={{ p: 2 }}>
        <List sx={{ p: 0, gap: 0.75, display: "flex", flexDirection: "column" }}>
          {/* BOOKS */}
          <ListItemButton
            component={Link}
            to="/books"
            selected={isActive("/books")}
            sx={{
              borderRadius: 1.5,
              px: 1.5,
              py: 1.2,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              border: isActive("/books")
                ? `2px solid ${theme.palette.secondary.main}`
                : "2px solid transparent",
              backgroundColor: "transparent",
              color: isActive("/books")
                ? theme.palette.secondary.main
                : "#666",
              "& .MuiListItemIcon-root": {
                color: isActive("/books")
                  ? theme.palette.secondary.main
                  : "#666",
                minWidth: 40,
                transition: "all 0.2s ease",
              },
              "& .MuiListItemText-primary": {
                fontWeight: 500,
                fontSize: "0.95rem",
                color: isActive("/books")
                  ? theme.palette.secondary.main
                  : "#666",
              },
              "&:hover": {
                backgroundColor: "rgba(246, 177, 206, 0.08)",
                "& .MuiListItemIcon-root": {
                  color: theme.palette.secondary.main,
                  transform: "translateX(2px)",
                },
                "& .MuiListItemText-primary": {
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Books" />
          </ListItemButton>

          {/* ADD BOOK */}
          <ListItemButton
            component={Link}
            to="/books/add"
            selected={isActive("/books/add")}
            sx={{
              borderRadius: 1.5,
              px: 1.5,
              py: 1.2,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              border: isActive("/books/add")
                ? `2px solid ${theme.palette.secondary.main}`
                : "2px solid transparent",
              backgroundColor: "transparent",
              color: isActive("/books/add")
                ? theme.palette.secondary.main
                : "#666",
              "& .MuiListItemIcon-root": {
                color: isActive("/books/add")
                  ? theme.palette.secondary.main
                  : "#666",
                minWidth: 40,
                transition: "all 0.2s ease",
              },
              "& .MuiListItemText-primary": {
                fontWeight: 500,
                fontSize: "0.95rem",
                color: isActive("/books/add")
                  ? theme.palette.secondary.main
                  : "#666",
              },
              "&:hover": {
                backgroundColor: "rgba(246, 177, 206, 0.08)",
                "& .MuiListItemIcon-root": {
                  color: theme.palette.secondary.main,
                  transform: "translateX(2px)",
                },
                "& .MuiListItemText-primary": {
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Book" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}