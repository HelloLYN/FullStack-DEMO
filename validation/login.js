const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = '非法邮箱';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = '请输入邮箱';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = '请输入密码';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
