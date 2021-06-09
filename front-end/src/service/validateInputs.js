const nameMinLength = 12;
const passwordMinLength = 6;

const emailIsValid = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const nameIsValid = (name = '') => name.length >= nameMinLength
&& /^[a-z ]+$/i.test(name);

const passwordIsValid = (password) => password && password.length >= passwordMinLength;

export {
  emailIsValid,
  nameIsValid,
  passwordIsValid,
};
