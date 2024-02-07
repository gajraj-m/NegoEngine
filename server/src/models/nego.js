const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const negoSchema = new mongoose.Schema(
  {
    buyer_id: {
      type: String,
      required: true,
      trim: true
    },
    seller_id: {
      type: String,
      required: true,
      trim: true,
    },
    payment_collector: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(value.toLowerCase()!=="buyer" && value.toLowerCase()!=="seller") {
                throw new Error('Invalid payment collector type')
            }
        }
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
        trim: true,
        //apply a validator logic  
    },
    commission: {
        type: Number,
        required: true
    },
    return_window: {
        type: Number,
        required: true
    },
    cancel_window: {
        type: Number,
        required: true
    },
  },
  { timestamps: true }
);

const Nego = mongoose.model("Nego", negoSchema);

module.exports = Nego;