'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Slide,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  message: string;
  type?: NotificationType;
  onClose: () => void;
}

const getTypeColor = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return '#24D75F';
    case 'error':
      return '#ff4444';
    case 'warning':
      return '#ffbb33';
    case 'info':
    default:
      return '#150089';
  }
};

export default function Notification({
  message,
  type = 'info',
  onClose,
}: NotificationProps) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  return (
    <Slide direction="left" in={show} mountOnEnter unmountOnExit>
      <Paper
        elevation={3}
        sx={{
          minWidth: 300,
          maxWidth: 400,
          minHeight: '50px',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            borderLeft: `4px solid ${getTypeColor(type)}`,
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              flexGrow: 1,
              color: 'white',
            }}
          >
            {message}
          </Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ 
              ml: 1,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
    </Slide>
  );
} 