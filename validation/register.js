const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  /**
   * validator必须是传入字符串
   * 当用户传入的是空值时,将其输入转为'',没有下面的处理会报下面的错误(什么都不传的时候)
   * TypeError: Expected string but received a undefined.
   */

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
    errors.name = '名字必须是2个字符到30个字符之间';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = '请输入名字';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = '请输入邮箱';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = '非法的邮箱';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = '请输入密码';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = '密码长度必须是6位以上';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = '请再次输入密码';
  } else {
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = '两次的密码不匹配';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
