const quotes = [
  "Some people feel the rain. Others just get wet.",
  "Love the life you live. Live the life you love.",
  "Emancipate yourselves from mental slavery. None but ourselves can free our minds.",
  "Live for yourself and you will live in vain; Live for others, and you will live again.",
  "I no have education. I have inspiration. If I was educated I would be a damn fool.",
  "Better to die fighting for freedom than be a prisoner all the days of your life.",
  "Open your eyes, look within. Are you satisfied with the life you’re living?",
];

const quote = document.querySelector(".quote");
const input = document.querySelector(".input");
const results = document.querySelector(".results");
let quoteWordsArray = [];

const randomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quote.textContent = '"' + quotes[randomIndex] + '"';
  quoteWordsArray = quotes[randomIndex].split(" ").map((word) => word + " ");
  quoteWordsArray[quoteWordsArray.length - 1] = quoteWordsArray[quoteWordsArray.length - 1].trim();
};

const checkInput = () => {
  const inputValue = input.value;
  let wordArray = inputValue.split("");

  if (inputValue === wordArray[0]) {
    wordArray.shift();
    input.style.backgroundColor = "white";
  } else {
    input.style.backgroundColor = "red";
  }
};

randomQuote();

input.addEventListener("input", checkInput);
