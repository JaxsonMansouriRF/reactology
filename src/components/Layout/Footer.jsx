import React from 'react';
import { Box, Typography, Link, Divider, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useThemeContext } from '../../utils/Context/ThemeContext.jsx';

const Footer = () => {
  const { theme, themeMode, toggleTheme } = useThemeContext();
  const { PRIMARY_COLOR, TEXT_COLOR, ACCENT_COLOR } = theme;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: PRIMARY_COLOR,
        color: TEXT_COLOR,
        mt: 'auto',
        py: 4,
        px: { xs: 2, sm: 6, md: 8 },
        boxShadow: '0 -1px 4px rgba(0,0,0,0.2)',
      }}
    >
      {/* Top Row — Links and Branding */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        {/* Brand / Logo */}
        <Typography variant="h6" sx={{ fontWeight: 600, color: ACCENT_COLOR }}>
          EventFlow
        </Typography>

        {/* Navigation Links */}
        <Stack direction="row" spacing={3}>
          {['Overview', 'Events', 'Attendees', 'Reporting'].map((item) => (
            <Link
              key={item}
              href="#"
              underline="none"
              sx={{
                color: TEXT_COLOR,
                fontSize: 14,
                fontWeight: 500,
                '&:hover': { color: ACCENT_COLOR },
              }}
            >
              {item}
            </Link>
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.15)', mb: 2 }} />

      {/* Bottom Row — Socials and Copyright */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        {/* Social Icons */}
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            href="https://github.com"
            target="_blank"
            rel="noopener"
            sx={{ color: TEXT_COLOR, '&:hover': { color: ACCENT_COLOR } }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            size="small"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener"
            sx={{ color: TEXT_COLOR, '&:hover': { color: ACCENT_COLOR } }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            size="small"
            href="https://twitter.com"
            target="_blank"
            rel="noopener"
            sx={{ color: TEXT_COLOR, '&:hover': { color: ACCENT_COLOR } }}
          >
            <TwitterIcon />
          </IconButton>
        </Stack>

        {/* Copyright */}
        <Typography variant="body2" sx={{ opacity: 0.7, textAlign: 'center' }}>
          © {new Date().getFullYear()} EventFlow. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
