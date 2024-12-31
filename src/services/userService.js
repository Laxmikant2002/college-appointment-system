const bcrypt = require('bcrypt');
const User = require('../models/userModel');

class UserService {
    async registerUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({ ...userData, password: hashedPassword });
        await user.save();
        return user;
    }

    async authenticateUser(credentials) {
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        throw new Error('Invalid credentials');
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }

    async updateUser(userId, updateData) {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserService();