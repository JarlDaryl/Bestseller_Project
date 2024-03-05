export const getUserOrdersFromDatabase = async (userId) => {
	if (!userId) {
		throw new Error('userId is undefined or null');
	}
	try {
		const response = await fetch(
			`http://localhost:9000/orders/getOrdersByUser/${userId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (response.ok) {
            const userOrdersFromDB = await response.json();
            return userOrdersFromDB;
        } else {
            throw new Error('Failed to fetch user orders');
        }
	} catch (error) {
		console.error(error);
		throw error;
	}
};