# Advanced Programming course - HW6 - Q&A - Omer Bengal

# Q1: Write the five filenames in your README.md.

- `cv.css`
- `index.html`
- `logic.js`
- `nav.css`
- `no-transition-on-resize.js`

---

# Q2: What is jQuery used for?

jQuery is a Library which makes client-side programming in Javascript easier.\
With jQuery the programmer can easily modify DOM elements, add built-in effects and animations, and even performing asynchronous HTTP requests (AJAX) in an efficient way, where all of these are being supported by different web browsers (which helps the programmer to worry less about browser compatibility).

---

# Q3: Describe the functionality of your JavaScript code.

I have multiple javascript files that I use across my website:
1. `js/no-transition-on-resize.js` - Its purpose is to prevent any animation during screen resize. This file was written by Ohad Fried.
    
2. `js/about-me/typing.js` - Its purpose is to handle the functionality of the "self re-writing" sentence: "Coding is ______".\
    The key aspects here are:
    - usage of querySelector to get the elements I need to modify in the html about-me page.
    - List of words.
    - List of delay intervals for different cases.
    - "sleep" function which can get a millisecond as an input and sleep throughout this time.
    - The main async function "type" that types out a given word.
        - It first adds the 'typing' class to the cursor, Then it types out the word one character at a time, with a delay from the delay list after each character.
        - After the word is typed out, it removes the 'typing' class from the cursor and waits for a constant time (which also being initiated in the delay list) before starting to erase the word one character at a time.
    - Async "loop" function that uses the "type" function to type out all the words in the words array via a loop.
        - It uses the modulus operator to cycle back to the start of the list when it reaches to the end.
        - After typing out a word, it waits for a while (which also being initiated in the delay list) before starting to type out the next word.
    - Adding event listener to the "DOMContentLoaded", which is done for the loop to start when the initial HTML document has been completely loaded and parsed. I also add a small 1 second delay before the animation begins.
    
3. `js/employment/lottieData.js` - Its _SOLE_ purpose is to hold a variable that contains the json data of the chat animation in the employment page.

4. `js/hobbies/carusel.js` - Its purpose is to handle the functionality of the photos and videos carousel in the hobbies page.
    The key aspects here are:
    - "changeItem" function that is responsible for changing the currently displayed photo/video in the carousel.
    - Two click event listeners addition to the "prev" and "next" buttons which triggers the "changeItem" function.
    
5. `js/projects/cards.js` - Its purpose is to manage the opening and closing of projects' cards in the projects page.\
    The key aspects here are:
    - The entire code here is based on an "expanded" class which being added or removed to the card element. That is the way of recognizing if a card is open or closed.
    - The "openCard" and "closeCard" functions modify a given card's and its child elements' style.
    - The "closeAllOtherCards" function is used to ensure that only one card is open at a given time.
    - 'mouseenter', 'mouseleave', 'click', and 'touchstart' events listeners are being added to each card. The 'touchstart' event uses event.preventDefault() to prevent the browser's default touch behavior.

---

# Q4: Describe what your form would have done if you added server-side functionality.

If I have added server-side functionality to the form, I could have added the following features:

1. Security and validation: Although I have some client-side validation (email and phone regex pattern, and the required attribute), I could have added server-side validation.
    This way, I could have added a more complex validation (which is complicated and heavy to run on client side). Also - server-side validation is more secure - it would ensure that the data received is valid, and reducing the potential risk of SQL injection attacks.

2. Store submitted data and analyze it: Another potential feature that could have been added by using server-side functionality is the ability to store the data of people who submitted the form. This could have helped in understanding trends

3. Spam preventing: A common attack is spamming form submissions to try and crash a website. By using server-side functionality - I could have implemented more sophisticated spam detection and filtering mechanisms to prevent the described above.