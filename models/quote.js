const mongoose = require('mongoose');

const Quote_schema = new mongoose.Schema({
    quote: String,
    person: String

})

module.exports = mongoose.model('Quote',Quote_schema);