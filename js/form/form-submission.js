var form = document.getElementById('form');
form.addEventListener('submit', function (event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Check if the form is valid
    if (this.checkValidity()) {
        var thankYouBlock = document.getElementById('ThankYouBlock');
        form.style.transform = 'translate(-50%, -50%) scale(0)';
        thankYouBlock.style.transform = 'translate(-50%, -50%) scale(1)';

        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;

        var phoneNumber = document.getElementById('phoneNumber').value;
        if (phoneNumber.startsWith('0')) {
            phoneNumber = phoneNumber.replace('0', '+972');
        }
        if (phoneNumber.startsWith('972')) {
            phoneNumber = '+' + phoneNumber;
        }
        phoneNumber = phoneNumber.replace(/-/g, '');

        var finalMessageInUrlEncoding = encodeURIComponent('*A new contact request just arrived from the website*\n\nFirst Name: ' + firstName + '\nLast Name: ' + lastName + '\nEmail: ' + email + '\nPhone Number: ' + phoneNumber + '\nMessage: ' + message);

        const Http = new XMLHttpRequest();
        // please do not steel the following api key! ♥️
        const url = 'https://api.callmebot.com/whatsapp.php?phone=972548111733&text=' + finalMessageInUrlEncoding + '&apikey=4581714';
        Http.open("GET", url);
        Http.send();
    }
});