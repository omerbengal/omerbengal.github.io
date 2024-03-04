function openCard(card) {
    card.style.transform = 'scale(1.2)';
    card.style.overflowY = 'scroll';
    card.querySelector('.card__content').style.transform = 'rotateX(0deg)';
    card.querySelector('.card__title').style.color = '#333';
    card.querySelector('.main-title').style.scale = '0';
    card.querySelector('.main-title').style.transition = 'scale 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    card.querySelector('.card__description').style.color = '#777';
    card.classList.add('expanded');
}

function closeCard(card) {
    card.style.transform = 'scale(1)';
    card.style.overflowY = 'hidden';
    card.querySelector('.card__content').style.transform = 'rotateX(-90deg)';
    card.querySelector('.card__title').style.color = '#b6b5b5';
    card.querySelector('.main-title').style.scale = '1';
    card.querySelector('.main-title').style.transition = 'scale 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    card.querySelector('.card__description').style.color = '#b6b5b5';
    card.classList.remove('expanded');
}

function closeAllOtherCards(cards, card) {
    console.log("closeAllOtherCards");
    cards.forEach(function (c) {
        if (c !== card && c.classList.contains('expanded')) {
            closeCard(c);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // get all cards
    let cards = document.querySelectorAll('.card');

    cards.forEach(function (card) {

        // hover-in
        card.addEventListener('mouseenter', function () {
            if (!card.classList.contains('expanded')) {
                // IN CASE other cards are expanded (which with hover it is not possible...), close them
                closeAllOtherCards(cards, card);
                openCard(card);
            }
        });

        // hover-out
        card.addEventListener('mouseleave', function () {
            if (card.classList.contains('expanded')) {
                closeCard(card);
            }
        });

        // click
        card.addEventListener('click', function () {
            if (card.classList.contains('expanded')) {
                closeCard(card);
            } else {
                closeAllOtherCards(cards, card);
                openCard(card);
            }
        });

        // touch
        card.addEventListener('touchstart', function (event) {
            event.preventDefault(); // Prevent the browser from acting like we pressed the card
            if (card.classList.contains('expanded')) {
                closeCard(card);
            } else {
                closeAllOtherCards(cards, card);
                openCard(card);
            }
        });
    });
});