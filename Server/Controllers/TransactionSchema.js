const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        type: {
            type: String,
            enum: ['BUY', 'SELL'],
            required: true
        },

        symbol: {
            type: String,
            required: true,
            uppercase: true
        },

        name: String,

        quantity: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        total: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);