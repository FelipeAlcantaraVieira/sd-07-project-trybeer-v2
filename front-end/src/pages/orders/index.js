import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TopMenu } from '../../components';
import TrybeerContext from '../../context/TrybeerContext';
import { getSaleByUserId } from '../../service/trybeerApi';
import './style.css';

export default function Orders() {
  const history = useHistory();
  const {
    userLogged,
    setSaleId,
    setSaleDate,
    setTotalPrice,
  } = useContext(TrybeerContext);
  const [ordersFromUser, setOrdersFromUser] = useState([]);

  useEffect(() => {
    const listOrdes = async () => {
      const orders = await getSaleByUserId(userLogged.id);
      setOrdersFromUser(orders);
      console.log(orders);
    };
    listOrdes();
  }, [userLogged.id]);

  const options = {
    day: '2-digit', month: '2-digit',
  };

  const handleClick = (id, date, price) => {
    setSaleId(id);
    setSaleDate(date);
    setTotalPrice(price);
    history.push(`/orders/${id}`);
  };

  return (
    <div>
      <TopMenu topTitle="Meus Pedidos" />
      <div>
        {ordersFromUser.map((order, index) => {
          const priceOrder = new Intl
            .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
            .format(order.total_price);
          const dateOrder = new Intl.DateTimeFormat('pt-BR', options)
            .format(Date.parse(order.sale_date));
          return (
            <button
              type="button"
              className="cardOrder"
              key={ order.id }
              data-testid={ `${index}-order-card-container` }
              onClick={ () => handleClick(order.id, dateOrder, priceOrder) }
            >
              <span
                data-testid={ `${index}-order-number` }
              >
                {`Pedido ${order.id} `}
              </span>
              <h2
                data-testid={ `${index}-order-date` }
              >
                {dateOrder}
              </h2>
              <h2
                data-testid={ `${index}-order-total-value` }
              >
                {priceOrder}
              </h2>
            </button>
          );
        })}
      </div>
    </div>
  );
}
