import React from 'react'
import { useEffect, useState } from 'react';
import { getUserOrdersFromDatabase } from '@/api/OrdersAPIFetch';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Box, { BoxProps } from '@mui/material/Box';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function TotalCurrentUserOrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  let userId;
useEffect(() => {
  const user = window.sessionStorage.getItem('user');
  if (user) {
    console.log(user)
    const userObj = JSON.parse(user);
    userId = userObj.data.id;
    console.log(userId)
  }
}, []);


  useEffect(() => {
    const getAllOrdersByUserAux = async () => {
      if (!userId) {
        console.log('userId is undefined or null');
        return;
      }
      try {
        console.log('Fetching orders for userId:', userId);
        let ordersByUserAux = await getUserOrdersFromDatabase(userId);
        setOrders(ordersByUserAux.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    getAllOrdersByUserAux();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>Orders for user {userId}</h2>
        {orders && orders.map((order) => {
          return <div key={order.id}>
            <h3>Order {order.id}</h3>
            <span>Status: {order.status}</span>
            <span>Total: {order.total}</span>
          </div>
        })}
      </div>
    </div>
  )
}


{/* 
      <h1>Current Orders</h1>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Name of order
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
              <Item>Product 1</Item>
              <Item>Product 2</Item>
              <Item>Product 3</Item>
            </Box>
          </AccordionDetails>
        </Accordion>
      </div> */}