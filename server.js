const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Endpoint to handle Lipa Na M-Pesa API requests
app.post('/lipanampesa', (req, res) => {
  // Validate API key (replace with your actual API key validation logic)
  const apiKey = req.headers.authorization.replace('Bearer ', '');
  if (apiKey !== 'your_api_key') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Mock response for demonstration purposes
  const response = {
    merchantId: 'your_merchant_id',
    transactionId: '123456789',
    status: 'success',
    message: 'Payment successful',
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
