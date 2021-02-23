const Joi = require("joi");
const User = require("../models/user.model");

module.exports = {
  // GET /users
  listUsers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      email: Joi.string(),
      role: Joi.string(),
    },
  },

  // POST /users
  createUser: {
    body: {
      // email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      username: Joi.string().max(128).required(),
      role: Joi.string().validate(User.roles),
    },
  },

  // PUT /users/:userId
  replaceUser: {
    body: {
      // email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      username: Joi.string().max(128),
      role: Joi.string().validate(User.roles),
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },

  // PATCH /users/:userId
  updateUser: {
    body: {
      password: Joi.string().min(6).max(128).required(),
      username: Joi.string().max(128).required(),
      role: Joi.string().validate(User.roles),
    }
  },
};
