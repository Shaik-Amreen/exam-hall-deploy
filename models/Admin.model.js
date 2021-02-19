
module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('Admin', {
      email: {
      type: Sequelize.TEXT
      
        },
      pw: {
        type: Sequelize.TEXT
        }
    },{
      timestamps: false
    },
    
);
    
    return Admin;
  }