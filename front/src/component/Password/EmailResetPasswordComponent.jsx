import React, { useState } from 'react'
import { sendEmail } from '@/api/PasswordAPIFetch';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import {useRouter} from 'next/router';
// import Alert from '@material-ui/lab/Alert';

export default function EmailResetPasswordComponent() {
    const [email, setEmail] = useState()
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

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

    const handleBackClick = () => {
        router.push('/'); 
    };

    return (
        <div>
            <div className='email-reset-password-container'>
                <h2 className='email-reset-password-h2'>Password assistance</h2>
                <p className='email-reset-password-info-text' >Enter the email address associated with your Bestseller account. We will send you an email with instructions on how to recover it</p>
                <div>
                    <label className='email-reset-password-title'>Email</label>
                    <div>
                        <input type='email' name='email' value={email} onChange={emailHandler} className='email-reset-password-input' />
                    </div>
                </div>
                <div>
                    <button type='submit' variant='contained' onClick={sendEmailPasswordResetHandler} className='reset-password-email-button'>
                        Continue
                    </button>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </div>
                <p className='email-reset-password-info-text'>Has your email changed?. If you no longer use the email address associated with your Bestseller account, you may contact Customer Service for help restoring access to your account.</p>
                <Button onClick={handleBackClick} startIcon={<ArrowBack />} className='email-reset-password-return-button'>Return</Button>
            </div> 
        </div>
    )

}