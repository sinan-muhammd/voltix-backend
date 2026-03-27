const nodemailer = require("nodemailer");

let transporter = null;

const sendEmail = async ({ to, subject, html }) => {
    // Lazy initialize to ensure process.env is fully loaded, and cache it to reuse the connection pool
    if (!transporter) {
        transporter = nodemailer.createTransport({
            pool: true, // Use pooled connections for speed
            maxConnections: 5,
            maxMessages: 100,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    await transporter.sendMail({
        from: `"Voltix Support" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    });
};

module.exports = sendEmail;


