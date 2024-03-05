function lipaNaMpesa() {
    const apiKey = 'your_api_key';
    const merchantId = '1E3FFGB78';
    const lipaNaMpesaUrl = 'http://localhost:8080/lipanampesa'; // Replace with your actual server URL
    const phone='0702524433';

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
        phoneNumber: phone, // Replace with the actual phone number or adjust the input method
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
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Response:', data);
        alert('Payment initiated. Check console for details.');
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert('Error occurred. Check console for details.');
    })
    .finally(() => {
        // Enable the button after the API request is complete
        button.disabled = false;
    });
}
