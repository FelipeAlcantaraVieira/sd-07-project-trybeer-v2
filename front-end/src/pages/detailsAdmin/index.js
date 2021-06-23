import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminSideBar from '../../components/AdminSideBar';
import { updateSaleStatus, orderById } from '../../service/trybeerApi';
import './style.css';

const ENTREGUE = 'Entregue';
const PREPARANDO = 'Preparando';

export default function AdminDetails() {
  const { id } = useParams();
  const [orderId] = useState(id);
  const [orderStatus, setOrderStatus] = useState('Pendente');
  const [order, setOrder] = useState({
    status: '',
    totalPrice: '',
    products: [],
  });

  const fetchSale = async () => {
    const result = await orderById(orderId);
    console.log('result', result);
    const { status, totalPrice, products } = result;
    setOrder({ status, totalPrice, products });
    if (status) {
      setOrderStatus(status);
    }
  };

  useEffect(() => {
    fetchSale();
  }, [fetchSale]);

  const handleClick = async (status) => {
    await updateSaleStatus(status, orderId);
    setOrderStatus(status);
  };

  const handleClassStatus = (orderStatus) => {
    if (orderStatus === 'Pendente') return 'status-pendente';
    if (orderStatus === 'Preparando') return 'status-preparando';
    return 'status-entregue';
  };

  const renderRenderButton = (status, testid, text) => {
    const button = (
      <button
        className="button-final"
        type="button"
        data-testid={ testid }
        onClick={ () => handleClick(status) }
      >
        {text}
      </button>
    );
    return orderStatus !== ENTREGUE ? button : '';
  };

  return (
    <div className="admin-orders-details-container">
      <AdminSideBar />
      <div className="admin-orders-details-card-container">
        <div className="orders-details-number-status">
          <h2 data-testid="order-number" className="order-text">{`Pedido ${orderId}`}</h2>
          <h2
            data-testid="order-status"
            className={
              handleClassStatus(orderStatus)
            }
          >
            {` ${orderStatus}`}
          </h2>
        </div>
        <div className="card-container">
          {order
            && order.products.map((product, index) => (
              <p className="details-card-und-container">
                <span data-testid={ `${index}-product-qtd` }>
                  {product.SaleProduct.quantity}
                </span>
                <span
                  data-testid={ `${index}-product-name` }
                >
                  {` ${product.name} `}
                </span>
                <span data-testid={ `${index}-product-total-value` }>
                  {`R$ ${(
                    product.SaleProduct.quantity * parseFloat(product.price)
                  )
                    .toFixed(2)
                    .split('.')
                    .join(',')}`}
                </span>
                <span data-testid={ `${index}-order-unit-price` }>
                  {`(R$ ${parseFloat(product.price)
                    .toFixed(2)
                    .split('.')
                    .join(',')})`}
                </span>
              </p>
            ))}
        </div>
        <h1 data-testid="order-total-value">
          {`Total: R$ ${parseFloat(order.totalPrice)
            .toFixed(2)
            .split('.')
            .join(',')}`}
        </h1>
      </div>

      {renderRenderButton(
        PREPARANDO,
        'mark-as-prepared-btn',
        'Preparar pedido',
      )}
      {renderRenderButton(
        ENTREGUE,
        'mark-as-delivered-btn',
        'Marcar como entregue',
      )}
    </div>
  );
}
