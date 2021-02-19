const db=require('../config/db.config')
const Admin=db.Admin
const { Op } = require('sequelize');
//creae a user post a user
exports.create = (req, res) => {  
    const user={
        email:req.body.email,
        pw:req.body.pw,
      }
Admin.findOrCreate({
    where: {email: user.email },
    defaults: {
      email:user.email,
      pw:user.pw,
    }
  }).then(([user,reg])=>{
    res.send(reg)}
  
  
  )
  .catch(err => {
    res.status(500).send("Error -> " + err);
  })
  };


  

exports.login=(req,res)=>{
    const user={
      email:req.body.email,
      pw:req.body.pw,
  }
  Admin.findOne({ 
      where:{
      [Op.and]:[{ email:user.email },{pw:user.pw}]
    } })
    .then(nuser=>{
      res.send(nuser)
    })
    .catch(err => {
      res.status(500).send("Error -> " + err);
    })
    
  }




 
  // Update a User pw
  exports.update = (req, res) => {
    var user = req.body;
    Admin.update({ 
            email: req.body.email,
            author: req.body.pw,
        }, 
          { 
            where: {
              name: req.params.name
            } 
          })
          .then(() => {
              res.status(200).send(user);
             }).catch(err => {
              res.status(500).send("Error -> " + err);
             })
  };
   
  