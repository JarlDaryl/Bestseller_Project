import React from 'react'
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function ConfirmOrderComponent(isAddToOrderClicked) {
  return (
    <div className='confirm-order-button'>{isAddToOrderClicked &&
        <Button
          // variant="contained"
          // disableElevation
          sx={{ backgroundColor: '#DFE7DB', '&:hover': { backgroundColor: '#D7D0BC' }, paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 7, paddingRight: 7, fontWeight: 'bold', fontSize: 15 }}
        >         <Link href={{
          pathname: 'OrderSummaryPage',
        }}>Confirm your order</Link>
        </Button>}</div>
  )
}
