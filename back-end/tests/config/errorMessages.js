const message = {
  nameRequired: { err: { message: '"name" is required' } },
  emailRequired: { err: { message: '"email" is required' } },
  passwordIsRequired: { err: { message: '"password" is required' } },
  roleIsRequired: { err: { message: '"role" is required' } },
  invalidNameLength: {
    err: { message: '"name" length must be at least 12 characters long' },
  },
  invalidEmailType: { err: { message: '"email" must be a valid email' } },
  invalidPasswordLength: {
    err: { message: '"password" length must be at least 6 characters long' },
  },
  invalidRoleName: { err: { message: '"role" must be one of [client, administrator]' } },
  emailTaken: { err: { message: 'Já existe um usuário com esse e-mail.' } },
  invalidToken: { err: { message: 'jwt must be provided' } },
  errorInvalidQuantity: {
    err: { message: '"quantity" must be greater than or equal to 1' },
  },
  errorInvalidAddress: {
    err: { message: '"deliveryAddress" is not allowed to be empty' },
  },
  errorInvalidDeliveryNumber: { err: { message: '"deliveryNumber" must be a number' } },
  quantityRequired: { err: { message: '"quantity" is required' } },
  addressRequired: { err: { message: '"deliveryAddress" is required' } },
  productNameRequired: { err: { message: '"productName" is required' } },
  notAdministrator: { err: { message: 'Usuário não é um administrador' } },
  createdSale: { message: 'Compra realizada com sucesso!' },
  sucessChangeStatus: { message: 'Pedido registrado como Entregue' },
  wrongStatus: { err: { message: '"value" must be one of [Pendente, Entregue]' } },
  emptySales: { err: { message: 'Não existem vendas cadastradas' } },
  errorToken: { err: { message: 'Invalid token' } },
  emailMustBeValid: { err: { message: '"email" must be a valid email' } },
  notAllowedEmptyEmail: { err: { message: '"email" is not allowed to be empty' } },
  notAllowedEmptyPassword: { err: { message: '"password" is not allowed to be empty' } },
  emailIsRequired: { err: { message: '"email" is required' } },
  wrongPasswordLength: {
    err: { message: '"password" length must be at least 6 characters long' },
  },
  userNotRegistered: { err: { message: 'Usuário inválido' } },
};

module.exports = message;
