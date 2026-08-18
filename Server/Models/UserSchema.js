// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const SALT_ROUNDS = pareseInt(process.env.SALT_ROUNDS);

// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     },
    
// })

const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
            uppercase: true,
            trim: true
        },

        name: {
            type: String,
            default: ''
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        averagePrice: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        _id: false
    }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        cashBalance: {
            type: Number,
            default: 100000
        },

        holdings: {
            type: [holdingSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);