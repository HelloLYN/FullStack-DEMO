const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = '请输入title';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = '请输入company';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = '请输入from';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
