import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

export default function OrderComponent({order}) {
    
  return (
    <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <ul>Order {order._id}</ul>
            <li>Status: {order.status}</li>
            <li>Total: {order.total}</li>
            <li>Created at: {order.createdAt}</li>
            <li>Delivery Date: {order.deliveryDate}</li>
          </AccordionSummary>
          <AccordionDetails><p>hello</p> 
          
             {/* <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
              <Item><div>
                <h4>Products:</h4>
                {order.products.map((product, index) => (
                  <div key={index}>
                    { Replace with actual product properties }
                    <span>Product Name: {product.name}</span>
                    <span>Product Price: {product.price}</span>
                  </div>
                ))}
              </div>
            </Item>
            </Box> */}
          </AccordionDetails>
        </Accordion>
    </div>
  )
}