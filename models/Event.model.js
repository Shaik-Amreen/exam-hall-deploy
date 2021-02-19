const {DataTypes}=require('sequelize')
module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define('Event', {
        eventname: { type: Sequelize.TEXT },
        dateofevent: {type: Sequelize.TEXT },
        cheifguest: {type: Sequelize.TEXT },
        numofparticipants: {type: Sequelize.TEXT },
        outcome: {type: Sequelize.TEXT },
        accounttype: {type: Sequelize.TEXT },
        amount: {type:DataTypes.INTEGER},
        done:{type: Sequelize.STRING },
    },{
      timestamps: false
    },
    {freezeTableName: true
});
    
    return Event;
  }