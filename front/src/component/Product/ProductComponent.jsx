import React from 'react';

import AccordionDetails from '@mui/material/AccordionDetails';
import Box, { BoxProps } from '@mui/material/Box';

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
	return (
		<div>
			<AccordionDetails>
				<h4>Products:</h4>
				<Box sx={{ display: 'grid', gridTemplateRows: 'repeat(1, 1fr)' }}>
					<Item>
						<div>
							{order.products.map((product, index) => (
								<ul key={index}>
									<li>Product ID: {product.productId}</li>
									<li>Product Quantity: {product.quantity}</li>
								</ul>
							))}
						</div>
					</Item>
				</Box>
			</AccordionDetails>
		</div>
	);
}
