const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const jwt = require("jwt-simple");
const APIError = require("../utils/APIError");

/**
 * User Roles
 */
const roles = ["user", "admin", "superadmin"];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    username: {
      type: String,
      minlength: 2,
      maxlength: 128,
      lowercase: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    picture: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();

    const rounds = 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "username", "role", "createdAt", "isActive"];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const payload = {
      exp: moment().add(60, "minutes").unix(),
      iat: moment().unix(),
      sub: this._id,
    };

    return jwt.encode(payload, "bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4");
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

/**
 * Statics
 */
userSchema.statics = {
  roles,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: "User does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    const { username, password } = options;
    if (!username)
      throw new APIError({
        message: "An username is required to generate a token",
      });

    const user = await this.findOne({
      username,
    }).exec();
    const err = {
      status: httpStatus.BAD_REQUEST,
      isPublic: true,
    };
    if (user && !user.isActive) {
      err.message = "Tài khoản này đã bị khóa";
      err.status = httpStatus.BAD_REQUEST;
    } else if (password) {
      if (user && (await user.passwordMatches(password))) {
        return {
          user,
          accessToken: user.token(),
        };
      }
      err.message = "Incorrect username or password";
    } else {
      err.message = "Incorrect username or refreshToken";
    }
    throw new APIError(err);
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ page = 1, perPage = 30, username, role }) {
    const options = omitBy({ username, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateUsername(error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return new APIError({
        message: [
          {
            field: "username",
            location: "body",
            messages: ["'username' already exists"],
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
 * @typedef User
 */
module.exports = mongoose.model("User", userSchema);
