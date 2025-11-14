import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useThemeContext } from '../../utils/Context/ThemeContext.jsx';
import { Link } from 'react-router-dom';

const Header = ({ pageName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { theme, themeMode, toggleTheme } = useThemeContext();
  const { PRIMARY_COLOR, TEXT_COLOR, ACCENT_COLOR } = theme;

  const handleMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleNotificationClick = () => console.log('Notifications clicked');
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);

  const navItems = ['Overview', 'Events', 'Attendees', 'Reporting'];

  return (
    <>
      {/* App Bar Header */}
      <AppBar position="static" sx={{ backgroundColor: PRIMARY_COLOR, boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left: Logo + Title */}
          <Box display="flex" alignItems="center">
            <CalendarTodayIcon sx={{ color: ACCENT_COLOR, mr: 1.5 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                display: { xs: 'none', sm: 'block' },
                color: TEXT_COLOR,
              }}
            >
              {pageName}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                display: { xs: 'block', sm: 'none' },
                color: TEXT_COLOR,
              }}
            >
              EventFlow
            </Typography>
          </Box>

          {/* Middle: Navigation (Desktop Only) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Link to="/attendees"> {item}</Link>
            ))}
          </Box>

          {/* Right: Actions */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Create Event Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '999px',
                display: { xs: 'none', sm: 'inline-flex' },
                backgroundColor: ACCENT_COLOR,
                '&:hover': { backgroundColor: '#4F46E5' },
              }}
            >
              + Create Event
            </Button>

            {/* Notifications */}
            <IconButton onClick={handleNotificationClick} sx={{ color: TEXT_COLOR }}>
              <Badge color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Profile */}
            <IconButton onClick={handleProfileClick} sx={{ color: TEXT_COLOR }}>
              <AccountCircle />
            </IconButton>

            {/* Mobile Menu */}
            <IconButton
              onClick={handleMenuToggle}
              sx={{ color: TEXT_COLOR, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => console.log('Profile Clicked')}>Profile</MenuItem>
        <MenuItem onClick={() => console.log('Settings Clicked')}>Settings</MenuItem>
        <MenuItem onClick={() => console.log('Logout Clicked')}>Logout</MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={isMobileMenuOpen} onClose={handleMenuToggle}>
        <Box
          sx={{
            backgroundColor: PRIMARY_COLOR,
            color: TEXT_COLOR,
            pt: 2,
            pb: 2,
          }}
        >
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton onClick={handleMenuToggle}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  backgroundColor: ACCENT_COLOR,
                  color: '#FFF',
                  mt: 1,
                  borderRadius: 2,
                  '&:hover': { backgroundColor: '#4F46E5' },
                }}
              >
                + Create Event
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
