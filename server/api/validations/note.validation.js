const Joi = require("joi");

module.exports = {
  // GET notes
  listNotes: {
    query: {
      limit: Joi.number().min(1),
      skip: Joi.number(),
    },
  },

  // POST notes
  createNote: {
    body: {
      content: Joi.string().min(3).max(1000).required(),
    },
  },

  // PATCH notes/:noteId
  updateNote: {
    body: {
      content: Joi.string().min(3).max(1000),
    },
    params: {
      noteId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
