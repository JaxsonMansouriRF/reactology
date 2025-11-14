import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Avatar } from '@mui/material';
import { LocationOn, CalendarToday, Group, Business } from '@mui/icons-material';

const EventCard = ({ event }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return { bg: '#4caf50', text: '#ffffff' }; // Green
      case 'completed':
        return { bg: '#757575', text: '#ffffff' }; // Gray
      default:
        return { bg: '#2196f3', text: '#ffffff' }; // Blue
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Developer Conference':
        return '#ff9800';
      case 'Shareholder Meeting':
        return '#9c27b0';
      case 'Technology Conference':
        return '#00bcd4';
      case 'Product Launch':
        return '#f44336';
      case 'Investor Meeting':
        return '#795548';
      case 'Innovation Summit':
        return '#607d8b';
      case 'Corporate Social Responsibility':
        return '#8bc34a';
      default:
        return '#81c784';
    }
  };

  const statusColors = getStatusColor(event.status);

  return (
    <Card
      sx={{
        width: '250px',
        height: '250px',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#2a2a2a',
        color: 'white',
        border: '1px solid #404040',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          backgroundColor: '#333333',
          '& .status-chip': {
            transform: 'scale(1.05)',
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${getTypeColor(event.type)}, ${getTypeColor(event.type)}80)`,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        {/* Header with title and status */}
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              flex: 1,
              fontSize: '1.1rem',
              lineHeight: 1.3,
              pr: 2,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}
          >
            {event.title}
          </Typography>
          <Chip
            className="status-chip"
            label={event.status.toUpperCase()}
            size="small"
            sx={{
              backgroundColor: statusColors.bg,
              color: statusColors.text,
              fontWeight: 'bold',
              fontSize: '0.7rem',
              transition: 'transform 0.2s ease',
            }}
          />
        </Box>

        {/* Company info with avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ bgcolor: getTypeColor(event.type), mr: 2, width: 32, height: 32 }}>
            <Business sx={{ fontSize: 18 }} />
          </Avatar>
          <Typography variant="body1" sx={{ color: '#e3f2fd', fontWeight: 500 }}>
            {event.company}
          </Typography>
        </Box>

        {/* Event details */}
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <CalendarToday sx={{ mr: 2, color: '#90caf9', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#e3f2fd' }}>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <LocationOn sx={{ mr: 2, color: '#90caf9', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#e3f2fd', lineHeight: 1.4 }}>
              {event.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Group sx={{ mr: 2, color: '#90caf9', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#e3f2fd' }}>
              {event.attendees.toLocaleString()} attendees
            </Typography>
          </Box>
        </Box>

        {/* Event type badge */}
        <Box sx={{ mb: 0.5 }}>
          <Chip
            label={event.type}
            size="small"
            sx={{
              backgroundColor: `${getTypeColor(event.type)}20`,
              color: getTypeColor(event.type),
              border: `1px solid ${getTypeColor(event.type)}40`,
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#b0b0b0',
            lineHeight: 1.5,
            fontSize: '0.875rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
          }}
        >
          {event.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
