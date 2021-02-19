module.exports = function(app) {
 
    const eventbudjet = require('../controllers/Eventbudjetcontroller');
 
    // Create a new event
    app.post('/createeventbudjet', eventbudjet.createone);
  
    // Retrieve all eventbudjet
    app.get('/eventbudjet', eventbudjet.findAll);
 
    // Retrieve a single event by eventname
    app.get('/eventbudjet/:eventname', eventbudjet.findeventb);
   
    // Update a user with eventname
    app.post('/eventbudjet/:eventname', eventbudjet.createone);
 
    // Delete a user with eventname
    app.delete('/eventbudjet/:eventname', eventbudjet.delete);
}