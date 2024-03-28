import React from 'react'
import TotalCurrentUserOrdersComponent from '@/component/Order/TotalCurrentUserOrdersComponent'
import HeaderMenuBarOrdersComponent from '@/component/HeaderMenuBar/HeaderMenuBarOrderComponent'

export default function DashboardPage() {
  return (
    <div>
      <div><HeaderMenuBarOrdersComponent/></div>
      <h1 className='user-dashboard-h1'>Your current orders</h1>
      <TotalCurrentUserOrdersComponent />

    </div>
  )
}