import React, { useState } from 'react';
import QuantityComponent from './QuantityComponent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ImageListItemBar } from '@mui/material';
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
		<div className='suggestions'>
			<ul>
				<li>
					<img src={suggestion.img} />
				</li>
				<li>{suggestion.name}</li>
				<li>{suggestion.description}</li>
				<li>{suggestion.gender}</li>
				<li>Price: {suggestion.price} €</li>
			</ul>
			<Stack direction='row' spacing={1} paddingTop={2}>
				<QuantityComponent quantity={quantity} setQuantity={setQuantity} />
				<Chip
					label='Add to order'
					onClick={handleClick}
					icon={<ShoppingCartIcon sx={{ color: 'black', fontSize: 20 }} />}
					style={{ backgroundColor: '#DFE7DB', color: 'black', paddingTop: 12, paddingBottom: 12, paddingLeft: 10, paddingRight: 10 }}
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
