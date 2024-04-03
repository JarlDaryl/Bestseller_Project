import UserProfileComponent from '../component/User/UserProfileComponent'
import HeaderMenuBarOrdersComponent from '@/component/HeaderMenuBar/HeaderMenuBarOrderComponent'
import React from 'react'

export default function UserProfilePage() {
  return (
    <div>
      <HeaderMenuBarOrdersComponent />
      <div className='profile-page-container'><UserProfileComponent/></div>
    </div>
  )
}
