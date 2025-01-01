import { useState } from "react";
import {
  AppBar,
  Box,
  Breadcrumbs,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Adb,
  Assignment,
  Badge,
  Home,
  Logout,
  ManageAccounts,
  NavigateNext,
  SpaceDashboard,
} from "@mui/icons-material";

const drawerWidth = 240;

const LayoutAdmin = () => {
  const menuItems = [
    { text: "Home", icon: <Home fontSize="small" />, path: "/admin/home" },
    {
      text: "Management User",
      icon: <ManageAccounts fontSize="small" />,
      path: "/admin/management-user",
    },
    {
      text: "Megalos",
      icon: <Badge fontSize="small" />,
      path: "/admin/megalos",
    },
    {
      text: "Assignment",
      icon: <Assignment fontSize="small" />,
      path: "/admin/assignment",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isDrawerClosing, setDrawerClosing] = useState(false);
  const [activePath, setActivePath] = useState("");

  const pathnames = location.pathname.split("/").filter((x) => x);

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
      <Toolbar className="flex gap-2 items-center justify-start bgblu">
        <Adb />
        <h1 className="text-2xl">Logo</h1>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => {
              navigate(item.path);
              setActivePath(item.text);
              if (isMobileDrawerOpen) closeMobileDrawer();
            }}
          >
            <ListItemButton
              sx={{
                bgcolor: activePath === item.text ? "#60a5fa" : "white",
              }}
            >
              <ListItemIcon
                sx={{
                  marginRight: "5px",
                  minWidth: "auto",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
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
          backgroundColor: "white",
          color: "black",
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
          <div className="flex items-center justify-between flex-grow ">
            <h1 className="uppercase text-2xl font-semibold">logo</h1>
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
        <main className="py-14" id="content">
          <section id="breadcrumbs">
            <Breadcrumbs
              sx={{ display: "flex", alignItems: "center", fontSize: "14px" }}
              separator={<NavigateNext fontSize="inherit" />}
            >
              <Link
                underline="hover"
                color="inherit"
                href="/"
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <SpaceDashboard fontSize="inherit" />
              </Link>
              <Link
                underline="hover"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <h1 className="capitalize">{pathnames[0]}</h1>
              </Link>
              <Link
                underline="hover"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <h1 className="capitalize">{pathnames[1]}</h1>
              </Link>
            </Breadcrumbs>
          </section>
          <section id="router_view">
            <div className="pt-6">
              <Outlet />
            </div>
          </section>
        </main>
      </Box>
    </Box>
  );
};

export default LayoutAdmin;
