const mongoose = require("mongoose");

const negoSchema = new mongoose.Schema(
  {
    nego_id: {
      type: String, // buyer + seller_id
    },
    buyer_id: {
      type: String,
      required: true,
      trim: true,
    },
    seller_id: {
      type: String,
      required: true,
      trim: true,
    },
    negos: [
      {
        sender_id: {
          type: String,
          required: true,
        },
        receiver_id: {
          type: String,
          required: true,
        },
        payment_collector: {
          type: String,
          required: true,
        },
        declared_price: {
          type: Number,
          required: true,
        },
        withholding_amount: {
          type: Number,
          required: true,
        },
        settlement_window: {
          type: Number,
          required: true,
        },
        settlement_basis: {
          type: String,
          required: true,
        },
        commission: {
          type: Number,
          required: true,
        },
        return_window: {
          type: Number,
          required: true,
        },
        cancel_window: {
          type: Number,
          required: true,
        },
      },
    ],
    curr_similarity: {
      type: Number, 
      required: true,
    },
  },
  { timestamps: true }
);

const Nego = mongoose.model("Nego", negoSchema);

module.exports = Nego;
