document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 768) {
        var footerLinks = document.querySelector('footer').getElementsByTagName('a');
        for (var i = 0; i < footerLinks.length; i++) {
            footerLinks[i].addEventListener('click', function (event) {
                var href = this.getAttribute('href');

                // Check if the link has the class 'open-in-same-tab'
                if (this.classList.contains('open-in-same-tab')) {
                    event.preventDefault(); // Prevent the default immediate link opening
                    setTimeout(function () {
                        window.location.href = href; // Open the link in the same tab after 1 second
                    }, 500);
                } else {
                    event.preventDefault(); // Prevent the default immediate link opening
                    setTimeout(function () {
                        window.open(href, '_blank'); // Open other links in a new tab after 1 second
                    }, 500);
                }
            });
        }
    }
});
