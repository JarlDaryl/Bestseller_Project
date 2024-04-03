import React from 'react'
import { useState } from 'react';
import { createUser } from '@/api/UsersAPIFetch';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function UserRegisterComponent() {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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
            });
            if (newUser.status === "failed") {
                setErrorMessage("The email already exists");
                console.error("The email already exists");
            } else if (newUser.status === "succeeded") {
                setErrorMessage("");
                setSuccessMessage("New user created");
                console.log("New user created");
                setTimeout(() => {
                    router.push('/UserLoginPage');
                }, 1000);
            }
        } catch (error) {
            console.error("Error creating user:", error.message);
            setErrorMessage("Error creating user. Please try again later.");
        }
    }

    const handleBackClick = () => {
        router.push('/'); 
    };

    return (
        <div className='register-display'>
            <h2 className='register-h2'>Create your user</h2>
            <div>
                <span className='register-title'>Email </span>
                <div>
                    <input value={email} onChange={emailHandler} required className='register-input'></input>
                </div>
            </div>
            <div>
                <span className='register-title'>Password </span>
                <div>
                    <input type="password" value={password} onChange={passwordHandler} required className='register-input'></input>
                </div>
            </div>
            <div>
                <span className='register-title'>Confirm Password </span>
                <div>
                    <input type="password" value={confirmPassword} onChange={confirmPasswordHandler} required className='register-input'></input>
                </div>
            </div>
            <div>
                <span className='register-title'>Company name </span>
                <div>
                    <input value={companyName} onChange={companyNameHandler} required className='register-input'></input>
                </div>
            </div>
            <div>
                <span className='register-title'>Country </span>
                <div>
                    <input value={country} onChange={countryHandler} required className='register-input'></input>
                </div>
            </div>
            <div>
                <button type='submit' variant='contained' onClick={handleCreateUserClick} className='register-button'>Create Account</button>
                {errorMessage && <p>{errorMessage}</p>}
                {successMessage && <h2>{successMessage}</h2>}
            </div>
            <Button onClick={handleBackClick} startIcon={<ArrowBack />} className='register-return-button'>Return</Button> 
        </div>
    )
}

