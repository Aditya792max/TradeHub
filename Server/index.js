const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');

const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });