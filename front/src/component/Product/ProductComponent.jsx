import React, { useEffect, useState } from 'react';

import AccordionDetails from '@mui/material/AccordionDetails';
import Box, { BoxProps } from '@mui/material/Box';
import GenerateProductSuggestionComponent from './GenerateProductSuggestionComponent';

function Item(props) {
	const { sx, ...other } = props;
	return (
		<Box
			sx={{
				bgcolor: (theme) =>
					theme.palette.mode === 'dark' ? '#101010' : '#fff',
				color: (theme) =>
					theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
				border: '1px solid',
				borderColor: (theme) =>
					theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
				p: 1,
				m: 1,
				borderRadius: 2,
				fontSize: '0.875rem',
				fontWeight: '700',
				...sx,
			}}
			{...other}
		/>
	);
}

export default function ProductComponent({order}) {
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
        <div>
            <AccordionDetails>
                <h2>Products:</h2>
                <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(1, 1fr)' }}>
                    <Item>
                        <div>
                            {order.products.map((product, index) => (
                                <div key={index}>
                                    <ul>
                                        <li><img src={product.productId.img} alt={product.productId.description} /></li>
                                        <li>{product.productId.name}</li>
                                        <li>{product.productId.description}</li>
                                        <p>{product.productId.gender}</p>
                                        <li>Quantity: {product.productId.quantity}</li>
                                        <li>Price: {product.productId.price}</li>
                                        {/* Add more product details here as needed */}
                                    </ul>
                                    {!product.productId.viable && <GenerateProductSuggestionComponent productId={product.productId._id} productQuantity={product.productId.quantity} productPrice={product.productId.price} setTotal={setTotal} total={total}/>}
                                </div>
                            ))}
                        </div>
                    </Item>
                </Box>
            </AccordionDetails>
            <div>Total: {total} €</div>
        </div>
    );
}