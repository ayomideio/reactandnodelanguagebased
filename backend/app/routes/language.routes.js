module.exports = (app) => {
    const languages = require('../controllers/language.controller.js');

    // Create a new Note
    app.post('/languages', languages.create);

    // Retrieve all languages
    app.get('/languages', languages.findAll);

   
}
