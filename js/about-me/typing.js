const by = (selector) => document.querySelector(selector);
const $typingText = by('.typingSpan');
const $cursor = by('.cursor');

const words = ['hard', 'fun', 'passion', 'a journey', 'LIFE'];
const delay = {
    typing: 150,
    keeping: 750,
    erasing: 100,
    word: 750,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const type = async (word) => {
    $cursor.classList.add('typing');
    for (const char of word) {
        $typingText.textContent += char;
        await sleep(delay.typing);
    }
    $cursor.classList.remove('typing');
    await sleep(delay.keeping);

    for (let i = 0; i < word.length; i++) {
        $typingText.textContent = word.substring(0, word.length - i - 1);
        await sleep(delay.erasing);
    }
};

const loop = async (wordIndex = 0) => {
    await type(words[wordIndex % words.length]);

    setTimeout(async () => {
        await loop(wordIndex + 1);
    }, delay.word);
};

document.addEventListener('DOMContentLoaded', () => {
    // sleep for 1 sec before starting the typing animation
    setTimeout(() => {
        loop();
    }, 1000);
});