import React, { useState } from 'react';
import QuantityComponent from './QuantityComponent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Suggestion({ suggestion, addToOrder, setSnackbarOpen }) {
	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		addToOrder(suggestion._id, quantity);
		setSnackbarOpen(true);
	};

	return (
		<div className='product-suggestion'>
			<ul>
				<li>
					<img src={suggestion.img} />
				</li>
				<li className='suggestion-name'>{suggestion.name}</li>
				<li className='suggestion-description'>{suggestion.description}</li>
				<li>{suggestion.gender}</li>
				<li>Price: {suggestion.price} €</li>
			</ul>
			<Stack direction='row' spacing={1} paddingTop={2}>
				<QuantityComponent quantity={quantity} setQuantity={setQuantity} />
				<Chip
					label='Add to order'
					onClick={handleClick}
					className='suggestion-shopping-cart'
					icon={<ShoppingCartIcon className='shopping-cart-icon' />}
				/>
			</Stack>
		</div>
	);
}