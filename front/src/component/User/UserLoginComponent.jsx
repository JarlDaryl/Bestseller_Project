import React from 'react';
import { useState, setErrorMessage } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Link from 'next/link';
import { loginUser } from '../../api/UsersAPIFetch';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
}));

export default function UserLoginComponent() {

	const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState("");

	const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

	const loginHandler = async (e) => {
		e.preventDefault()
		try {
            const user = await loginUser(email, password);
            console.log(user);
			window.location.href = '../../DashboardPage';
        } catch (error) {
            setErrorMessage("Invalid email or password. Please try again.");
            console.error("Error logging in:", error);
        }
	}


	return (
		<Box sx={{ flexGrow: 5 }}>
			<Grid container spacing={2}>
				<Grid item xs={8}>
          <div className='login-display'>
					<h2>Log In to your account</h2>
					
						<div>
							<label>Email</label>
							<input type='email' name='email' value={email} onChange={emailHandler}/>
						</div>
						<div>
							<label>Password</label>
							<input type='password' name='password' value={password} onChange={passwordHandler}/>
						</div>
						{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
						<Button type='submit' variant='contained' onClick={loginHandler}>
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