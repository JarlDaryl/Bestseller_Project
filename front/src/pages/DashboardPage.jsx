import React from 'react'
import TotalCurrentUserOrdersComponent from '@/component/Order/TotalCurrentUserOrdersComponent'
import ProfileComponent from '@/component/User/ProfileMenuComponent'
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function DashboardPage(isAddToOrderClicked) {
  return (
    <div>
      <ProfileComponent />
      <h1 className='user-dashboard-h1'>Your current orders</h1>
      <TotalCurrentUserOrdersComponent />
      {isAddToOrderClicked &&
        <Button
          // variant="contained"
          // disableElevation
          sx={{ backgroundColor: '#DFE7DB', '&:hover': { backgroundColor: '#D7D0BC' }, paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 7, paddingRight: 7, fontWeight: 'bold', fontSize: 15 }}
        >         <Link href={{
          pathname: 'OrderSummaryPage',
        }}>Confirm your order</Link>
        </Button>}
    </div>
  )
}