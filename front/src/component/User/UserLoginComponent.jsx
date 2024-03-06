import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { loginUser } from '../../api/UsersAPIFetch';
import { useRouter } from 'next/router';
import Link from 'next/link';


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
	const router = useRouter();

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

			sessionStorage.setItem('user', JSON.stringify(user));
			router.push('/DashboardPage');
		} catch (error) {
			setErrorMessage("Invalid email or password. Please try again.");
			console.error("Error logging in:", error);
		}
	}

	return (
		<div className='login-display'>
			<h2>Log In to your account</h2>
			<div>
				<label>Email</label>
				<input type='email' name='email' value={email} onChange={emailHandler} />
			</div>
			<div>
				<label>Password</label>
				<input type='password' name='password' value={password} onChange={passwordHandler} />
			</div>
			{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
			<Button type='submit' variant='contained' onClick={loginHandler}>
				Log In
			</Button>
			<Link
				href={{
					pathname: "/ForgotPasswordPage",
				}}>Forgot your password?</Link>
		</div>
	);
}