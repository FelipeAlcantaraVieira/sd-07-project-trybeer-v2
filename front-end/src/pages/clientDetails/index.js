import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopMenu from '../../components/TopMenu';
import { saleById } from '../../service/trybeerApi';
import './style.css';

export default function ClientDetails() {
  const [orderDate, setOrderDate] = useState('');
  const [errors, setErrors] = useState('');
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderStatus, setOrderStatus] = useState();
  const [totalPrice, setTotalPrice] = useState('');
  const orderNumber = useParams().np;

  const options = {
    day: '2-digit',
    month: '2-digit',
  };

  const handleClassStatus = (orderStatus) => {
    if (orderStatus === 'Pendente') return 'status-pendente';
    if (orderStatus === 'Preparando') return 'status-preparando';
    return 'status-entregue';
  };

  useEffect(() => {
    const salesProducts = async () => {
      const date = (saleDate) => new Intl.DateTimeFormat('pt-BR', options).format(Date.parse(saleDate));
      const result = await saleById(orderNumber);
      const dateOrder = date(result.saleDate);
      if (!dateOrder) return setErrors(<h3>Pedido não encontrado</h3>);

      setOrderStatus(result.status);
      setOrderDate(dateOrder);
      setTotalPrice(result.totalPrice);

      setOrderDetail(result.products);
    };
    salesProducts();
  }, [options, orderNumber]);

  return (
    <div className="orders-details-container">
      <TopMenu topTitle="Detalhes de Pedido" />
      <div className="orders-details-card-container">
        <div className="order-number">
          <h1 data-testid="order-number">{`Pedido ${orderNumber}`}</h1>
          <h2 className={ handleClassStatus(orderStatus) }>{orderStatus}</h2>
          <h3 data-testid="order-date">{`${orderDate}`}</h3>
        </div>
        <div className="details-card">
          {orderDetail
            && orderDetail.map((product, index) => (
              <p key={ index } className="details-card-und-container">
                <span data-testid={ `${index}-product-qtd` }>
                  {product.SaleProduct.quantity}
                </span>
                <span data-testid={ `${index}-product-name` }>
                  {product.name}
                </span>
                <span data-testid={ `${index}-product-total-value` }>
                  <strong>{`R$ ${product.price.replace('.', ',')}`}</strong>
                </span>
              </p>
            ))}
        </div>
        <h1 data-testid="order-total-value">
          {`R$ ${totalPrice.replace('.', ',')}`}
        </h1>
        {errors}
      </div>
    </div>
  );
}
