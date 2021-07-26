const mongoose = require('mongoose');

const LanguageSchema = mongoose.Schema({
    language:[]
}, {
    timestamps: true
});

module.exports = mongoose.model('Language', LanguageSchema);