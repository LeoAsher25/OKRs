const REGEX = {
  email: /^[\w\.]+@([\w]+\.)+[\w]{2,7}$/,
  password: /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
};
export default REGEX;
