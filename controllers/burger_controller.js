var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {

  // SOLUTION:
  // =========
  // use the Cat model to find all cats,
  // and use the include option to grab info from the User model.
  // This will let us show the cat and it's owner.
  models.Cat.findAll({
    include: [ models.User ]
  })
  // connect the findAll to this .then
  .then(function(cats) {
    // grab the user info from our req.
    // How is it in our req?
    // This info gets saved to req via the users_controller.js file.
    res.render('cats/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      cats: cats
    });
  });
});

router.post('/create', function (req, res) {
  // SOLUTION:
  // =========
  // use the Burger model to create a cat based on what's
  // passed in req.body (name, sleepy, user_id)
  models.Burger.create({
    burger_name: req.body.burger_name,
    devouted: req.body.devouted,
    
  })
  // connect the .create to this .then
  .then(function() {
    res.redirect('/');
  });
});

router.put('/update/:id', function(req,res) {
  // SOLUTION:
  // =========
  // use the Burger model to update a burger's sleepy status
  // based on the boolean passed in req.body sleepy
  // and the id of the burger (as passed in the url)
  models.Burger.update(
  {
    devouted: req.body.devouted
  },
  {
    where: { id : req.params.id }
  })
  // connect it to this .then.
  .then(function (result) {
    res.redirect('/');
  }, function(rejectedPromiseError){

  });
});


router.delete('/delete/:id', function(req,res) {
  // SOLUTION:
  // =========
  // use the Burger model to delete a cat
  // based on the id passed in the url
  models.Burger.destroy({
    where: {
      id: req.params.id
    }
  })
  // connect it to this .then.
  .then(function() {
    res.redirect('/');
  });

});


module.exports = router;
