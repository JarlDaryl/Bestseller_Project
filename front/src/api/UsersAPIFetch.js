export const loginUser = async (email, password) => {
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

export const createUser = async (bodyParam) => {
    const response = await fetch('http://localhost:9000/login/signup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyParam)
    })
    const userCreated = await response.json()
    if (userCreated.error) console.log(userCreated.error)
    console.log(userCreated)
    return userCreated;
}