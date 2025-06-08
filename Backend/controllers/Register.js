const { handleError } = require('../helpers/handleError');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { sendMailToAuthor } = require('../helpers/email'); // You can rename or separate this if needed

// Sign-Up Controller
exports.Register = async (req, res, next) => {
    try {
        
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(handleError(400, 'Please fill all the fields.'));
        }

        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return next(handleError(409, 'User Already Registered'));
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashpassword });

        res.status(200).json({
            success: true,
            message: 'Registration Successfull',
            newUser,
        });

        const subject = `👋 Welcome to BlogBrew, ${name}!`;
        const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <div style="background-color: #3A59D1; color: white; padding: 16px 24px;">
            <h2 style="margin: 0;">🎉 Welcome to BlogBrew</h2>
            </div>

            <div style="padding: 20px;">
            <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 15px;">
                We're thrilled to have you on board! BlogBrew is your space to share ideas, stories, and opinions.
            </p>
            <p>✨ Start your journey by publishing your first blog post!</p>

            <div style="margin: 30px 0;">
                <a href="https://blogbrew.vercel.app/" style="background-color: #3A59D1; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px;">📝 Explore BlogBrew</a>
            </div>

            <hr style="border-top: 1px solid #ddd;" />
            <p style="font-size: 13px; color: #888;">If you didn’t sign up for BlogBrew, you can ignore this email.</p>
            </div>
        </div>
        `;
        const text = `Welcome to BlogBrew, ${name}! Start publishing your stories today.`;

        await sendMailToAuthor({ to: email, subject, html, text });

    } catch (error) {
        return next(handleError(500, error.message));
    }
};
