import React from 'react'
import TotalCurrentUserOrdersComponent from '@/component/Order/TotalCurrentUserOrdersComponent'


export default function UserDashboardPage() {
  return (
    <div>
      <h1 className='user-dashboard-h1'>Your current orders</h1>
      <TotalCurrentUserOrdersComponent />
    </div>
  )
}