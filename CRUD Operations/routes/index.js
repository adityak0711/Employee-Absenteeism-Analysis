var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    var db = req.db;
    var collection = db.get('Employee');
    var info = collection.find({},{},function(e,docs){
    
    });

  res.render('helloworld', { "title": info });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('Employee');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

  /* GET New User page. */
router.get('/newuser', function(req, res) {
  var db = req.db;
  var collection = db.get('Employee');
  collection.find({},{},function(e,docs){
      res.render('newuser', {
          "userlist" : docs
      });
  });
  //res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;
  

  // Get our form values. These rely on the "name" attributes
  //var name = req.body.name1;
  //var email = req.body.email1;

  var sno = parseInt(req.body.sno);
  var empid = parseInt(req.body.empId);
  var reason = parseInt(req.body.reason);
  var month = parseInt(req.body.month);
  var day = parseInt(req.body.day);
  var age = parseInt(req.body.age);
  var children = parseInt(req.body.children);
  var hours = parseInt(req.body.hours);

  //var result = 746;
  console.log(req.body.sno);
  console.log(req.body.children);
  // Set our collection
  var collection = db.get('Employee');

  // Submit to the DB
  collection.insert({
      _id : sno,
      "empId" : empid,
      "reason" : reason,
      "month" : month,
      "day" : day,
      "age" : age,
      "children" : children,
      "hours" : hours
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("/userlist");
      }
  });

});

router.get('/delete', function(req, res) {
  var db = req.db;
  var collection = db.get('Employee');
  collection.find({_id:0},{},function(e,docs){
      res.render('delete', {
          "userlist" : docs
      });
  });
  //res.render('delete', { title: 'Delete a User' });
});

router.post('/queryuser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var sno = parseInt(req.body.sno);
  

  // Set our collection
  var collection = db.get('Employee');
  console.log(sno);
  // Submit to the DB
  collection.find({
      "_id": sno
  },
  {},
  function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem updating the information into the database.");
      }
      else {
          // And forward to success page
          res.render("delete", { "userlist": doc });
      }
  });

});

router.post('/deleteuser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var sno = parseInt(req.body.sno);
  

  // Set our collection
  var collection = db.get('Employee');

  // Submit to the DB
  collection.remove({
      _id : sno
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem deleting the information from the database.");
      }
      else {
          // And forward to success page
          res.redirect("/userlist");
      }
  });

});

router.get('/update', function(req, res) {
  var db = req.db;
  var collection = db.get('Employee');
  collection.find({_id:0},{},function(e,docs){
      res.render('update', {
          "userlist" : docs,
          noData : ""
      });
  });
  //res.render('update', { title: 'Update database' });
});

router.post('/getuser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var sno = parseInt(req.body.sno);
  

  // Set our collection
  var collection = db.get('Employee');
  console.log(sno);
  // Submit to the DB
  collection.find({
      "_id": sno
  },
  {},
  function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem updating the information into the database.");
      }
      else {
          // And forward to success page
          res.render("update", { "userlist": doc , noData: "No records to display"});
      }
  });

});

router.post('/updateuser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var sno = parseInt(req.body.sno);
  var empId = parseInt(req.body.empId);
  var reason = parseInt(req.body.reason);
  var month = parseInt(req.body.month);
  var day = parseInt(req.body.day);
  var age = parseInt(req.body.age);
  var children = parseInt(req.body.children);
  var hours = parseInt(req.body.hours);
  

  // Set our collection
  var collection = db.get('Employee');

  // Submit to the DB
  collection.update({
      "_id": sno
  },
  {
    $set: {"empId":empId, "reason":reason, "month":month, "day":day, "age":age, "children":children, "hours":hours}
  },
  function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem updating the information into the database.");
      }
      else {
          // And forward to success page
          res.redirect("/userlist");
      }
  });

});

module.exports = router;
