const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = '请输入10到300个字符';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = '请输入文本内容';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
