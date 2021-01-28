const Joi = require("joi");

module.exports = {
  // POST /auth/register
  register: {
    body: {
      username: Joi.string().min(2).max(128).required(),
      password: Joi.string().required().min(6).max(128),
    },
  },

  // POST /auth/login
  login: {
    body: {
      username: Joi.string().max(128).required(),
      password: Joi.string().required().max(128),
    },
  },

  // POST /auth/refresh
  // sendPasswordReset: {
  //   body: {
  //     email: Joi.string()
  //       .email()
  //       .required()
  //   }
  // },

  // // POST /auth/password-reset
  // passwordReset: {
  //   body: {
  //     email: Joi.string()
  //       .email()
  //       .required(),
  //     password: Joi.string()
  //       .required()
  //       .min(6)
  //       .max(128),
  //     resetToken: Joi.string().required()
  //   }
  // }
};
