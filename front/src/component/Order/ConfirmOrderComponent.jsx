import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';

export default function ConfirmOrderComponent() {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  return (
    <div className='confirm-order-button-container'>
      <Button
        className='confirm-order-button'
        onClick={handleOpen}
      > Confirm your order
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className='order-confirmed-message'>
          <EditAttributesIcon className='order-confirmed-icon' />
          <Typography sx={{ mt: 1.5 }} className='order-confirmed-text'>
            Your order has been confirmed
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}