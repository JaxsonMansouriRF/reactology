import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useThemeContext } from '../../utils/Context/ThemeContext.jsx';

const Body = ({
  children,
  fullHeight = true, // optionally make it fill remaining screen height
}) => {
  const { theme, themeMode, toggleTheme } = useThemeContext();
  const { TEXT_COLOR, BACKGROUND_COLOR } = theme;
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: fullHeight ? 'calc(100vh - 290px)' : 'auto', // subtract header/footer height
        backgroundColor: BACKGROUND_COLOR,
        color: TEXT_COLOR,
        display: 'flex',
        flexDirection: 'column',
        py: { xs: 3, sm: 4 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Optional content wrapper */}
        <Paper
          elevation={1}
          sx={{
            flexGrow: 1,
            backgroundColor: '#fff',
            borderRadius: 2,
            p: { xs: 2, sm: 3, md: 4 },
            minHeight: '60vh',
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default Body;
