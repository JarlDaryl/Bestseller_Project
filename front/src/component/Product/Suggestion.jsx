import React, { useState } from 'react';
import QuantityComponent from './QuantityComponent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Suggestion({ suggestion, addToOrder }) {
	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		addToOrder(suggestion._id, quantity);
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<div>
			<ul>
				<li>
					<img src={suggestion.img} />
				</li>
				<li>{suggestion.name}</li>
				<li>{suggestion.description}</li>
				<li>{suggestion.gender}</li>
				<li>Price: {suggestion.price} €</li>
			</ul>
			<QuantityComponent quantity={quantity} setQuantity={setQuantity} />
			<Stack direction='row' spacing={1}>
				<Chip
					label='Add to order'
					onClick={handleClick}
					icon={<ShoppingCartIcon />}
				/>
			</Stack>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity='success'
					variant='filled'
					sx={{ width: '100%' }}
				>
					Successfully added product to shopping cart!
				</Alert>
			</Snackbar>
		</div>
	);
}
