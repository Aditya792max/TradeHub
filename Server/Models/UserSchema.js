const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
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

// Hashing the password here
userSchema.pre('save',async function() {
    if(!this.isModified('password')) return;
    
    this.password = await bcypt.hash(
        this.password,
        SALT_ROUNDS
    );
});

// Comparing the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.passowrd);
} 



const User = mongoose.model('User', userSchema);


module.exports = User;