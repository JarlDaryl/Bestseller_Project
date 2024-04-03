import React from 'react'
import { Button } from '@mui/material'
import { useState } from 'react'
import { resetPassword } from '@/api/PasswordAPIFetch'
import { useRouter } from 'next/router'

export default function ForgotPasswordComponent() {
  const [newPassword, setNewPassword] = useState("")
  const [reenterPassword, setReenterPassword] = useState("")
  const router = useRouter();

  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value)
  }

  const reenterPasswordHandler = (e) => {
    setReenterPassword(e.target.value)
  }

  const saveResetPasswordHandler = async (e) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/;

    if (!passwordRegex.test(newPassword) || !passwordRegex.test(reenterPassword)) {
      alert('Password must be at least 10 characters and include at least one uppercase letter, one lowercase letter, and one number');
      return;
    }
    if (newPassword !== reenterPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await resetPassword(newPassword);
      alert('Password reset successfully');
      router.push('/UserLoginPage');
    } catch (error) {
      console.error('Failed to reset password:', error);
      alert('Failed to reset password');
    }
  }

  return (
    <div>
      <h2>Create new password</h2>
      <h3>We'll ask for this password whenever you Sign-In.</h3>
      <div>
        <label>New password</label>
        <input type='password' name='password' value={newPassword} onChange={newPasswordHandler} />
        <p>Passwords must be at least 10 characters.</p>
      </div>
      <div>
        <label>Re-enter password</label>
        <input type='password' name='password' value={reenterPassword} onChange={reenterPasswordHandler} />
      </div>
      <Button type='submit' variant='contained' onClick={saveResetPasswordHandler}>Save changes & Sign-In</Button>
      <div>
        <h2>Secure password tips:</h2>
        <ul>
          <li>Use at least 10 characters, a combination of numbers and letters is best.</li>
          <li>Do not use the same password you have used with us previously.</li>
          <li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.</li>
          <li>Do not use the same password for multiple online accounts.</li>
        </ul>
      </div>
    </div>
  )
}
