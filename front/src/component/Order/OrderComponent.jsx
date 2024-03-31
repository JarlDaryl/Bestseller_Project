import React from 'react'
import ProductComponent from '../Product/ProductComponent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import ConfirmOrderComponent from './ConfirmOrderComponent';

function Item(props) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#EBE7DB' : '#EBE7DB',
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#EBE7DB' : '#EBE7DB',
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

export default function OrderComponent({ order, isAddToOrderClicked }) {
  return (
    <div >
      <Item status={order.status} >
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <ul className='order-list-container'>
              <li className='order-list'>Order {order._id}</li>
              <li className='order-list'>Status: {order.status}</li>
              <li className='order-list'>Created at: {order.createdAt}</li>
              <li className='order-list'>Delivery Date: {order.deliveryDate}</li>
            </ul>
          </AccordionSummary>
          <ProductComponent key={order.id} order={order} />
          <ConfirmOrderComponent isAddToOrderClicked={isAddToOrderClicked} />
        </Accordion>
      </Item>
    </div>
  )
}