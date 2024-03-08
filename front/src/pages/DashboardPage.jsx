import React from 'react'
import TotalCurrentUserOrdersComponent from '@/component/Order/TotalCurrentUserOrdersComponent'
import GenerateProductSuggestionComponent from '@/component/Product/GenerateProductSuggestionComponent'

export default function UserDashboardPage() {
  return (
    <div>
      <h1>Current User Orders</h1>
      <TotalCurrentUserOrdersComponent />
      <GenerateProductSuggestionComponent/>
    </div>
  )
}