const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up body-parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Set up Twilio client with your Account SID and Auth Token
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);



// User registration endpoint
app.post('/register', async (req, res) => {
    const { email, phone } = req.body;

    // Check if email and phone number are provided
    if (!email || !phone) {
        return res.status(400).json({ error: 'Email and phone number are required' });
    }

    // Add the user to the database (in this case, our in-memory array)
    const newUser = { email, phone };

    // Send confirmation email to the user using SendGrid
    try {
        await sgMail.send({
            to: email,
            from: 'projecttime@yopmail.com', // Your email address
            subject: 'Registration Confirmation',
            text: `Dear user, you have successfully registered with email: ${email} and phone number: ${phone}.`
        });
        console.log('Confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }

    // Send WhatsApp message to the user using Twilio Sandbox
    try {
        await client.messages.create({
            from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER, // Your Twilio WhatsApp number
            to: 'whatsapp:' + phone, // Use the user's phone number
            body: `Dear user, you have successfully registered with email: ${email} and phone number: ${phone}.`
        });
        console.log('WhatsApp message sent successfully');
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }

    return res.status(201).json(newUser);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
