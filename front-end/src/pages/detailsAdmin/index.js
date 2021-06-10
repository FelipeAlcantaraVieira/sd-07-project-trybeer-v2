import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminSideBar from '../../components/AdminSideBar';
import { updateSaleStatus, orderById } from '../../service/trybeerApi';

const ENTREGUE = 'Entregue';
const PREPARANDO = 'Preparando';

export default function AdminDetails() {
  const { id } = useParams();
  const [orderId] = useState(id);
  const [orderStatus, setOrderStatus] = useState('Pendente');
  const [totalPrice, setTotalPrice] = useState([]);
  const [order, setOrder] = useState([{
    name: '',
    qtd: '',
    status: '',
    unitPrice: '',
  }]);

  const getOrderValue = (array) => array.map((product) => product.qtd * product.unitPrice)
    .reduce((acc, curr) => acc + curr);

  useEffect(() => {
    const fetchSale = async () => {
      const orderData = await orderById(orderId);
      setOrder(orderData);
      if (orderData.length > 0) {
        setTotalPrice(getOrderValue(orderData));
        setOrderStatus(orderData[0].status || 'Pendente');
      }
    };
    fetchSale();
  }, [orderId]);

  const handleClick = (status) => {
    updateSaleStatus(status, orderId);
    setOrderStatus(status);
  };

  const renderRenderButton = (status, testid, text) => {
    const button = (
      <button
        type="button"
        data-testid={ testid }
        onClick={ () => handleClick(status) }
      >
        { text }
      </button>
    );
    return orderStatus !== ENTREGUE ? button : '';
  };

  return (
    <div>
      <AdminSideBar />
      <div>
        <h4 data-testid="order-number">{`Pedido ${orderId}`}</h4>
        <h4 data-testid="order-status">{` ${orderStatus}`}</h4>
      </div>
      <div>
        {order && order.map((product, index) => (
          <div
            key={ index }
          >
            <span data-testid={ `${index}-product-qtd` }>{product.qtd}</span>
            <span data-testid={ `${index}-product-name` }>{ ` ${product.name} ` }</span>
            <span data-testid={ `${index}-product-total-value` }>
              { `R$ ${(product.qtd * parseFloat(product.unitPrice))
                .toFixed(2).split('.').join(',')}` }
            </span>
            <span data-testid={ `${index}-order-unit-price` }>
              { `(R$ ${parseFloat(product.unitPrice)
                .toFixed(2).split('.').join(',')})` }
            </span>

          </div>
        ))}
      </div>
      <span data-testid="order-total-value">
        {
          `Total: R$ ${parseFloat(totalPrice).toFixed(2).split('.').join(',')}`
        }
      </span>
      { renderRenderButton(PREPARANDO, 'mark-as-prepared-btn', 'Preparar pedido') }
      { renderRenderButton(ENTREGUE, 'mark-as-delivered-btn', 'Marcar como entregue') }
    </div>
  );
}
