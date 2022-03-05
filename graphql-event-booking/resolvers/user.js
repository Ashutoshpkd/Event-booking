const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    login: async args => {
        try {
            const user = await User.findOne({email: args.email});
            if(!user) {
                throw new Error('User does not exist!');
            }
            const isEqual = await bcrypt.compare(args.password, user._doc.password);
            if(!isEqual) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign(
                { email: args.email, userId: user.id },
                'CaptainLevi@123',
                { expiresIn: '1h' });
            return {
                userId: user.id,
                email: user._doc.email,
                token,
                expiresIn: parseFloat('1') * 60 * 60,
            }
        } catch (error) {
            console.log(`[ERROR] - Login failed due to - ${error.message}`);
            throw error;
        }
    }
};