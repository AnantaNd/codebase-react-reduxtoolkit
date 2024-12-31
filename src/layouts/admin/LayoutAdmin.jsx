import { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Assignment,
  Badge,
  Home,
  Logout,
  ManageAccounts,
} from "@mui/icons-material";

const drawerWidth = 240;

const LayoutAdmin = () => {
  const menuItems = [
    { text: "Home", icon: <Home /> },
    { text: "Management User", icon: <ManageAccounts /> },
    { text: "Megalos", icon: <Badge /> },
    { text: "Assigment", icon: <Assignment /> },
  ];

  const navigate = useNavigate();
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isDrawerClosing, setDrawerClosing] = useState(false);

  // Handle toggling the drawer on mobile
  const toggleMobileDrawer = () => {
    if (!isDrawerClosing) {
      setMobileDrawerOpen(!isMobileDrawerOpen);
    }
  };

  // Handle drawer close animation
  const closeMobileDrawer = () => {
    setDrawerClosing(true);
    setMobileDrawerOpen(false);
  };

  const onDrawerCloseAnimationEnd = () => setDrawerClosing(false);
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Drawer content
  const renderDrawerContent = () => (
    <div>
      <Toolbar className="flex items-center justify-center">
        <Typography variant="h6" noWrap>
          Admin Logo
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleMobileDrawer}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex items-center justify-between flex-grow">
            <h1>admin dashboard</h1>
            <IconButton color="inherit" edge="start" onClick={onLogout}>
              <Logout />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer for navigation */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={isMobileDrawerOpen}
          onClose={closeMobileDrawer}
          onTransitionEnd={onDrawerCloseAnimationEnd}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {renderDrawerContent()}
        </Drawer>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {renderDrawerContent()}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

// PropTypes for better type checking

export default LayoutAdmin;
