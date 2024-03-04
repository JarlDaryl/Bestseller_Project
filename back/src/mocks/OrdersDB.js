const ordersDB = [
    // Order 1
    {
        user: "65de28c0e7896de2eabc7754",
        products: [
            { productId: "65e061ac81e4bdeedce95ff3", quantity: 2 }, // Cotton Shirt
            { productId: "65e061ac81e4bdeedce95ff7", quantity: 1 }, // Sporty Joggers
        ],
        total: 120,
        createdAt: "2024-02-25",
        deliveryDate: new Date(),
        status: "pending",
    },

    // Order 2
    {
        user: "65de28c0e7896de2eabc7757",
        products: [
            { productId: "65e061ac81e4bdeedce95ff4", quantity: 1 }, // Slim Fit Jeans
            { productId: "65e061ac81e4bdeedce95ff8", quantity: 2 }, // Winter Coat
        ],
        total: 350,
        createdAt: "2024-02-28",
        deliveryDate: new Date(),
        status: "confirmed",
    },

    // Order 3
    {
        user: "65de28c0e7896de2eabc7758",
        products: [
            { productId: "65e061ac81e4bdeedce95ff6", quantity: 2 }, // Summer Dress
            { productId: "65e061ac81e4bdeedce95ff9", quantity: 1 }, // Casual Sneakers
        ],
        total: 180,
        createdAt: "2024-03-01",
        deliveryDate: new Date(),
        status: "inTransit",
    },

    // Order 4
    {
        user: "65de28c0e7896de2eabc7756",
        products: [
            { productId: "65e061ac81e4bdeedce95ffa", quantity: 1 }, // Denim Skirt
            { productId: "65e061ac81e4bdeedce95ffc", quantity: 3 }, // Printed Sundress
        ],
        total: 200,
        createdAt: "2024-03-05",
        deliveryDate: new Date(),
        status: "delivered",
    },

    // Order 5
    {
        user: "65df23049336f3ec2d38340a",
        products: [
            { productId: "65e061ac81e4bdeedce95ffb", quantity: 3 }, // Striped Polo Shirt
            { productId: "65e061ac81e4bdeedce95ff3", quantity: 1 }, // Cotton Shirt
        ],
        total: 150,
        createdAt: "2024-03-10",
        deliveryDate: new Date(),
        status: "cancelled",
    },
];

module.exports = ordersDB;