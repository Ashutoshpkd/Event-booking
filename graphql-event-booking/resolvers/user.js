const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    createUser: async args => {
        try {
          const existingUser = await User.findOne({ email: args.email });
          if (existingUser) {
            throw new Error('User exists already.');
          }
          const hashedPassword = await bcrypt.hash(args.password, 12);
    
          const user = new User({
            email: args.email,
            password: hashedPassword
          });
    
          const result = await user.save();
    
          return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            console.log(`[ERROR] - in creating User - ${err.message}`)
          throw err;
        }
    },
};