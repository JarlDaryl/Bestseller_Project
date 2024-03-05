import React from 'react'
import CurrentOrdersComponent from '@/component/Order/TotalCurrentUserOrdersComponent'
import CurrentUserOrdersComponent from '@/component/Order/TotalCurrentUserOrdersComponent'
import TotalCurrentUserOrdersComponent from '@/component/Order/TotalCurrentUserOrdersComponent'

export default function UserDashboardPage() {
  return (
    <div>
      <h1>Current User Orders</h1>
      <TotalCurrentUserOrdersComponent />
    </div>
  )
}