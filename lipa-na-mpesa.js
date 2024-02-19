function lipaNaMpesa() {
    const apiKey = 'your_api_key';
    const merchantId = 'your_merchant_id';
    const lipaNaMpesaUrl = 'http://localhost:3000/lipanampesa'; // Replace with your actual server URL

  
    // Get the amount from the user input
    const amountInput = document.getElementById('amountInput');
    const amount = parseFloat(amountInput.value);
  
    // Validate the amount
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
  
    const payload = {
      amount: amount,
      phoneNumber: '07XXXXXXXX',
      callbackUrl: 'https://your-callback-url.com'
    };
  
    // Disable the button during the API request to prevent multiple clicks
    const button = document.getElementById('lipaNaMpesaBtn');
    button.disabled = true;
  
    fetch(lipaNaMpesaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response:', data);
      alert('Payment initiated. Check console for details.');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error occurred. Check console for details.');
    })
    .finally(() => {
      // Enable the button after the API request is complete
      button.disabled = false;
    });
  }
  