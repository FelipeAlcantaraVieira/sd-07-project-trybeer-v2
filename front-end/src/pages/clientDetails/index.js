import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopMenu from '../../components/TopMenu';
import { saleById, getSaleByOrderId } from '../../service/trybeerApi';

export default function ClientDetails() {
  const [orderDate, setOrderDate] = useState('');
  const [errors, setErrors] = useState('');
  const [orderDetail, setOrderDetail] = useState([]);
  const orderNumber = useParams().np;

  const orderTotValue = orderDetail
    .reduce((acc, { qtd, unitPrice }) => acc + (qtd * unitPrice), 0);

  const options = {
    day: '2-digit', month: '2-digit',
  };

  useEffect(() => {
    const salesProducts = async () => {
      const result = await saleById(orderNumber);
      const order = await getSaleByOrderId(orderNumber);
      const dateOrder = new Intl.DateTimeFormat('pt-BR', options)
        .format(Date.parse(order[0].sale_date));
      if (!dateOrder) return setErrors(<h3>Pedido não encontrado</h3>);

      setOrderDate(dateOrder);
      setOrderDetail(result);
    };
    salesProducts();
  }, [options, orderNumber]);

  return (
    <div>
      <TopMenu topTitle="Detalhes de Pedido" />
      <h2>
        <span data-testid="order-number">{ `Pedido ${orderNumber}` }</span>
        {' '}
        <span data-testid="order-date">{ `${orderDate}` }</span>
      </h2>
      <div>
        {orderDetail && orderDetail.map((product, index) => (
          <div
            key={ index }
          >
            <div>
              <span data-testid={ `${index}-product-qtd` }>
                {product.qtd}
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
                  {`R$ ${product.unitPrice.replace('.', ',')}`}
                </strong>
              </span>
            </div>
          </div>
        ))}
        <p
          data-testid="order-total-value"
        >
          {`R$ ${(orderTotValue).toFixed(2).replace('.', ',')}`}
        </p>
      </div>
      { errors }
    </div>
  );
}
