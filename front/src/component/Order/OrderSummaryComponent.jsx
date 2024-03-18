import React, { useMemo } from 'react';
import ProductComponent from '../Product/ProductComponent';

export default function OrderSummaryComponent({ order }) {
    const total = useMemo(() => {
        const totalValue = order ? order.reduce((total, product) => total + product.price * product.quantity, 0) : 0;
        console.log(totalValue);
        return totalValue;
    }, [order]);

    const newProducts = useMemo(() => {
        const newProducts = order ? order.filter(product => product.isNew) : [];
        console.log(newProducts);
        return newProducts;
    }, [order]);

    return (
        <div>
            <h2>Order Summary</h2>
            {newProducts.length > 0 ? newProducts.map(product => <ProductComponent key={product.id} product={product} />) : <p>No new products in order.</p>}
            <h3>Total: {total}</h3>
        </div>
    );
}