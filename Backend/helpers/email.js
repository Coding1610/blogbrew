const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendMailToAuthor = async ({ to, subject, html, text }) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"BlogBrew Notifications" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html
    });

};
