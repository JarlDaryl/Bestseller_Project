import React from 'react'
import ProductComponent from '../Product/ProductComponent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box, { BoxProps } from '@mui/material/Box';

function Item(props) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : '#fff',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        p: 1,
        m: 1,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function OrderComponent({ order }) {
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
              <li>Created at: {order.createdAt}</li>
              <li>Delivery Date: {order.deliveryDate}</li>
            </ul>
          </AccordionSummary>
          <ProductComponent key={order.id} order={order} />
        </Accordion>
      </Item>
    </div>
  )
}