module.exports = function(app) {
 
    const admin = require('../controllers/Admincontroller');
    console.log('router')
      // Create a new user
    app.post('/createadmin', admin.create);
  //Login user
   app.post('/login',admin.login)
   
    // Update a user with Id
    app.put('/admin/:name', admin.update);
   
}