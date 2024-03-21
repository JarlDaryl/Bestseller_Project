import React from 'react'
import TotalCurrentUserOrdersComponent from '@/component/Order/TotalCurrentUserOrdersComponent'
import ProfileComponent from '@/component/User/ProfileMenuComponent'
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function DashboardPage() {
  return (
    <div>
      <ProfileComponent />
      <h1 className='user-dashboard-h1'>Your current orders</h1>
      <TotalCurrentUserOrdersComponent />
      
    </div>
  )
}