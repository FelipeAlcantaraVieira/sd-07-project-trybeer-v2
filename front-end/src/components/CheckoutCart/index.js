import React, { useState } from 'react';
import { Card, CardDeck, Button, Form, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { createSale } from '../../services/apiService';

export default function CheckoutCart() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const newProductsList = JSON.parse(localStorage.getItem('newProdList'));
  const totalPrice = JSON.parse(localStorage.getItem('total'));
  const history = useHistory();

  const [addressName, setAddressName] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [total, setTotal] = useState(totalPrice);
  const [productCheckout] = useState(newProductsList);
  const [saleComplete, setSaleComplete] = useState(false);
  const [saleMessage, setSaleMessage] = useState('');

  const removeProduct = (id) => {
    const product = newProductsList.find((item) => item.id === id);
    const value = (total - (product.price * product.productQtt));
    setTotal(value.toFixed(2));
    productCheckout.find((item) => item.id === id).productQtt = 0;
    localStorage.setItem('newProdList', JSON.stringify(productCheckout));
    localStorage.setItem('total', value.toFixed(2));
  };

  const submitSale = async () => {
    const productList = productCheckout.filter((item) => item.productQtt !== 0);
    const sale = productList.map((item) => ({
      productName: item.name,
      quantity: item.productQtt,
      deliveryAddress: addressName,
      deliveryNumber: Number(addressNumber),
    }));
    const response = await createSale(currentUser.token, sale);
    setSaleMessage(response.message);
    setSaleComplete(true);
    const partaMaisZero = 3000;
    setTimeout(() => {
      history.push('/products');
      localStorage.removeItem('total');
      localStorage.removeItem('newProdList');
    }, partaMaisZero);
  };

  if (!currentUser) return null;
  return (
    <div
      style={ { color: 'white' } }
    >
      <p>Produtos</p>
      { total === '0.00' || total === 0 ? <p>Não há produtos no carrinho</p>
        : (
          <CardDeck>
            {productCheckout.filter((item) => item.productQtt !== 0)
              .map((product, index) => (
                <Card
                  key={ product.name }
                  style={ { backgroundColor: 'rgb(0,0,0,0.41)' } }
                >
                  <Card.Body>
                    <Card.Title data-testid={ `${index}-product-name` }>
                      {product.name}
                    </Card.Title>
                    <Card.Text data-testid={ `${index}-product-qtd-input` }>
                      Quantidade:
                      {product.productQtt}
                    </Card.Text>
                    <Card.Text data-testid={ `${index}-product-total-value` }>
                      {`R$ ${(product.price * product.productQtt)
                        .toFixed(2).replace('.', ',')}`}
                    </Card.Text>
                    <Card.Text data-testid={ `${index}-product-unit-price` }>
                      {`(R$ ${product.price.replace('.', ',')} un)`}
                    </Card.Text>
                  </Card.Body>
                  <Button
                    type="button"
                    data-testid={ `${index}-removal-button` }
                    onClick={ () => removeProduct(product.id) }
                  >
                    X
                  </Button>
                </Card>
              ))}
          </CardDeck>)}
      <p
        data-testid="order-total-value"
        style={ { marginTop: '5vh' } }
      >
        {total > 0 ? `Total: R$ ${parseFloat(total).toFixed(2).replace('.', ',')}`
          : 'Total: R$ 0,00'}
      </p>
      <Form>
        <p>Endereço</p>
        <Form.Row>
          <Form.Group as={ Col }>
            <Form.Label htmlFor="street">
              Rua:
            </Form.Label>
            <Form.Control
              name="street"
              type="text"
              value={ addressName }
              onChange={ (e) => setAddressName(e.target.value) }
              data-testid="checkout-street-input"
              style={ { color: 'white', backgroundColor: 'rgb(0,0,0,0.4)' } }
            />
          </Form.Group>
          <Form.Group as={ Col }>
            <Form.Label htmlFor="number">
              Número da casa:
            </Form.Label>
            <Form.Control
              name="number"
              value={ addressNumber }
              onChange={ (e) => setAddressNumber(e.target.value) }
              type="text"
              data-testid="checkout-house-number-input"
              style={ { color: 'white', backgroundColor: 'rgb(0,0,0,0.4)' } }
            />
          </Form.Group>
        </Form.Row>
      </Form>
      {saleComplete && <p>{saleMessage}</p>}
      <Button
        type="submit"
        data-testid="checkout-finish-btn"
        disabled={ !(total > 0 && addressName && addressNumber) }
        onClick={ () => submitSale() }
      >
        Finalizar Pedido
      </Button>
    </div>
  );
}
