import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

export default function UserAccountRegisterComponent() {
  return (
    <div className='login-display'>
					<h2>Need an Account?</h2>
					<Stack spacing={2} direction='row'>
						<Button type='submit' variant='contained' className='register-button'>
              <Link href={{
                pathname: 'UserRegisterPage',
              }}>Register</Link>
						</Button>
					</Stack>
          	</div>
  )
}
