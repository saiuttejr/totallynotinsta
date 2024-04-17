const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up body-parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Array to store registered users (in-memory database)
const users = [];

// User registration endpoint
app.post('/register', async (req, res) => {
    const { email, phone } = req.body;

    // Check if email and phone number are provided
    if (!email || !phone) {
        return res.status(400).json({ error: 'Email and phone number are required' });
    }

    // Add the user to the database (in this case, our in-memory array)
    const newUser = { email, phone };
    users.push(newUser);

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

    return res.status(201).json(newUser);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
