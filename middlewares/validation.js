const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

function clothingItemValidation(res, req, next) {
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30).messages({
          "string.min": 'The minimum length of the "name" field is 2',
          "string.max": 'The maximum length of the "name" field is 30',
          "string.empty": 'The "name" field must be filled in',
        }),
        imageUrl: Joi.string().required().custom(validateURL).messages({
          "string.empty": 'The "imageUrl" field must be filled in',
          "string.uri": 'the "imageUrl" field must be a valid url',
        }),
      })
      .unknown(true),
  });
  return next();
}

function userValidation(res, req, next) {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "avatar" field must be filled in',
        "string.uri": 'the "avatar" field must be a valid url',
      }),
      email: Joi.string().required().email().messages({
        "string.email": 'The "email" field must be a valid email address',
        "string.empty": 'The "email" field must be filled in',
      }),
      password: Joi.string().required().messages({
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  });
  return next();
}

function loginValidation(res, req, next) {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().messages({
        "string.email": 'The "email" field must be a valid email address',
        "string.empty": 'The "email" field must be filled in',
      }),
      password: Joi.string().required().messages({
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  });
  return next();
}

function idValidation(res, req, next) {
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex.length(24).messages({
        "string.hex":
          'The "_id" field must only contain hexidecimal characters',
        "string.length": 'The "_id" field must be 24 characters exactly',
      }),
    }),
  });
  return next();
}

module.exports = {
  clothingItemValidation,
  userValidation,
  loginValidation,
  idValidation,
};
