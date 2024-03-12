import React from 'react'
import Stack from '@mui/material/Stack';
import Link from 'next/link';

export default function UserAccountRegisterComponent() {
  return (
    <div className='login-display'>
					<h2 className='login-h2'>Need an Account?</h2>
					<Stack spacing={2} direction='row'>
						<button type='submit' variant='contained' className='login-button'>
              <Link href={{
                pathname: 'UserRegisterPage',
              }}>Register</Link>
						</button>
					</Stack>
          	</div>
  )
}
