import React from 'react'
import { useState } from 'react';
import { createUser } from '@/api/UsersAPIFetch';
import Button from '@mui/material/Button';

export default function UserRegisterComponent() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const [companyName, setCompanyName] = useState("")
    const [country, setCountry] = useState("")
    const [newUser, setNewUser] = useState(null)

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const companyNameHandler = (e) => {
        setCompanyName(e.target.value)
    }

    const countryHandler = (e) => {
        setCountry(e.target.value)
    }
    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleCreateUserClick = async () => {
        if (!email || !password || !companyName || !country) {
            setErrorMessage('All fields are required');
            console.error('All fields are required');
            return;
        }
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            setErrorMessage('Invalid email format');
            console.error('Invalid email format');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            console.error('Passwords do not match');
            return;
        }
        if (password.length < 10) {
            setErrorMessage('Password must be at least 10 characters');
            console.error('Password must be at least 10 characters');
            return;
        }
        try {
            const newUser = await createUser({
                email,
                password,
                companyName,
                country,
            })
            setNewUser(newUser)
            window.location.href = '../';
        }
        catch (error) {
            console.log("Error creating user:", error.message)
        }
    }

    return (
        <div>
            <h1>Create your user</h1>
            <br />
            <div>
                <div>
                    <span>Email:</span>
                    <input value={email} onChange={emailHandler} required></input>
                </div>
                <div>
                    <span>Password:</span>
                    <input type="password" value={password} onChange={passwordHandler} required></input>
                </div>
                <div>
                    <span>Confirm Password:</span>
                    <input type="password" value={confirmPassword} onChange={confirmPasswordHandler} required></input>
                </div>
                <div>
                    <span>Company name:</span>
                    <input value={companyName} onChange={companyNameHandler} required></input>
                    <div>
                        <span>Country:</span>
                        <input value={country} onChange={countryHandler} required></input>
                    </div>
                </div>

                <Button type='submit' variant='contained' onClick={handleCreateUserClick}>Create Account</Button>
                {errorMessage && <p>{errorMessage}</p>}
                {newUser && (
                    <div>
                        <h2>New user created</h2>
                    </div>
                )}
            </div>
        </div>
    )

}

