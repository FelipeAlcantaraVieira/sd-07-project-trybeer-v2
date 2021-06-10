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

  useEffect(() => {
    setIsLoading(true);
    listSales().then(() => {
      setIsLoading(false);
    });
  }, []);

  const getCards = () => sales.map((sale, index) => (

    <button
      key={ sale.id }
      type="button"
      onClick={ () => history.push(`/admin/orders/${sale.id}`) }
    >
      <div className="div-cards">
        <h4 data-testid={ `${index}-order-number` }>
          {`Pedido ${sale.id}`}
        </h4>

        <h4 data-testid={ `${index}-order-address` }>
          {
            `${sale.deliveryAddress}, ${sale.deliveryNumber}`
          }
        </h4>

        <h3 data-testid={ `${index}-order-total-value` }>
          {
            `R$ ${parseFloat(sale.totalPrice)
              .toFixed(2).split('.').join(',')}`
          }
        </h3>

        <h4 data-testid={ `${index}-order-status` }>
          {sale.status}
        </h4>
      </div>
    </button>
  ));

  return (
    <div>
      <AdminSideBar />
      <h2>Pedidos</h2>
      {
        isLoading ? <span>carregando...</span> : getCards()
      }
    </div>
  );
}
