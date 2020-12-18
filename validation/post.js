const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validatePost(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 1, max: 400 })) {
    errors.text = "Post must be between 1 and 300 characters!";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field  is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
