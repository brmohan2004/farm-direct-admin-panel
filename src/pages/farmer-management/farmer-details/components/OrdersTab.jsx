import React from 'react';
import { ShoppingCart, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import './OrdersTab.css';

/**
 * OrdersTab Component
 * Renders history of fulfilled orders supplied by the farmer
 */
const OrdersTab = ({ farmer }) => {
  const orders = farmer?.orders || [
    {
      id: 'ORD12345',
      consumer: 'Anand Sundaram',
      items: '50 kg Tomatoes, 30 kg Carrots',
      amount: '₹3,450',
      date: '20 May 2024',
      status: 'Delivered'
    },
    {
      id: 'ORD12344',
      consumer: 'Priya Rajan',
      items: '20 kg Spinach, 15 kg Beetroot',
      amount: '₹1,820',
      date: '18 May 2024',
      status: 'Delivered'
    },
    {
      id: 'ORD12342',
      consumer: 'Karthik V.',
      items: '100 kg Potatoes, 40 kg Onions',
      amount: '₹5,600',
      date: '15 May 2024',
      status: 'Delivered'
    }
  ];

  return (
    <div className="orders-tab-container">
      <div className="orders-card">
        <h3 className="card-title">Fulfilled Consumer Orders</h3>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Consumer</th>
                <th>Items Supplied</th>
                <th>Total Value</th>
                <th>Fulfilled Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord.id}>
                  <td className="font-mono font-bold text-green">{ord.id}</td>
                  <td>{ord.consumer}</td>
                  <td>{ord.items}</td>
                  <td className="font-bold">{ord.amount}</td>
                  <td>{ord.date}</td>
                  <td>
                    <span className="badge-delivered">
                      <CheckCircle2 size={12} /> {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTab;
