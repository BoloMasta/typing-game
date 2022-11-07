const quotes = [
  "Some people feel the rain. Others just get wet.",
  "Love the life you live. Live the life you love.",
  "Emancipate yourselves from mental slavery. None but ourselves can free our minds.",
  "Live for yourself and you will live in vain; Live for others, and you will live again.",
  "I no have education. I have inspiration. If I was educated I would be a damn fool.",
  "Better to die fighting for freedom than be a prisoner all the days of your life.",
  "Open your eyes, look within. Are you satisfied with the life you’re living?",
  "Test",
];

const quote = document.querySelector(".quote");
const input = document.querySelector(".input");
const results = document.querySelector(".results");

const restart = document.querySelector(".restart");
const newQuote = document.querySelector(".new-quote");

let quoteWordsArray = [];
let indexOfActiveWord = 0;
let timer;

const randomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteWordsArray = quotes[randomIndex].split(" ").map((word) => word + " ");
  quoteWordsArray[quoteWordsArray.length - 1] = quoteWordsArray[quoteWordsArray.length - 1].trim();
};

const displayQuote = (indexOfActiveWord) => {
  const wordActiveBefore = document.querySelector(".word-active-before");
  const wordActive = document.querySelector(".word-active");
  const wordActiveAfter = document.querySelector(".word-active-after");

  wordActiveBefore.textContent = quoteWordsArray.slice(0, indexOfActiveWord).join(" ");
  wordActive.textContent = quoteWordsArray[indexOfActiveWord];
  wordActiveAfter.textContent = quoteWordsArray.slice(indexOfActiveWord + 1).join(" ");
};

const checkInput = () => {
  const inputValue = input.value;

  if (indexOfActiveWord === 0 && inputValue.length === 1) {
    timer = new Date().getTime();
    restart.disabled = false;
  }

  if (inputValue === quoteWordsArray[indexOfActiveWord].slice(0, inputValue.length)) {
    input.classList.remove("incorrect");
  } else {
    input.classList.add("incorrect");
  }

  if (inputValue === quoteWordsArray[indexOfActiveWord]) {
    indexOfActiveWord += 1;
    displayQuote(indexOfActiveWord);
    input.value = "";
  }

  if (indexOfActiveWord === quoteWordsArray.length) {
    const time = new Date().getTime() - timer;
    const seconds = time / 1000;
    results.insertAdjacentHTML("beforeend", `You finished in ${seconds} seconds. <br>`);
    input.value = "";
    input.disabled = true;
  }
};

input.addEventListener("input", checkInput);

restart.addEventListener("click", () => {
  indexOfActiveWord = 0;
  displayQuote(indexOfActiveWord);
  restart.disabled = true;
  input.disabled = false;
});

newQuote.addEventListener("click", () => {
  randomQuote();
  indexOfActiveWord = 0;
  displayQuote(indexOfActiveWord);
  input.disabled = false;
  results.textContent = "";
});

randomQuote();
displayQuote(indexOfActiveWord);
