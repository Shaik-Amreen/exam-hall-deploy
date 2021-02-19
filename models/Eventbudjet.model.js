const {DataTypes}=require('sequelize')
module.exports = (sequelize, Sequelize) => {
    const Eventbudjet = sequelize.define('Eventbudjet', {
        eventname: { type: Sequelize.TEXT },
        nameofparticular: {type: Sequelize.TEXT },
        amount: {type:DataTypes.INTEGER}
    },{
      timestamps: false
    },
    {freezeTableName: true
});
    
    return Eventbudjet;
  }