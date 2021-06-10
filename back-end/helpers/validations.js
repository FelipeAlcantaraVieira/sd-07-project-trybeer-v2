const emailIsValid = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const nameIsValid = (name = '') => {
  const nameMinLength = 12;
  return name.length >= nameMinLength && /^[a-z ]+$/i.test(name);
};

const passwordIsValid = (password) => password && password.length >= 6;

const statusIsValid = (status) => status === 'Pendente'
  || status === 'Preparando'
  || status === 'Entregue';

module.exports = { emailIsValid, passwordIsValid, nameIsValid, statusIsValid };
