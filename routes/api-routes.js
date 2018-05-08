var db = require("../models");
var moment = require("moment");

module.exports = function(app) {
  
  app.get("/api/users", function(req, res) {   
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {    
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbLogin) {
      console.log(dbLogin);
      res.json(dbLogin);
    });
  });
  
  app.post("/api/users", function(req, res) {    
    console.log(req.body);
    db.User.create({
      name: req.body.name,      
      email: req.body.email,
      password: req.body.password,
      team: req.body.team,
      program: req.body.program,
      progress: req.body.progress
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });  

  app.put("/api/users", function(req, res) {
    db.User.update({
      progress: req.body.progress,
      }, {
        where: {
          id: req.body.id
        }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  if(moment().startOf('week') == moment()) {
    db.User.findAll({}).then(function(dbUser) {
      for (var i = 0; i < dbUser.length; i++) {
        dbUser[i].update({
          progress: 0.00
          }, {
          where: {
            id: dbUser[i].id
          }
        }).then()
      }
    });
  }

};
