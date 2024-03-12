import React from 'react';
import { useState } from 'react';
import { loginUser, verifyUser } from '../../api/UsersAPIFetch';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function UserLoginComponent() {
	const router = useRouter();

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
			const token = user.data.token;
			const tokenResponse = await verifyUser(token, email)

			console.log(user)
			sessionStorage.setItem('user', JSON.stringify(user));
			router.push('/DashboardPage');
		} catch (error) {
			setErrorMessage("Invalid email or password. Please try again.");
			console.error("Error logging in:", error);
		}
	}

	return (
		<div className='login-display'>
			<h2 className='login-h2'>Log In to your account</h2>
			<div>
				<label className='login-title'>Email </label>
				<div>
					<input type='email' name='email' value={email} onChange={emailHandler} className='login-input' />
				</div>
			</div>
			<div>
				<label className='login-title'>Password </label>
				<div>
					<input type='password' name='password' value={password} onChange={passwordHandler} className='login-input' />
				</div>
			</div>
			{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
			<button type='submit' variant='contained' onClick={loginHandler} className='login-button'>
				Log In
			</button>
			<Link
				href={{
					pathname: "/ForgotPasswordPage",
				}} className='login-forgot-password-link'>Have you forgotten your password?</Link>
		</div>
	);
}