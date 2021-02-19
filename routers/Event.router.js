module.exports = function(app) {
 
    const event = require('../controllers/Eventcontroller');
 
    // Create a new event
    app.post('/createevent', event.create);
  
    // Retrieve all event
    app.get('/event', event.findAll);
 
    // Retrieve a single event by eventname
    app.get('/event/:eventname', event.findevent);
   
    // Update a user with eventname
    app.post('/event/:eventname', event.update);
 
    // Delete a user with eventname
    app.delete('/event/:eventname', event.delete);
}