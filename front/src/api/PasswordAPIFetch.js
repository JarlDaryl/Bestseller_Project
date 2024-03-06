export const sendEmail = async (emailData) => {
    try {
        const response = await fetch('http://localhost:9000/password/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            console.log('Email sent successfully');
            return true;
        } else {
            console.error('Error sending email');
            throw new Error('Error sending email');
        }
    } catch (error) {
        console.error('Error in email send request:', error);
        throw error;
    }
};
