import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminSideBar from '../../components/AdminSideBar';
import { getAllSales } from '../../service/trybeerApi';
import './style.css';

export default function AdminOrders() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const listSales = async () => {
    const saleData = await getAllSales();
    console.log(saleData);
    if (saleData.error) {
      return setSales([]);
    }
    setSales(saleData);
  };

  const handleClassStatus = (orderStatus) => {
    if (orderStatus === 'Pendente') return 'status-pendente';
    if (orderStatus === 'Preparando') return 'status-preparando';
    return 'status-entregue';
  };

  useEffect(() => {
    setIsLoading(true);
    listSales().then(() => {
      setIsLoading(false);
    });
  }, []);

  const getCards = () => sales.map((sale, index) => (
    <button
      className="order-card-und-container"
      key={ sale.id }
      type="button"
      onClick={ () => history.push(`/admin/orders/${sale.id}`) }
    >
      <div className="order-number-address-container">
        <h2
          className="order-text"
          data-testid={ `${index}-order-number` }
        >
          {`Pedido ${sale.id}`}
        </h2>

        <h3 data-testid={ `${index}-order-address` }>
          {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
        </h3>
      </div>
      <div className="order-price-status-container">
        <h3 data-testid={ `${index}-order-total-value` }>
          {`R$ ${parseFloat(sale.totalPrice)
            .toFixed(2)
            .split('.')
            .join(',')}`}
        </h3>

        <h2
          data-testid={ `${index}-order-status` }
          className={ handleClassStatus(sale.status) }
        >
          {sale.status}
        </h2>
      </div>
    </button>
  ));

  return (
    <div className="admin-orders-container">
      <AdminSideBar topTitle="Meus Pedidos" />
      {isLoading ? (
        <h3 className="admin-orders-card-container">
          <strong>Você não tem pedidos ainda :(</strong>
        </h3>
      ) : (
        <div className="admin-orders-card-container">{getCards()}</div>
      )}
    </div>
  );
}
