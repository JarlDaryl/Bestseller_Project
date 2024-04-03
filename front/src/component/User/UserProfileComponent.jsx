import React, { useState, useEffect } from 'react';
import { changeEmail } from '../../api/UsersAPIFetch';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import {useRouter} from 'next/router';

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
    router.push('/DashboardPage'); // Redirect to dashboard
};

	return (
		<div className='profile-display'>
			<h2 className='profile-h2'>User Profile</h2>
			<div>
				<p className='profile-title'>
					{' '}
					Company: <strong> {userDetails.companyName}</strong>
				</p>
			</div>
				<div>
				<p className='profile-title'>
					{' '}
					Country: <strong> {userDetails.country}</strong>
				</p>
			</div>
			<div>
				<p className='profile-title'>
					{' '}
					Current email: <strong> {userDetails.email}</strong>
				</p>
			</div>
			<div>
				<p className='new-email-title'>
					New email
				</p>
				<div>
					<input
						type='email'
						value={newEmail}
						onChange={(e) => setNewEmail(e.target.value)}
						className='profile-input'
					/></div>
				</div>
			<div>
				<button onClick={handleEmailChange} className='profile-button'>Change Email</button>
			</div>
     		<Button onClick={handleBackClick} startIcon={<ArrowBack />} className='profile-return-button'>Return</Button> 
		</div>
	);
}
