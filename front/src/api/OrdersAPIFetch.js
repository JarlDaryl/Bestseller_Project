export const getUserOrdersFromDatabase = async (userId) => {
	if (!userId) {
		throw new Error('userId is undefined or null');
	}
	try {
		// Obtén el objeto user de sessionStorage y parsea a JSON
		const user = JSON.parse(window.sessionStorage.getItem("user"));

		// Extrae el token del objeto user
		const token = user ? user.data.token : null;

		const response = await fetch(
			`http://localhost:9000/orders/getOrdersByUser/${userId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"auth-token": token,
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

export const updateOrderInDatabase = async (order) => {
	const user = JSON.parse(window.sessionStorage.getItem("user"));
	const token = user ? user.data.token : null;

	const response = await fetch(
		`http://localhost:9000/orders/updateOrder/${order.id}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": token,
			},
			body: JSON.stringify(order)
		}
	);

	if (response.ok) {
		const updatedOrder = await response.json();
		return updatedOrder;
	} else {
		throw new Error('Failed to update order');
	}
};

// .catch((error) => {
// 	ErrorService.handle(
// 	  error,
// 	  Fetch,
// 	  setEvents,
// 	  getEventsByMonth,
// 	  navigate
// 	);
//   });
