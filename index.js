var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
 
const db = require('./config/db.config');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
});
require('./routers/Admin.router')(app);
require('./routers/Eventbudjet.router')(app);
require('./routers/Event.router')(app);
require('./routers/Summary.router')(app);
// Create a Server
const PORT=process.env.PORT||4000
var server = app.listen(PORT, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})