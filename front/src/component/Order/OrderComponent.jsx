import React from 'react'
import ProductComponent from '../Product/ProductComponent';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box, { BoxProps } from '@mui/material/Box';

function Item(props) {
  const { sx, status, ...other } = props;
  let borderColor;

  switch (status) {
    case 'confirmed':
      borderColor = '#42CC06';
      break;
    case 'pending':
      borderColor = '#FFEC00';
      break;
    case 'cancelled':
      borderColor = '#E50000';
      break;
    default:
      borderColor = (theme) =>
        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300';
  }

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : '#fff',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '2px solid',
        borderColor: borderColor,
        p: 1,
        m: 1,
        borderRadius: 5,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

  export default function OrderComponent({order}) {
    return (
      <div>
        <Item status={order.status}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <ul>Order {order._id}
              <li>Status: {order.status}</li>
              <li>Total: {order.total}</li>
              <li>Created at: {order.createdAt}</li>
              <li>Delivery Date: {order.deliveryDate}</li>
              </ul>
            </AccordionSummary>
            <ProductComponent order={order} />
          </Accordion>
          </Item>
      </div>
    )
  }