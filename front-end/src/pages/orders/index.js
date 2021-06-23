import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TopMenu } from '../../components';
import TrybeerContext from '../../context/TrybeerContext';
import { getSaleByUserId } from '../../service/trybeerApi';
import './style.css';

export default function Orders() {
  const history = useHistory();
  const { userLogged, setSaleId, setSaleDate, setTotalPrice } = useContext(TrybeerContext);
  const [ordersFromUser, setOrdersFromUser] = useState([]);

  useEffect(() => {
    const listOrdes = async () => {
      const orders = await getSaleByUserId(userLogged.id);
      setOrdersFromUser(orders);
    };
    listOrdes();
  }, [userLogged.id]);

  const options = {
    day: '2-digit',
    month: '2-digit',
  };

  const handleClick = (id, date, price) => {
    setSaleId(id);
    setSaleDate(date);
    setTotalPrice(price);
    history.push(`/orders/${id}`);
  };

  const handleClassStatus = (orderStatus) => {
    if (orderStatus === 'Pendente') return 'status-pendente';
    if (orderStatus === 'Preparando') return 'status-preparando';
    return 'status-entregue';
  };

  return (
    <div className="orders-container">
      <TopMenu topTitle="Meus Pedidos" />
      <div className="orders-card-container">
        {ordersFromUser.map((order, index) => {
          const priceOrder = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(order.totalPrice);
          const dateOrder = new Intl.DateTimeFormat('pt-BR', options).format(
            Date.parse(order.saleDate),
          );
          return (
            <button
              type="button"
              className="order-card-und-container"
              key={ order.id }
              data-testid={ `${index}-order-card-container` }
              onClick={ () => handleClick(order.id, dateOrder, priceOrder) }
            >
              <div className="order-number-date">
                <h2 data-testid={ `${index}-order-number` }>
                  {`Pedido ${order.id} `}
                </h2>
                <h3 data-testid={ `${index}-order-date` }>{dateOrder}</h3>
              </div>

              <h3
                className="order-price"
                data-testid={ `${index}-order-total-value` }
              >
                {priceOrder}
              </h3>
              <h2 className={ handleClassStatus(order.status) }>{order.status}</h2>
            </button>
          );
        })}
      </div>
    </div>
  );
}
