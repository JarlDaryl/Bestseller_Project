import EmailResetPasswordComponent from '@/component/Password/EmailResetPasswordComponent'
import React from 'react'
import HeaderMenuBarHomePageComponent from '@/component/HeaderMenuBar/HeaderMenuBarHomePageComponent'

export default function ForgotPasswordPage() {
    return (
        <>
            <HeaderMenuBarHomePageComponent />
            <div className='password-assistance-container'>
                <EmailResetPasswordComponent />
            </div>
        </>
    )
}
