import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getUserSalesInfo } from '../../services/apiService';

export default function ClientOrders() {
  const [userSales, setUserSales] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchSales = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return null;
      const response = await getUserSalesInfo(currentUser.token)
        .then((apiResponse) => apiResponse);
      // console.log(response);
      if (response && Object.values(response).length > 0) {
        setUserSales(response);
      }
    };
    fetchSales();
  }, []);

  if (!userSales) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={ {
        overflow: 'auto',
      } }
    >
      { userSales.err ? <p>{userSales.err.message}</p>
        : (
          <CardDeck style={ { paddingTop: '15px' } }>
            {userSales.map((item, index) => (
              <Card
                key={ item.saleId }
                style={ {
                  backgroundColor: 'rgb(0,0,0,0.5)',
                  color: 'white',
                  padding: '15px',
                  margin: '20px',
                } }
              >
                <div
                  type="button"
                  data-testid={ `${index}-order-card-container}` }
                  onClick={ () => history.push(`/orders/${item.saleId}`) }
                  role="button"
                  onKeyDown={ () => history.push(`/orders/${item.saleId}`) }
                  tabIndex={ 0 }
                >
                  <Row>
                    <Col>
                      <p data-testid={ `${index}-order-number` }>
                        {`Pedido ${item.saleId}`}
                      </p>
                    </Col>
                    <Col>
                      <p data-testid={ `${index}-order-date` }>{item.saleDate}</p>
                    </Col>
                    {console.log(item)}
                    <Col>
                      <p>{item.status}</p>
                    </Col>
                  </Row>
                  <p data-testid={ `${index}-order-total-value` }>
                    {`R$ ${item.totalPrice.replace('.', ',')}`}
                  </p>
                </div>
              </Card>
            ))}
          </CardDeck>
        )}
    </div>
  );
}
