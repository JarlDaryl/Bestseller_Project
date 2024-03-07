
export const fetchProducts = async (userId, token) => {
    try {
        const response = await fetch(
            `http://localhost:9000/products/getProducts/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const suggestProductsChanges = async (userId, suggestions) => {
    try {
        const response = await fetch(`http://localhost:9000/products/${userId}/suggestions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(suggestions)
        });

        if (!response.ok) {
            throw new Error('Failed to post order change suggestions');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
