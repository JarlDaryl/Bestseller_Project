export const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:9000/login/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
            return response.json();
    } else {
        throw new Error('Failed to login');
    }
}

export const verifyUser = async (token, email) => {
    const response = await fetch('http://localhost:9000/login/verifyLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token,
        },
        body: JSON.stringify({ email })
    });

    if (response.ok) {
            return response.json();
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