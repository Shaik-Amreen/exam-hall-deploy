const db=require('../config/db.config')
const Event=db.Event

exports.create = (req, res) => {  
    // Save event  to MySQL database
  const eve={
        eventname:req.body.eventname,
        dateofevent:req.body.dateofevent,
        cheifguest:req.body.cheifguest,
        numofparticipants:req.body.numofparticipants,
        outcome:req.body.outcome,
        accounttype:req.body.accounttype,
        amount:req.body.amount,
        done:req.body.done
    }

Event.findOrCreate({
    where: { eventname:eve.eventname },
    defaults: {
        eventname:eve.eventname,
        dateofevent:eve.dateofevent,
        cheifguest:eve.cheifguest,
        numofparticipants:eve.numofparticipants,
        outcome:eve.outcome,
        accounttype:eve.accounttype,
        amount:eve.amount,
        done:eve.done
    }
  }).then(([user,reg])=>{
    
    res.send(reg)})
  .catch(err => {
    res.status(500).send("Error -> " + err);
  })
  };

  //fetch event by eventname
  exports.findevent=(req,res)=>{
    const eve={
      eventname:req.body.eventname
  }
    Event.findOne({ 
      where:{
       eventname:eve.eventname }
     })
    .then(nuser=>{
      res.send(nuser)
      
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    })
    
  }



  //fetching all events
  exports.findAll = (req, res) => {
    Event.findAll().then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    })
  }


 

  // Update a event
  exports.update = (req, res) => {
   const eve={
    eventname:req.body.eventname,
        dateofevent:req.body.dateofevent,
        cheifguest:req.body.cheifguest,
        numofparticipants:req.body.numofparticipants,
        outcome:req.body.outcome,
        accounttype:req.body.accounttype,
        amount:req.body.amount,
        done:req.body.done
    }
    Event.update({ 
      eventname:eve.eventname,
      dateofevent:eve.dateofevent,
      cheifguest:eve.cheifguest,
      numofparticipants:eve.numofparticipants,
      outcome:eve.outcome,
      accounttype:eve.accounttype,
      amount:eve.amount,
      done:eve.done
          }, 
          { 
            where: {
              eventname:eve.eventname
            } 
          })
          .then(() => {
              res.status(200).send(eve);
              console.log(eve)
             }).catch(err => {
              res.status(500).send("Error -> " + err);
             })
  };


   
  // Delete a eve by Id
  exports.delete = (req, res) => {
    const eventname = req.params.eventname;
    Event.delete({
          where: { eventname: eventname }
        }).then(() => {
          res.status(200).send('user has been deleted!');
        }).catch(err => {
          res.status(500).send("Fail to delete!");
        });
  };
