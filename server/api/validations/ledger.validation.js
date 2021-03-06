const Joi = require("joi");
const typesReport = ["staff"];

module.exports = {
  // GET /ledgers
  listLedgers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      shift: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },

  reportLedger: {
    query: {
      type: Joi.string().valid(typesReport).required(),
      branch: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      start: Joi.date().timestamp().required(),
      start: Joi.date().timestamp().required(),
    },
  },

  // POST /ledgers
  createLedger: {
    body: {
      vnname: Joi.string().allow("").max(128),
      runame: Joi.string().allow("").max(128),
      cash: Joi.number(),
      certificate: Joi.number(),
      duration: Joi.number(),
      staff: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      shift: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      flag: Joi.boolean(),
    },
  },

  // PATCH /ledgers/:ledgerId
  updateLedger: {
    body: {
      vnname: Joi.string().allow("").max(128),
      runame: Joi.string().allow("").max(128),
      cash: Joi.number(),
      certificate: Joi.number(),
      duration: Joi.number(),
      staff: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      shift: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      flag: Joi.boolean(),
    },
    params: {
      ledgerId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
