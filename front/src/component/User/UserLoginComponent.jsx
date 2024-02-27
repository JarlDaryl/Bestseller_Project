import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
}));

export default function UserLoginComponent() {
	return (
		<Box sx={{ flexGrow: 5 }}>
			<Grid container spacing={2}>
				<Grid item xs={8}>
          <div className='login-display'>
					<h2>Log In to your account</h2>
					
						<div>
							<label>Email</label>
							<input type='email' name='email' />
						</div>
						<div>
							<label>Password</label>
							<input type='password' name='password' />
						</div>
						<Button type='submit' variant='contained'>
							Log In
						</Button>
					
					<span>Forgot your password?</span>
          </div>
				</Grid>
				<Grid item xs={4}>
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
				</Grid>
			</Grid>
		</Box>
	);
}