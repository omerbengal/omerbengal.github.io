let form = document.getElementById('form');
form.addEventListener('submit', function (event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Check if the form is valid
    if (this.checkValidity()) {
        let thankYouBlock = document.getElementById('ThankYouBlock');
        form.style.transform = 'translate(-50%, -50%) scale(0)';
        thankYouBlock.style.transform = 'translate(-50%, -50%) scale(1)';

        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let email = document.getElementById('email').value;
        let message = document.getElementById('message').value;

        let phoneNumber = document.getElementById('phoneNumber').value;
        if (phoneNumber.startsWith('0')) {
            phoneNumber = phoneNumber.replace('0', '+972');
        }
        if (phoneNumber.startsWith('972')) {
            phoneNumber = '+' + phoneNumber;
        }
        phoneNumber = phoneNumber.replace(/-/g, '');

        let finalMessageInUrlEncoding = encodeURIComponent('*A new contact request just arrived from the website*\n\nFirst Name: ' + firstName + '\nLast Name: ' + lastName + '\nEmail: ' + email + '\nPhone Number: ' + phoneNumber + '\nMessage: ' + message);

        const Http = new XMLHttpRequest();
        // please do not steel the following api key! ♥️
        const url = 'https://api.callmebot.com/whatsapp.php?phone=972548111733&text=' + finalMessageInUrlEncoding + '&apikey=4581714';
        Http.open("GET", url);
        Http.send();
    }
});