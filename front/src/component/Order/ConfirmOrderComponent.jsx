import React from 'react'
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function ConfirmOrderComponent(isAddToOrderClicked) {
  return (
    <div className='confirm-order-button-container'>{isAddToOrderClicked &&
      <Button
        variant="contained"
        disableElevation
        className='confirm-order-button'
      >         <Link href={{
        pathname: 'OrderSummaryPage',
      }}>Confirm your order</Link>
      </Button>}</div>
  )
}
