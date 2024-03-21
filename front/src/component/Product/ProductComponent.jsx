import React, { useEffect, useState } from 'react';
import GenerateProductSuggestionComponent from './GenerateProductSuggestionComponent';
import AccordionDetails from '@mui/material/AccordionDetails';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';
import { Stack } from '@mui/material';

export default function ProductComponent({ order }) {
	const [total, setTotal] = useState(0);
	const [open, setOpen] = useState({});

	useEffect(() => {
		let total = 0;
		order.products.forEach((product) => {
			total += product.productId.price * product.productId.quantity;
		});
		total = total.toFixed(2);
		setTotal(total);
	}, [order]);

	return (
		<div className='products-container'>
			<AccordionDetails>
				<ImageList sx={{ width: 'auto', height: 'auto' }}>
					<ImageListItem key='Subheader' cols={2} style={{ height: 'auto', marginLeft: 25 }}>
						<h2 className='products-h2'>Products in your order</h2>
					</ImageListItem>
					<Stack direction='row'>
						{order.products.map((product) => (
							<div key={product.productId._id}>
								<ImageListItem key={product.productId._id} style={{ marginLeft: 5, marginRight: 5 }}>
									<div
										style={{
											position: 'relative',
											width: '208px',
											height: '312.237px',
										}}
									>
										<img
											src={product.productId.img}
											alt={product.productId.description}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
											}}
										/>
										<ImageListItemBar
											title={product.productId.name}
											subtitle={product.productId.gender}
											style={{
												background: product.productId.viable
													? 'rgb(215,208,188, 0.91)'
													: 'rgba(255, 0, 0, 0.8)',
												position: 'absolute',
												bottom: 0,
												width: '100%',
											}}
											actionIcon={
												<IconButton
													sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
													aria-label={`info about ${product.productId.name}`}
													onClick={() => {
														if (!product.productId.viable) {
															setOpen((prevState) => ({
																...prevState,
																[product.productId.name]: true,
															})); // Abre la alerta para este producto
														}
													}}
												>
													<InfoIcon />
												</IconButton>
											}
										/>
										{open[product.productId.name] && (
											<Alert
												variant='filled'
												severity='error'
												onClose={() =>
													setOpen((prevState) => ({
														...prevState,
														[product.productId.name]: false,
													}))
												} // Cierra la alerta para este producto
											>
												This product is unavailable. Please select another from the suggestions below.
											</Alert>
										)}
									</div>
								</ImageListItem>
								<ImageListItem style={{ marginLeft: 10 }}>
									<li>{product.productId.description}</li>
									<li>Quantity: {product.productId.quantity}</li>
									<li>Price: {product.productId.price} €</li>
								</ImageListItem>

								<div>
									{!product.productId.viable && (
										<GenerateProductSuggestionComponent
											productId={product.productId._id}
											productQuantity={product.productId.quantity}
											productPrice={product.productId.price}
											setTotal={setTotal}
											total={total}
											order={order}
											existingProductIndex={order.products.indexOf(product)}
										/>
									)}
								</div>
							</div>
						))}
					</Stack>
				</ImageList>
			</AccordionDetails>
			<div className='total-price' >Total: {total} €</div>
		</div>
	);

}
