const validateRegister = (name, email, password) => {
  const specialCharReg = /^[a-zA-Z\s]*$/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const NAME_MIN_LENGTH = 12;
  const PASSWORD_MIN_LENGTH = 6;

  if (!name || name.length < NAME_MIN_LENGTH || !specialCharReg.test(name)) {
    return true;
  }
  if (!password || password.length < PASSWORD_MIN_LENGTH) {
    return true;
  }
  if (!email || !emailRegex.test(email)) {
    return true;
  }
  return false;
};

export default validateRegister;
