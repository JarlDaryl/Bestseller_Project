export const getAuthToken = async (email, password) => {
    try {
        const response = await fetch('http://localhost:9000/login/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Failed to log in');
        }

        const { token } = await response.json();
        return token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};