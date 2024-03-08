
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

// export const suggestProductsChanges = async (product, order) => {

//     try {
//         const response = await fetch(`http://localhost:9000/products/suggestProductChanges`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ product, order })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to post order change suggestions');
//         }

//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

export const getSuggestedProductsFromDatabase = async (productId) => {
    if (!productId) {
        console.log('productId:', productId)
        throw new Error('productId is undefined or null');
    }
    try {
        const response = await fetch(
            `http://localhost:9000/products/suggestedProducts/${productId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            const responseBody = await response.json();
            const suggestedProductsFromDB = responseBody.data;
            return suggestedProductsFromDB;
        } else {
            console.log('Response status:', response.status);
            console.log('Response text:', await response.text());
            throw new Error('Error en API');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};