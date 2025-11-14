import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Search,
  Person,
  Email,
  Business,
  Phone,
  Badge,
  CheckCircle,
  Cancel,
  Schedule
} from '@mui/icons-material';

const Attendees = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock attendees data
  const mockAttendees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@apple.com',
      company: 'Apple Inc.',
      title: 'Senior Software Engineer',
      phone: '+1 (555) 123-4567',
      status: 'confirmed',
      registrationDate: '2024-01-15',
      eventName: 'Apple Annual Shareholder Meeting 2024'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@microsoft.com',
      company: 'Microsoft Corporation',
      title: 'Product Manager',
      phone: '+1 (555) 234-5678',
      status: 'pending',
      registrationDate: '2024-01-20',
      eventName: 'Microsoft Build Developer Conference'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@amazon.com',
      company: 'Amazon.com Inc.',
      title: 'Cloud Solutions Architect',
      phone: '+1 (555) 345-6789',
      status: 'confirmed',
      registrationDate: '2024-01-18',
      eventName: 'Amazon Web Services re:Invent 2024'
    },
    {
      id: 4,
      name: 'David Thompson',
      email: 'david.thompson@google.com',
      company: 'Alphabet Inc.',
      title: 'DevOps Engineer',
      phone: '+1 (555) 456-7890',
      status: 'cancelled',
      registrationDate: '2024-01-12',
      eventName: 'Google I/O Developer Conference'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      email: 'lisa.wang@tesla.com',
      company: 'Tesla Inc.',
      title: 'Battery Technology Lead',
      phone: '+1 (555) 567-8901',
      status: 'confirmed',
      registrationDate: '2024-01-25',
      eventName: 'Tesla Battery Day 2024'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      email: 'robert.martinez@jpmorgan.com',
      company: 'JPMorgan Chase & Co.',
      title: 'Investment Analyst',
      phone: '+1 (555) 678-9012',
      status: 'confirmed',
      registrationDate: '2024-01-22',
      eventName: 'JPMorgan Chase Annual Investor Day'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return { bg: '#4caf50', text: '#ffffff', icon: CheckCircle };
      case 'pending':
        return { bg: '#ff9800', text: '#ffffff', icon: Schedule };
      case 'cancelled':
        return { bg: '#f44336', text: '#ffffff', icon: Cancel };
      default:
        return { bg: '#757575', text: '#ffffff', icon: Person };
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredAttendees = mockAttendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 'bold',
            mb: 2,
            letterSpacing: '0.5px'
          }}
        >
          Event Attendees
        </Typography>
        <Divider
          sx={{
            backgroundColor: '#90caf9',
            height: '3px',
            width: '100px',
            mx: 'auto',
            mb: 2
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: '#b0b0b0',
            fontWeight: 300,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Manage and track attendee registrations for corporate events
        </Typography>
      </Box>

      {/* Search Box */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search attendees by name, company, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#90caf9' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 500,
            mx: 'auto',
            display: 'block',
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#2a2a2a',
              color: 'white',
              '& fieldset': {
                borderColor: '#404040',
              },
              '&:hover fieldset': {
                borderColor: '#90caf9',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#90caf9',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#b0b0b0',
              opacity: 1,
            },
          }}
        />
      </Box>

      <Grid container spacing={4} alignItems="stretch">
        {filteredAttendees.length > 0 ? (
          filteredAttendees.map((attendee) => {
            const statusInfo = getStatusColor(attendee.status);
            const StatusIcon = statusInfo.icon;

            return (
              <Grid item xs={12} sm={6} md={4} key={attendee.id} sx={{ display: 'flex' }}>
                <Card
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: 320,
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
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${statusInfo.bg}, ${statusInfo.bg}80)`,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                    {/* Header with avatar and status */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: '#90caf9',
                          color: '#1a1a1a',
                          width: 56,
                          height: 56,
                          mr: 2,
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}
                      >
                        {getInitials(attendee.name)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            mb: 0.5,
                            fontSize: '1.1rem'
                          }}
                        >
                          {attendee.name}
                        </Typography>
                        <Chip
                          icon={<StatusIcon sx={{ fontSize: '14px' }} />}
                          label={attendee.status.toUpperCase()}
                          size="small"
                          sx={{
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.text,
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Contact Information */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Email sx={{ mr: 2, color: '#90caf9', fontSize: 18 }} />
                        <Typography variant="body2" sx={{ color: '#e3f2fd' }}>
                          {attendee.email}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Business sx={{ mr: 2, color: '#90caf9', fontSize: 18 }} />
                        <Typography variant="body2" sx={{ color: '#e3f2fd' }}>
                          {attendee.company}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Badge sx={{ mr: 2, color: '#90caf9', fontSize: 18 }} />
                        <Typography variant="body2" sx={{ color: '#e3f2fd' }}>
                          {attendee.title}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Phone sx={{ mr: 2, color: '#90caf9', fontSize: 18 }} />
                        <Typography variant="body2" sx={{ color: '#e3f2fd' }}>
                          {attendee.phone}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Registration Info */}
                    <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid #404040' }}>
                      <Typography variant="caption" sx={{ color: '#b0b0b0', display: 'block', mb: 0.5 }}>
                        Registered: {new Date(attendee.registrationDate).toLocaleDateString()}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#81c784',
                          fontWeight: 500,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {attendee.eventName}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                border: '2px dashed #666',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#999',
                  mb: 2,
                  fontWeight: 300,
                }}
              >
                No attendees found
              </Typography>
              <Typography variant="body2" sx={{ color: '#777' }}>
                {searchTerm ? 'Try adjusting your search terms' : 'No attendees registered yet'}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Attendees;
