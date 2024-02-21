const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 8080;

// Middleware to enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for Lipa Na M-Pesa
app.post('/lipanampesa', (req, res) => {
    const { amount, phoneNumber, callbackUrl } = req.body;

    // Validate the request parameters
    if (!amount || isNaN(amount) || amount <= 0 || !phoneNumber || !callbackUrl) {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }

    // Process the payment (replace this with actual payment processing logic)
    const transactionId = generateTransactionId();
    const phone = phoneNumber;

    // Simulate a successful response
    const response = {
        merchantId: 'your_merchant_id',
        transactionId: transactionId,
        phoneNumber:phone,
        status: 'success',
        message: 'Payment successful',
    };
    

    res.json(response);
});

// Generate a random transaction ID for testing
function generateTransactionId() {
    return Math.floor(Math.random() * 1000000000).toString();
}

// USSD endpoint
app.post('/ussd', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let responseText = '';

    if (text === '') {
        // Initial menu
        responseText = 'Welcome to Lipa Na M-Pesa USSD Demo. Press 1 to make a payment.';
    } else if (text === '1') {
        // Process payment
        responseText = 'Enter the amount:';
    } else if (/^\d+$/.test(text)) {
        // Handle amount input
        const amount = parseFloat(text);
        if (isNaN(amount) || amount <= 0) {
            responseText = 'Invalid amount. Please enter a valid amount:';
        } else {
            funcion (lipaNaMpesa);// This connects  to the Lipa Na M-Pesa API
            responseText = `Payment of ${amount} KES successful. Thank you!`;
        }
    } else {
        responseText = 'Invalid input. Press 1 to make a payment.';
    }

    res.send(`<response><msg>${responseText}</msg></response>`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
