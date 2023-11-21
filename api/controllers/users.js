const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'});
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },

FindSingleUserById: (req, res) => {
  const userId = req.user_id; 
  User.findById(userId).select('displayName').exec((err, user) => {
    if (err) {
      // Handle error
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!user) {
      // Handle case where user is not found
      res.status(404).json({ error: 'User not found' });
    } else {
      // User found, send back the displayName
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ displayName: user.displayName });
    }
  });
},
};
module.exports = UsersController;
