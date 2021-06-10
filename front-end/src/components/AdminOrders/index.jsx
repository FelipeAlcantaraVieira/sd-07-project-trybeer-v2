import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getAdminSales } from '../../services/apiService';

export default function AdminOrders() {
  const [adminSales, setAdminSales] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchSales = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return null;
      const response = await getAdminSales(currentUser.token)
        .then((apiResponse) => apiResponse);
      if (response && Object.values(response).length > 0) {
        setAdminSales(response);
      }
    };
    fetchSales();
  }, []);

  if (!adminSales) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={ { marginBottom: '23vh' } }
    >
      { adminSales.err ? <p>{adminSales.err.message}</p>
        : adminSales.map((item, index) => (
          <Card
            type="button"
            data-testid={ `${index}-order-card-container}` }
            key={ item.id }
            onClick={ () => history.push(`/admin/orders/${item.id}`) }
            role="button"
            onKeyDown={ () => history.push(`/admin/orders/${item.id}`) }
            tabIndex={ 0 }
            className="border rounded"
            style={ { margin: '3vh',
              width: '90vh',
              backgroundColor: 'rgb(0,0,0,0.5)',
              color: 'white',
              padding: '3vh' } }
          >
            <Row>
              <Col>
                <p
                  data-testid={ `${index}-order-number` }
                >
                  {`Pedido ${item.id}`}
                </p>
              </Col>
              <Col>
                <p
                  data-testid={ `${index}-order-address` }
                >
                  {`${item.deliveryAddress.concat(', ', item.deliveryNumber)}`}
                </p>
              </Col>
              <Col>
                <p
                  data-testid={ `${index}-order-status` }
                >
                  {item.status}
                </p>
              </Col>
              <Col>
                <p
                  data-testid={ `${index}-order-total-value` }
                >
                  {`R$ ${item.totalPrice.replace('.', ',')}`}
                </p>
              </Col>
            </Row>
          </Card>
        ))}
    </div>
  );
}
