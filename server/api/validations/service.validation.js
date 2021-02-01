const Joi = require("joi");

module.exports = {
  // GET /services
  listServices: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      code: Joi.string(),
      name: Joi.string(),
      branch: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      favorite: Joi.bool(),
    },
  },

  // POST /services
  createService: {
    body: {
      name: Joi.string().min(3).max(128).required(),
      code: Joi.string().required(),
      name: Joi.string(),
      items: Joi.array().min(1).required(),
      branch: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      favorite: Joi.bool(),
    },
  },

  // // PUT /services/:serviceId
  // replaceService: {
  //   body: {
  //     name: Joi.string()
  //       .min(3)
  //       .max(128)
  //   },
  //   params: {
  //     serviceId: Joi.string()
  //       .regex(/^[a-fA-F0-9]{24}$/)
  //       .required()
  //   }
  // },

  // PATCH /services/:serviceId
  updateService: {
    body: {
      name: Joi.string().min(3).max(128),
      code: Joi.string(),
      name: Joi.string(),
      branch: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      favorite: Joi.bool(),
      items: Joi.array().min(1),
    },
  },
  params: {
    serviceId: Joi.string()
      .regex(/^[a-fA-F0-9]{24}$/)
      .required(),
  },
};
