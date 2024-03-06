import React from 'react'
import { Button } from '@mui/material'

export default function ForgotPasswordComponent() {
  const [newPassword, setNewPassword] = useState("")
  const [reenterPassword, setReenterPassword] = useState("")

  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value)
  }

  const reenterPasswordHandler = (e) => {
    setReenterPassword(e.target.value)
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
      <Button type='submit' variant='contained'>Save changes & Sign-In</Button>
      <div>
        <h2>Secure password tips:</h2>
        <ul>
          <li>Use at least 8 characters, a combination of numbers and letters is best.</li>
          <li>Do not use the same password you have used with us previously.</li>
          <li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.</li>
          <li>Do not use the same password for multiple online accounts.</li>
        </ul>
      </div>
    </div>
  )
}
