import HeaderMenuBarHomePageComponent from '@/component/HeaderMenuBar/HeaderMenuBarHomePageComponent'
import UserRegisterComponent from '@/component/User/UserRegisterComponent'
import React from 'react'

export default function UserRegisterPage() {

  return (
    <>
      <HeaderMenuBarHomePageComponent />
      <div className='register-page-container'>
        <UserRegisterComponent />
      </div>
    </>
  )
}


