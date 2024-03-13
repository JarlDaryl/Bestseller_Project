import React from 'react'
import { useEffect, useState } from 'react';
import { getUserOrdersFromDatabase } from '@/api/OrdersAPIFetch';
import OrderComponent from './OrderComponent';
import { useRouter } from 'next/router';

export default function TotalCurrentUserOrdersComponent() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
     let userId;

     useEffect(() => {
      const user = window.sessionStorage.getItem('user');
      if (user) {
        console.log(user)
        const userObj = JSON.parse(user);
        userId = userObj.data.id;
        console.log(userId)
      }
    }, []);


      useEffect(() => {
        const getAllOrdersByUserAux = async () => {
          if (!userId) {
            console.log('userId is undefined or null');
            return;
          }
          try {
            console.log('Fetching orders for userId:', userId);
            let ordersByUserAux = await getUserOrdersFromDatabase(userId);
            setOrders(ordersByUserAux);
            sessionStorage.setItem('order', JSON.stringify(ordersByUserAux));
            console.log(orders)
            setLoading(false);
          } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
          }
        };
        getAllOrdersByUserAux();
      }, [userId]);

      if (loading) {
        return <div>Loading...</div>;
   }
   
  return (
    <div>
        {orders && orders.map((order) => {
          return (
            <OrderComponent order={order} />
          );
        })}
    </div>
  );
}
