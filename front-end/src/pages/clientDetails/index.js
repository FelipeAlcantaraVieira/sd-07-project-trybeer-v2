import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopMenu from '../../components/TopMenu';
import { saleById } from '../../service/trybeerApi';

export default function ClientDetails() {
  const [orderDate, setOrderDate] = useState('');
  const [errors, setErrors] = useState('');
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderStatus, setOrderStatus] = useState();
  const [totalPrice, setTotalPrice] = useState('');
  const orderNumber = useParams().np;

  const options = {
    day: '2-digit', month: '2-digit',
  };

  useEffect(() => {
    const salesProducts = async () => {
      const date = (saleDate) => new Intl.DateTimeFormat('pt-BR', options)
        .format(Date.parse(saleDate));
      const result = await saleById(orderNumber);
      const dateOrder = date(result.saleDate);
      if (!dateOrder) return setErrors(<h3>Pedido não encontrado</h3>);

      setOrderStatus(result.status);
      setOrderDate(dateOrder);
      setTotalPrice(result.totalPrice);

      setOrderDetail(result.products);
    };
    salesProducts();
  }, []);

  return (
    <div>
      <TopMenu topTitle="Detalhes de Pedido" />
      <h2>
        <span data-testid="order-number">{`Pedido ${orderNumber}`}</span>
        {' '}
        <span data-testid="order-date">{`${orderDate}`}</span>
      </h2>
      <h2>{orderStatus}</h2>
      <div>
        {orderDetail && orderDetail.map((product, index) => (
          <div
            key={ index }
          >
            <div>
              <span data-testid={ `${index}-product-qtd` }>
                {product.SaleProduct.quantity}
              </span>
              {' '}
              -
              {' '}
              <span data-testid={ `${index}-product-name` }>
                {product.name}
              </span>
              {' '}
              -
              {' '}
              <span data-testid={ `${index}-product-total-value` }>
                <strong>
                  {`R$ ${product.price.replace('.', ',')}`}
                </strong>
              </span>
            </div>
          </div>
        ))}
        <p
          data-testid="order-total-value"
        >
          {`R$ ${(totalPrice).replace('.', ',')}`}
        </p>
      </div>
      {errors}
    </div>
  );
}
