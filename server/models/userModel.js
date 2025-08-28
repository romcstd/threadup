const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    // store hashed refresh token for rotation/invalidation
    refreshTokenHash: { type: String, default: null },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)