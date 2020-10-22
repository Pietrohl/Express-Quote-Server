const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
require("dotenv/config");

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.use(morgan('dev'));

const quotesRouter = require('./quotes.js');
app.use('/api/quotes/', quotesRouter);


//New mongoDB connection method
mongoose.connect(
    process.env.DB_CONNECTION_STRING, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
});

app.listen(PORT, ()=>console.log(`Now listening to port ${PORT}`));
