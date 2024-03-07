const bcrypt = require('bcrypt');
const User = require('../models/UsersModel')

const resetPassword = async (req, res) => {
    const { userId, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Failed to reset password:', error);
        res.status(500).json({ message: 'Failed to reset password' });
    }
};

module.exports = { resetPassword }