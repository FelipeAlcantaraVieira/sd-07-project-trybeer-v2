# Servidor rodando utilizando as seguintes variaveis de ambiente

HOSTNAME=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
PORT=3001

# Mensagens de erro

Todas as mensagens de erro seguem o seguinte formato:

{
  "err": {
    "message": "Mensagem de erro"
  }
}

## Criação de novo usuario

Rota: localhost:3001/user
Metodo: POST

Passar o seguinte json no body:

{
 "name": "",
 "email": "",
 "password": "",
 "role": "client"
}

O usuário não pode ter caracteres especiais ou números.
Todos os campos são obrigatórios.

Em caso de sucesso, o retorno é o seguinte:

{
  "message": "Usuário cadastrado com sucesso"
}

## Gerar token (login)

Rota: localhost:3001/login
Metodo: POST

O header deve conter o seguinte:
authorization: token

Passar o seguinte json no body:
{
 "email":"",
 "password":""
}

O usuário deve estar cadastrado.

Exemplo de retorno em caso de sucesso:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RhbmRvQHRlc3RhbmRvLmNvbSIsInBhc3N3b3JkIjoidGhhZGV1IiwiaWF0IjoxNjIwMjI4Mzk0LCJleHAiOjE2MjAzMTQ3OTR9.ecmmf_1PwEF1x3YwWU6Whg4ph06EYQ1jSOU2Wxatx94",
  "name": "Teste Doze Caracteres",
  "email": "testando@testando.com",
  "role": "client"
}

## Atualizar nome de usuario

Rota: localhost:3001/user
Metodo: PUT

O header deve conter o seguinte:
authorization: token

Passar o seguinte json no body:

{
  "name":"Novo nome de usuário"
}

O novo nome deve seguir os padrões do cadastro, 12 caracteres sem números ou caracteres especiais.

Em caso de sucesso, o retorno é o seguinte:

{
  "message": "Atualização concluída com sucesso"
}

## Carregando imagem do banco

Rota: localhost:3001/images/nome do arquivo.jpg
Metodo: GET

Essa rota retorna a imagem, o nome do arquivo pode ser passado com espaço.

Em caso de sucesso, é retornada a imagem.

## Carregando todos os produtos

Rota: localhost:3001/products
Metodo: GET

O header deve conter o seguinte:
authorization: token

Caso sucesso:

[
  {
    "id": 1,
    "name": "Skol Lata 250ml",
    "price": "2.20",
    "url_image": "<http://localhost:3001/images/Skol> Lata 350ml.jpg"
  },
  {
    "id": 2,
    "name": "Heineken 600ml",
    "price": "7.50",
    "url_image": "<http://localhost:3001/images/Heineken> 600ml.jpg"
  }
]

## Criando venda

Rota: localhost:3001/sales
Metodo: POST

O header deve conter o seguinte:
authorization: token

Passar o seguinte json no body:

[
  {
  "productName":"",
  "quantity":1,
  "totalPrice":1,
  "deliveryAddress":"",
  "deliveryNumber":1,
  }
]

Os campos quantity, totalPrice, deliveryNumber devem ser numeros.

quantity e totalPrice devem ser maiores que 1.

Apenas os campos status e deliveryNumber são opcionais.

## Consultando compras (cliente)

Rota: localhost:3001/sales/users
Metodo: GET

O header deve conter o seguinte:
authorization: token

Caso exista alguma compra o retorno será um JSON com o seguinte:

[
  {
    "saleId": 1,
    "saleDate": "05/07",
    "totalPrice": "343.98"
  },
  {
    "saleId": 2,
    "saleDate": "05/07",
    "totalPrice": "343.98"
  }
]

## Consultando vendas (administrador)

Rota: localhost:3001/sales/admin
Metodo: GET

O header deve conter o seguinte:
authorization: token
O usuário deve ser um administrador

Caso exista alguma compra o retorno será um JSON com o seguinte:

[
  {
    "saleId": 1,
    "saleDate": "05/07",
    "totalPrice": "343.98"
  },
  {
    "saleId": 2,
    "saleDate": "05/07",
    "totalPrice": "343.98"
  }
]

## Consultando detalhes da compra

Rota: localhost:/3001/sales/users/:saleid
Metodo: GET

O header deve conter o seguinte:
authorization: token

Passar o id da compra como parâmetro ex: localhost:3001/sales/users/1

Caso exista uma compra com o id buscado, será retornado o JSON:

[
  {
    "sale_id": 1,
    "sale_date": "2021-05-07T18:21:30.000Z",
    "quantity": "21",
    "name": "Skol Lata 250ml",
    "price": "2.20",
    "total_price": "343.98",
    "user_id": 3
  },
  {
    "sale_id": 1,
    "sale_date": "2021-05-07T18:21:30.000Z",
    "quantity": "21",
    "name": "Brahma 600ml",
    "price": "7.50",
    "total_price": "343.98",
    "user_id": 3
  }
]

## Atualizando o status da venda

Rota: localhost:/3001/sales/admin/:id
Método: PUT

O header deve conter o seguinte:
authorization: token
O usuário deve ser um administrador

Passar o id da compra como parâmetro ex: localhost:3001/sales/admin/1

Em caso de sucesso, o retorno será o seguinte:

{
  "message": "Pedido registrado como entregue"
}
