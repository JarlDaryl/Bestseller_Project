import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import {updateOrderInDatabase} from '../../api/OrdersAPIFetch'

export default function ConfirmOrderComponent() {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = useState(false);

  const handleOpen = () => {
    const updatedOrder = JSON.parse(sessionStorage.getItem('updatedOrder'));
    if (updatedOrder) {
      updateOrderInDatabase(updatedOrder)
        .then(() => {
          setOrderConfirmed(true);
          setOpen(true);
          setReload(!reload); 
        })
        .catch((error) => console.error('Failed to update order:', error));
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (orderConfirmed) {
      setTimeout(() => {
        window.location.reload(); 
      }, 1500); 
    }
  }, [reload]);

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