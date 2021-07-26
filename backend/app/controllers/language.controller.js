const Language = require('../models/language.model.js');

// Create and Save a new Language
exports.create = (req, res) => {
  // Validate request
 

// // Create a Language
const language = new Language({
    language: req.body.language
    
});

// Save Language in the database
language.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Language."
    });
});
// console.log(req.body.language)

};

// Retrieve and return all Languages from the database.
exports.findAll = (req, res) => {
    Language.find()
    .then(Languages => {
        res.send(Languages);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Languages."
        });
    });
};

// Find a single Language with a LanguageId
exports.findOne = (req, res) => {

};

// Update a Language identified by the LanguageId in the request
exports.update = (req, res) => {

};

// Delete a Language with the specified noteId in the request
exports.delete = (req, res) => {

};