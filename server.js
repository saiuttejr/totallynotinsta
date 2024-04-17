const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('/Users/saiut/Desktop/Haccnt/emailalert/email-alert-fa273-firebase-adminsdk-l0w3x-85994a44d4.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



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

app.post('/subscribe', async (req, res) => {
    const { email, preferences } = req.body;

    try {
        // Add a new document to the 'subscriptions' collection
        await admin.firestore().collection('subscriptions').doc(email).set({ preferences });

        // Respond with success message
        res.status(201).json({ message: 'Subscription successful' });
    } catch (error) {
        // Handle errors
        console.error('Error subscribing user:', error);
        res.status(500).json({ error: 'Failed to subscribe user' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
