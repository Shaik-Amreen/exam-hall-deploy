const db=require('../config/db.config')
const Summary=db.Summary

exports.create = (req, res) => {  
    // Save event  to MySQL database
  const eve={
        eventname:req.body.eventname,
        dateofevent:req.body.dateofevent,
        accounttype:req.body.accounttype,
        tamount:req.body.tamount,
        dateofbill:req.body.dateofbill,
        
    }

Summary.findOrCreate({
    where: { eventname:eve.eventname },
    defaults: {
        eventname:eve.eventname,
        dateofevent:eve.dateofevent,
        accounttype:eve.accounttype,
        tamount:eve.tamount,
        dateofbill:eve.dateofbill,
    }
  }).then(([user,reg])=>{
    
    res.send(reg)})
  .catch(err => {
    res.status(500).send("Error -> " + err);
  })
  };

 //fetching all events
  exports.findAll = (req, res) => {
    Summary.findAll().then(users => {
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
    accounttype:req.body.accounttype,
    tamount:req.body.tamount,
    dateofbill:req.body.dateofbill,
    
    }
  Summary.update({ 
    eventname:eve.eventname,
    dateofevent:eve.dateofevent,
    accounttype:eve.accounttype,
    tamount:eve.tamount,
    dateofbill:eve.dateofbill,
    
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


