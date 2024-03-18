import React, { useEffect, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box, { BoxProps } from '@mui/material/Box';
import GenerateProductSuggestionComponent from './GenerateProductSuggestionComponent';


export default function ProductComponent({ order }) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        order.products.forEach(product => {
            total += product.productId.price * product.productId.quantity;
        });
        total = total.toFixed(2);
        setTotal(total);
    }, [order]);

    return (
        <div className='products-container'>
            <AccordionDetails >
                <h2 className='products-h2'>Products in your order</h2>
                <Box>
                    <div className='products-list'>
                        {order.products.map((product) => (
                            <div key={product.productId._id}>
                                <ul>
                                    <li><img src={product.productId.img} alt={product.productId.description} /></li>
                                    <li>{product.productId.name}</li>
                                    <li>{product.productId.description}</li>
                                    <li>{product.productId.gender}</li>
                                    <li>Quantity: {product.productId.quantity}</li>
                                    <li>Price: {product.productId.price} €</li>
                                </ul>
                                {!product.productId.viable && <GenerateProductSuggestionComponent productId={product.productId._id} productQuantity={product.productId.quantity} productPrice={product.productId.price} setTotal={setTotal} total={total} order={order} existingProductIndex={order.products.indexOf(product)} />}
                            </div>
                        ))}
                    </div>
                </Box>
            </AccordionDetails>
            <div className='total-price'>Total: {total} €</div>
        </div>
    );
}