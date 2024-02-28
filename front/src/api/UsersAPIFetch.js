export const loginUser = async(email, password) => {
            const response = await fetch('http://localhost:9000/login/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const user = await response.json();
                return user;
            } else {
                
                
                throw new Error('Failed to login');
            }
        }
