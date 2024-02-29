let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function changeItem(nextIndex) {
    // Pause video if current item is a video
    if (items[currentIndex].tagName === 'VIDEO') {
        items[currentIndex].pause();
    }

    // Hide current item
    items[currentIndex].style.display = 'none';

    // Update index and show next item
    currentIndex = nextIndex;
    items[currentIndex].style.display = 'block';

    // Play video if next item is a video
    if (items[currentIndex].tagName === 'VIDEO') {
        items[currentIndex].play();
    }
}

document.getElementById('next').addEventListener('click', () => {
    changeItem((currentIndex + 1) % totalItems);
});

document.getElementById('prev').addEventListener('click', () => {
    changeItem((currentIndex - 1 + totalItems) % totalItems);
});

// Initialize first item
items[currentIndex].style.display = 'block';
