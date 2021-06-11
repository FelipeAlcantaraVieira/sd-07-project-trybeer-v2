const { User } = require('../../models');
const { nameIsValid, passwordIsValid, emailIsValid } = require('../../helpers/validations');

const getAll = async () => (User.findAll());

const getByEmail = async (email) => User.findAll({ where: { email } });

const create = async (name, email, password, role) => {
  const bodyIsValid = nameIsValid(name) && passwordIsValid(password) && emailIsValid(email);
  if (!bodyIsValid) return { error: true, message: 'dados inválidos' };
  const [userExists] = await getByEmail(email);
  if (userExists) return { error: true, message: 'Já existe um usuário com esse e-mail.' };
  await User.create({ name, email, password, role });
  return { error: false, message: 'usuário cadastrado com sucesso' };
};

const update = async (name, email) => {
  const bodyIsValid = nameIsValid(name) && emailIsValid(email);
  if (!bodyIsValid) return { error: true, message: 'dados inválidos' };
  const userExists = await getByEmail(email);
  if (!userExists) return { error: true, message: 'usuário não encontrado' };
  await User.update({ name }, { where: { email } });
  return { error: false, message: 'Atualização concluída com sucesso' };
};

module.exports = {
  getAll,
  getByEmail,
  create,
  update,
};
