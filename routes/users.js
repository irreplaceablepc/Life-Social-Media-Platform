const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// Middleware to check authentication
const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    return res.redirect('/users/sign-in'); // User is not authenticated, redirect to the login page
  }
};

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);


// Assuming this is the route that renders the user's profile setup page
// router.get('/users/:userId/profileSetup', async (req, res) => {
//   const userId = req.params.userId;

//   // Fetch user details from the database using the userId
//   const user = await User.findById(userId);

//   // Render the profile setup page with the user's details
//   res.render('profileSetup', { user });
// });



// Routes with authentication middleware
router.get('/profile/:id', authenticateUser, usersController.profile);
router.post('/update/:id', authenticateUser, usersController.update);

router.post('/create', usersController.create);

// Use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',  // Our strategy
  { failureRedirect: '/users/sign-in' }
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

// Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), usersController.createSession);










router.post('/pimgs/:id', authenticateUser, usersController.pimgs);






module.exports = router;
