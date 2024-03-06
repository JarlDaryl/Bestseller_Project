import React, { useState } from 'react'
import { sendEmail } from '@/api/PasswordAPIFetch';
import { Button, Alert } from '@mui/material'

export default function EmailResetPasswordComponent() {
    const [email, setEmail] = useState()
    const [errorMessage, setErrorMessage] = useState(null);

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const sendEmailPasswordResetHandler = async (e) => {
        try {
            await sendEmail(email);
            console.log('Email sent successfully');
        } catch (error) {
            console.log('Failed to send email:', error);
            if (error.response && error.response.status === 404) {
                setErrorMessage('User does not exist');
            } else {
                setErrorMessage('Failed to send email');
            }
        }
    }

    return (
        <div>
            <h2>Password assistance</h2>
            <h3>Enter the email address associated with your Bestseller account.</h3>
            <h3>We will send you an email with instructions on how to recover it</h3>
            <div>
                <label>Email</label>
                <input type='email' name='email' value={email} onChange={emailHandler} />
            </div>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Button type='submit' variant='contained' onClick={sendEmailPasswordResetHandler}>
                Continue
            </Button>
            <h4>Has your email changed?. If you no longer use the email address associated with your Bestseller account, you may contact Customer Service for help restoring access to your account.</h4>
        </div>
    )

}