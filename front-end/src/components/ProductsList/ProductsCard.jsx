import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ProductsCard({ item, index, addProdQtt, decProdQtt }) {
  return (
    <Card
      style={ {
        width: '18rem',
        color: 'rgb(232,214,210)',
        paddingBottom: '2rem',
        backgroundColor: 'rgb(0,0,0,0.5)',
      } }
      className="align-self-center text-center"
    >
      <Card.Header
        data-testid={ `${index}-product-name` }
        style={ { color: 'white' } }
      >
        {item.name}
      </Card.Header>
      <Card.Body>
        <Card.Text
          data-testid={ `${index}-product-price` }
          style={ { color: 'white' } }
        >
          {`R$ ${item.price.replace('.', ',')}`}
        </Card.Text>
        <Row>
          <Col>
            <Button
              type="button"
              style={ { background: 'rgb(30,30,255)' } }
              data-testid={ `${index}-product-minus` }
              onClick={ () => decProdQtt(item.id) }
            >
              -
            </Button>
          </Col>
          <Col>
            <p data-testid={ `${index}-product-qtd` }>
              {item.productQtt}
            </p>
          </Col>
          <Col>
            <Button
              type="button"
              style={ { background: 'rgb(30,30,255)' } }
              data-testid={ `${index}-product-plus` }
              onClick={ (e) => addProdQtt(e, item.id) }
            >
              +
            </Button>
          </Col>
        </Row>
      </Card.Body>
      <Card.Img
        className="align-self-center"
        style={ { width: '60%', background: 'transparent' } }
        variant="bottom"
        src={ item.url_image }
        alt={ item.name }
        data-testid={ `${index}-product-img` }
      />
    </Card>
  );
}

export default ProductsCard;

ProductsCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    productQtt: PropTypes.number,
    url_image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  addProdQtt: PropTypes.func.isRequired,
  decProdQtt: PropTypes.func.isRequired,
};
