import React, { useState, useEffect } from 'react';
import { getUserById, changeEmail } from '@/api/UsersAPIFetch'

export default function UserProfileComponent({ userId }) {
  const [userDetails, setUserDetails] = useState(null);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await getUserById(userId);
        setUserDetails(details);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleEmailChange = async () => {
    await changeEmail(newEmail);
    getUserById(prevDetails => ({ ...prevDetails, email: newEmail }));
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>{userDetails.name}</p>
      <p>{userDetails.email}</p>
      <p>{userDetails.companyName}</p>
      <input
        type="email"
        value={newEmail}
        onChange={e => setNewEmail(e.target.value)}
        placeholder="Enter new email"
      />
      <button onClick={handleEmailChange}>Change Email</button>
    </div>
  );
}
