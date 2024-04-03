import React, { useState, useEffect } from 'react';
import { changeEmail } from '../../api/UsersAPIFetch';
import CircularProgress from '@mui/material/CircularProgress';
import HeaderMenuBarOrdersComponent from '../HeaderMenuBar/HeaderMenuBarOrderComponent';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

export default function UserProfileComponent() {
	const [userDetails, setUserDetails] = useState(null);
	const [newEmail, setNewEmail] = useState('');
	const router = useRouter();

	useEffect(() => {
		const user = window.sessionStorage.getItem('user');
		if (user) {
			const userObj = JSON.parse(user);
			setUserDetails(userObj.data);
		}
		console.log(user)

	}, []);

	const handleEmailChange = async () => {
		const user = JSON.parse(window.sessionStorage.getItem('user'));
		if (user && user.data) {
			const userId = user.data.id;
			await changeEmail(newEmail, userId);
		} else {
			console.error('User not found in session storage');
		}
	};

	if (!userDetails) {
		return <CircularProgress />;
	}

	const handleBackClick = () => {
		router.push('/DashboardPage');
	};

	return (
		<div>
			<HeaderMenuBarOrdersComponent />
			<h1>User Profile</h1>
			<p>
				{' '}
				Company: <strong> {userDetails.companyName}</strong>
			</p>
			<p>
				{' '}
				Country: <strong> {userDetails.country}</strong>
			</p>
			<p>
				{' '}
				Current email: <strong> {userDetails.email}</strong>
			</p>

			<input
				type='email'
				value={newEmail}
				onChange={(e) => setNewEmail(e.target.value)}
				placeholder='Enter new email'
			/>
			<button onClick={handleEmailChange}>Change Email</button>
			<div>
				<Button onClick={handleBackClick} startIcon={<ArrowBack />}>Dashboard</Button>
			</div>
		</div>
	);
}
