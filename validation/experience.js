const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateExperience(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job title is required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  if (!isEmpty(data.current)) {
    if (!validator.isBoolean(data.current)) {
      errors.current = "Only true or false are accepted";
    }
  }

  if (!isEmpty(data.location)) {
    if (!validator.isAscii(data.location)) {
      errors.location = "Only letters and numbers are allowed!";
    }
  }

  if (!isEmpty(data.description)) {
    if (!validator.isAscii(data.description)) {
      errors.description = "Only letters are allowed!";
    }
  }

  if (!isEmpty(data.to)) {
    if (!validator.isDate(data.to)) {
      errors.to = "Only dates are allowed!";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
