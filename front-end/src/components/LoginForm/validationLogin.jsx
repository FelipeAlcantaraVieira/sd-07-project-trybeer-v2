const validateLogin = (email, password) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const PASSWORD_MIN_LENGTH = 6;

  if (!password || password.length < PASSWORD_MIN_LENGTH) {
    return true;
  }
  if (!email || !emailRegex.test(email)) {
    return true;
  }
  return false;
};

export default validateLogin;
