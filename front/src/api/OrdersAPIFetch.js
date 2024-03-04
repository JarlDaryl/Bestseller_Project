export const getUserOrdersFromDatabase = async (userId) => {
    const response = await fetch(`http://localhost:9000/orders/getOrdersByUser/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ userId })
    });
    return response;
}
