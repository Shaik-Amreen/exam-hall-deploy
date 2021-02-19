const env =require('./env')
const {Sequelize}=require('sequelize')

const sequelize= new Sequelize(env.database,env.username,env.password,
    {
        host:env.host,
        dialect: env.dialect,
        operatorsAliases: false,
       
        pool: {
          max: env.max,
          min: env.pool.min,
          acquire: env.pool.acquire,
          idle: env.pool.idle
        }
    });
    const db={}
    db.Sequelize=Sequelize
    db.sequelize=sequelize
     
    //loading models
    db.Admin=require('../models/Admin.model')(sequelize,Sequelize)
    db.Event=require('../models/Event.model')(sequelize,Sequelize)
    db.Eventbudjet=require('../models/Eventbudjet.model')(sequelize,Sequelize)
    db.Summary=require('../models/Summary.model')(sequelize,Sequelize)
    //checking for db connection
    try {
         sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }



      
      module.exports=db