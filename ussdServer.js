const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 8080;

// Middleware to enable CORS
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

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
      // In a real application, you would integrate with Lipa Na M-Pesa API here
      responseText = `Payment of ${amount} KES successful. Thank you!`;
    }
  } else {
    responseText = 'Invalid input. Press 1 to make a payment.';
  }

  res.send(`<response><msg>${responseText}</msg></response>`);
});

app.listen(port, () => {
  console.log(`USSD server is running at http://localhost:${port}`);
});
