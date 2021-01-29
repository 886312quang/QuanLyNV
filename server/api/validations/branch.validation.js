const Joi = require("joi");

module.exports = {
  // GET /branchs
  listBranchs: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
    },
  },

  // POST /branchs
  createBranch: {
    body: {
      name: Joi.string().min(3).max(128).required(),
    },
  },

  // PUT /branchs/:branchId
  replaceBranch: {
    body: {
      name: Joi.string().min(3).max(128),
    },
    params: {
      branchId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },

  // PATCH /branchs/:branchId
  updateBranch: {
    body: {
      name: Joi.string().min(3).max(128),
    },
    params: {
      branchId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
