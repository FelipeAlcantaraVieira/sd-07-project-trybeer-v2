const {
  registerUser,
  userLogin,
  updateUser,
  getProducts,
  createSale,
  getUserSalesInfo,
  getUserSaleDetails,
  getAdminSales,
  getAdminSalesDetails,
  updateSalesStatus,
} = require('../services/apiService');
const { users, tokens } = require('./config/parameters');
const connect = require('../../../back-end/models/connection');
const db = require('../../../back-end/tests/config/querySQL');
const script = require('./config/script');
const { insetUsers } = require('../../../back-end/tests/config/querySQL');
const sale = [
  {
    productName: 'Brahma 600ml',
    quantity: 10,
    totalPrice: 1,
    deliveryAddress: 'Teste',
    status: 'Pendente',
  },
  {
    productName: 'Skol 269ml',
    quantity: 1,
    totalPrice: 1,
    deliveryAddress: 'Teste',
    deliveryNumber: 1,
    status: 'Pendente',
  },
];

beforeAll(async (done) => {
  await connect.execute(db.dropSaleTables);
  await connect.execute('DROP TABLE IF EXISTS users;')
  await connect.execute(db.createUsers);
  await connect.execute(db.insertUsers);
  await connect.execute(db.createSales);
  await connect.execute(db.createSaleProducts);
  done();
});

describe('Criando usuario', () => {
  test('Deve ser possivel cadastrar um usuario', async (done) => {
    const response = await registerUser(users.newUser);
    expect(response).toMatchObject({
      token: response.token,
      name: response.name,
      email: response.email,
      role: response.role,
      id: response.id,
    });
    done();
  });
});

describe('Realizando login', () => {
  test('O fetch deve retornar um json com id, email, name, role e token ', async (done) => {
    const response = await userLogin(users.newUser);
    expect(response).toMatchObject({
      email: response.email,
      id: response.id,
      name: response.name,
      role: response.role,
      token: response.token,
    });
    done();
  });
});

describe('Atualizando nome do usuario', () => {
  test('Deve ser possivel atualizar o nome do usuario', async (done) => {
    const response = await updateUser(tokens.user.authorization, {
      name: 'Joaquim Barbosa Da Silva',
      email: users.newUser.email,
    });
    expect(response).toMatchObject({ message: 'Atualização concluída com sucesso' });
    done();
  });
});

describe('Obtendo a lista de produtos', () => {
  test('Deve retornar uma lista com todos os produtos', async (done) => {
    const response = await getProducts(tokens.admin.authorization);
    expect(response).toHaveLength(11);
    done();
  });
});

describe('Criando uma compra', () => {
  test('A compra deve ser cadastrada com sucesso', async (done) => {
    const response = await createSale(tokens.user.authorization, sale);
    expect(response).toMatchObject({"message": "Compra realizada com sucesso!"});
    done();
  });
});

describe('Obtendo a lista de todos as vendas', () => {
  test('Deve retornar uma lista com todas as vendas realizadas', async (done) => {
    const response = await getAdminSales(tokens.admin.authorization);
    expect(response).toHaveLength(1);
    done();
  });
});

describe('Obtendo as compras do usuário', () => {
  test('Deve retornar as informações da compra do usuário', async (done) => {
    const response = await getUserSalesInfo(tokens.user.authorization);
    expect(response).toHaveLength(1);
    done();
  });
});

describe('Obtendo os detalhes de um produto como usuário', () => {
  test('Deve retornar os detalhes de um produto específico', async (done) => {
    const response = await getUserSaleDetails(tokens.user.authorization, 1);
    expect(response).toHaveLength(2);
    done();
  });
});

describe('Obtendo os detalhes de um produto como administrador', () => {
  test('Deve retornar os detalhes de um produto específico', async (done) => {
    const response = await getAdminSalesDetails(tokens.admin.authorization, 1);
    expect(response).toHaveLength(2);
    done();
  });
});

describe('Atualizando o status de uma venda', () => {
  test('Deve alterar o status de uma venda específica', async (done) => {
    const response = await updateSalesStatus(tokens.admin.authorization, 'Entregue', 1);
    expect(response).toMatchObject({"message": "Pedido registrado como Entregue"});
    done();
  });
});

afterAll(async () => connect.end());
