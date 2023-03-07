const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ducats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('account', AccountSchema);