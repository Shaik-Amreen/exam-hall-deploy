module.exports = function(app) {
  
    const event = require('../controllers/Summarycontroller');
     
    // Create a new event
    app.post('/createsummary', event.create);
  
    // Retrieve all event
    app.get('/summary', event.findAll);
 
    // Retrieve a single event by eventname
    app.post('/summary/:eventname', event.update);
   

}