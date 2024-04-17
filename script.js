document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the values of email and phone number inputs
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Here, you'll send these values to the server to handle registration (we'll implement this later)
});
