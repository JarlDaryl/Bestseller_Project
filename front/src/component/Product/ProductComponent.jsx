import React, { useEffect, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box, { BoxProps } from '@mui/material/Box';
import GenerateProductSuggestionComponent from './GenerateProductSuggestionComponent';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';

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
		<div>
			<AccordionDetails>
				<ImageList sx={{ width: 'auto', height: 'auto' }}>
					<ImageListItem key='Subheader' cols={2} style={{ height: 'auto' }}>
						<h2 className='products-h2'>Products in your order</h2>
					</ImageListItem>
					{order.products.map((product) => (
						<div key={product.productId._id}>
							<ul>
								<ImageListItem key={product.productId._id}>
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
											subtitle={product.productId.description}
											style={{
												background: product.productId.viable
													? 'rgba(128, 128, 128, 0.6)'
													: 'rgba(255, 0, 0, 0.6)',
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
								<li>{product.productId.name}</li>
								<li>{product.productId.description}</li>
								<li>{product.productId.gender}</li>
								<li>Quantity: {product.productId.quantity}</li>
								<li>Price: {product.productId.price} €</li>
							</ul>
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
				</ImageList>
			</AccordionDetails>
			<div className='total-price'>Total: {total} €</div>
		</div>
	);

}
