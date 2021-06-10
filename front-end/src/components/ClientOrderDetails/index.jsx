import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserSaleDetails } from '../../services/apiService';

export default function ClientOrderDetails() {
  const { id } = useParams();

  const [sale, setSale] = useState(null);
  // const [totalValue, setTotalValue] = useState(0 || sale[0].total_price)

  // console.log(sale);

  useEffect(() => {
    const fetchSale = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return null;
      const response = await getUserSaleDetails(currentUser.token, id)
        .then((apiResponse) => apiResponse);
      setSale(response);
    };
    fetchSale();
  }, [id]);

  // https://stackoverflow.com/questions/25159330/
  const dateFormate = (date) => {
    date = new Date(date);
    const DAY_PARAM = 9;
    const monthd = date.getMonth() + 1;
    const day = date.getDate() <= DAY_PARAM ? `0${date.getDate()}` : date.getDate();
    const month = monthd <= DAY_PARAM ? `0${monthd}` : monthd + 1;
    return `${day}/${month}`;
  };

  return (
    <div
      className="d-flex flex-column border rounded"
      style={ { marginTop: '5vh',
        padding: '3vh',
        backgroundColor: 'rgb(0,0,0,0.2)',
        color: 'white',
        width: '50%',
        marginLeft: '20vh' } }
    >
      <div>
        <p data-testid="order-number">{`Pedido ${id}`}</p>
        <p data-testid="order-date">
          {sale ? dateFormate(sale[0].sale_date) : null }
        </p>
        { sale ? sale.map((item, index) => {
        // totalValue = item.total_price;
          const productTotalValue = (item.price * item.quantity).toFixed(2);

          return (
            <div
              key={ item.name }
              className="d-flex border rounded justify-content-around"
              style={ { margin: '2vh', padding: '1vh' } }
            >
              <p data-testid={ `${index}-product-qtd` }>{item.quantity}</p>
              <p data-testid={ `${index}-product-name` }>{item.name}</p>
              <p data-testid={ `${index}-product-total-value` }>
                {`R$ ${String(productTotalValue).replace('.', ',')}`}
              </p>
            </div>
          );
        }) : null }
      </div>
      <p data-testid="order-total-value" className="align-self-end">
        <span>Total:</span>
        {' '}
        {sale ? `R$ ${sale[0].total_price.replace('.', ',')}` : 'R$ 0,00'}
      </p>
    </div>
  );
}
