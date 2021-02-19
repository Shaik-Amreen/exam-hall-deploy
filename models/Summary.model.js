const {DataTypes}=require('sequelize')
module.exports = (sequelize, Sequelize) => {
    const Summary = sequelize.define('Summary', {
        eventname: { type: Sequelize.TEXT },
        dateofevent: {type: Sequelize.TEXT },
        accounttype: {type: Sequelize.TEXT },
        tamount: {type:DataTypes.INTEGER},
        dateofbill: {type: Sequelize.TEXT },
    },{
      timestamps: false
    },
    {freezeTableName: true
});
    
    return Summary;
  }