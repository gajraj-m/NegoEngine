const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const validator = require('validator')
const bcrypt = require('bcryptjs')

const sellerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if(!validator.isEmail(value)) {
            throw new Error('Invalid email')
        }
      }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('The password must not contain the word password')
            }
        }
    },
    rating: {
        type: Number,
        required: true
    },
    numberOfSales: {
        type: Number,
        required: true
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
  },
  { timestamps: true }
);

sellerSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

sellerSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.profilePicture

    return userObject
}

sellerSchema.statics.findByCredentials = async (email, password) => {
    const user = await Seller.findOne({ email })
    if(!user) {
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login!')
    }

    return user
}

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;