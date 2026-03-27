require("dotenv").config();
const sendEmail = require("./Utils/sendMail");

async function test() {
    console.log("Testing email with settings:");
    console.log("HOST:", process.env.EMAIL_HOST);
    console.log("PORT:", process.env.EMAIL_PORT);
    console.log("USER:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS ? "****" : "MISSING");

    try {
        await sendEmail({
            to: process.env.EMAIL_USER,
            subject: "Voltix Email Test",
            html: "<h1>Test Successful</h1><p>If you see this, your email configuration is correct.</p>"
        });
        console.log("SUCCESS: Email sent successfully!");
    } catch (error) {
        console.error("FAILURE: Could not send email.");
        console.error(error);
    }
}

test();
