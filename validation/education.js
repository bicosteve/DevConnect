const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateEducation(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "School is required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }

  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  if (!isEmpty(data.current)) {
    if (!validator.isBoolean(data.current)) {
      errors.current = "Only true or false are accepted";
    }
  }

  if (!isEmpty(data.description)) {
    if (!validator.isAscii(data.description)) {
      errors.description = "Only letters and numbers are allowed!";
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
