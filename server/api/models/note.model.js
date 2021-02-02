const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../utils/APIError");

/**
 * Note Schema
 * @private
 */
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 3,
    maxlength: 1000,
    trim: true,
    unique: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createAt: { type: Date, default: Date.now },
});

/**
 * Methods
 */
noteSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "content", "isRead"];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
noteSchema.statics = {
  /**
   * Get note
   *
   * @param {ObjectId} id - The objectId of note.
   * @returns {Promise<Note, APIError>}
   */
  async get(id) {
    try {
      let note;

      if (mongoose.Types.ObjectId.isValid(id)) {
        note = await this.findById(id).exec();
      }
      if (note) {
        return note;
      }

      throw new APIError({
        message: "Note does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List notes in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of notes to be skipped.
   * @param {number} limit - Limit number of notes to be returned.
   * @returns {Promise<Note[]>}
   */
  list({ limit = 6, skip = 0 }) {
    return this.find({})
      .sort({ isRead: 1 })
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }, /**
  * Return new validation error
  * if error is a mongoose duplicate key error
  *
  * @param {Error} error
  * @returns {Error|APIError}
  */
 checkDuplicateBranchname(error) {
   if (error.name === "MongoError" && error.code === 11000) {
     return new APIError({
       message: "Note already exists",
       errors: [
         {
           field: "name",
           location: "body",
           messages: ["'note' already exists"],
         },
       ],
       status: httpStatus.CONFLICT,
       isPublic: true,
       stack: error.stack,
     });
   }
   return error;
 },
};



/**
 * @typedef Note
 */
module.exports = mongoose.model("Note", noteSchema);
