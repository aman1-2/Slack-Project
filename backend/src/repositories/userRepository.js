import crudRepository from './crudRepository.js';
import User from '../schema/user.js';

const userRepository = {
    ...crudRepository(User),

    signUpUser: async function(data) {
        const newUser = new User(data); 
        await newUser.save();
        
        return newUser;
    },

    getUserByEmail: async function (email) {
        const user = await User.findOne({ email });
        return user;
    },

    getUserByName: async function (name) {
        const user = await User.findOne({ username: name }).select('-password'); // Exclude password
        return user;
    },

    getByToken: async function (token) {
        const user = await User.findOne({ verificationToken: token });
        return user;
    }
}

export default userRepository;