const db=require('../config/db.config')
const Eventbudjet=db.Eventbudjet

exports.create = (req, res) => {  
    // Save event  to MySQL database
    console.log(req.body,new Date())
    Eventbudjet.bulkCreate(req.body) 
    .then((result) => {
      console.log(result,"////////////////////");
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    })
  };


  exports.createone= (req, res) => {  
    // Save event  to MySQL database
    let i;console.log(req.body)
    for(i=0;i<req.body.length;i++){
  Eventbudjet.findOrCreate({
    where: { eventname:req.body[i].eventname+new Date()},
    defaults: {
      eventname:req.body[i].eventname,
      nameofparticular:req.body[i].nameofparticular,
      amount:req.body[i].amount,
    }
  }).then(([user,reg])=>{
    res.send(reg)})
  .catch(err => {
    res.status(500).send("Error -> " + err);
  })}
  };

//fetch event by eventname
  exports.findeventb=(req,res)=>{
    const eve={
      eventname:req.body.eventname
  }
    Eventbudjet.findOne({ 
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
    Eventbudjet.findAll().then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    })
  }


 

  // Update a event
  exports.update = (req, res) => {
   const eve={
    eventname:req.body.eventname,
    nameofparticular:req.body.nameofparticular,
    amount:req.body.amount,
    }
    Eventbudjet.update({ 
        eventname:eve.eventname,
        nameofparticular:eve.nameofparticular,
        amount:eve.amount,
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
    Eventbudjet.delete({
          where: { eventname: eventname }
        }).then(() => {
          res.status(200).send('user has been deleted!');
        }).catch(err => {
          res.status(500).send("Fail to delete!");
        });
  };



  