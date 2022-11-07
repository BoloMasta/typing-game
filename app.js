const quotes = [
  "Some people feel the rain. Others just get wet.",
  "Love the life you live. Live the life you love.",
  "Love would never leave us alone.",
  "Overcome the devils with a thing called love.",
  "The good times of today are the sad thoughts of tomorrow.",
  "Though the road's been rocky, it sure feels good to me.",
  "Every man got the right to decide his own destiny.",
  "When the root is strong, the fruit is sweet.",
  "The day you stop racing, is the day you win the race.",
  "In the abundance of water, a fool is thirsty.",
  "I don't believe in death, neither in flesh nor in spirit.",
  "When one door is closed, don't you know, another is open.",
  "In this great future, you can't forget your past.",
  "A hungry mob is an angry mob.",
  "I don't know how to live good. I only know how to suffer.",
  "Rastafari not a culture, it's a reality.",
];

const quote = document.querySelector(".quote");
const spaces = document.querySelector(".spaces");
const input = document.querySelector(".input");
const results = document.querySelector(".results");
const restart = document.querySelector(".restart");
const newQuote = document.querySelector(".new-quote");

let quoteWordsArray = [];
let indexOfActiveWord = 0;
let timer;

// random quote
const randomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  // split quote into words and add " "
  quoteWordsArray = quotes[randomIndex].split(" ").map((word) => word + " ");
  // remove last " "
  quoteWordsArray[quoteWordsArray.length - 1] = quoteWordsArray[quoteWordsArray.length - 1].trim();

  // placing signature
  spaces.innerHTML = "";
  for (let i = 0; i < 2 * quotes[randomIndex].length; i++) {
    spaces.insertAdjacentHTML("beforeend", "\u00A0");
  }
};

// display quote
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

  // start timer
  if (indexOfActiveWord === 0 && inputValue.length === 1) {
    timer = new Date().getTime();
    restart.disabled = false;
  }

  // check if input is correct
  if (inputValue === quoteWordsArray[indexOfActiveWord].slice(0, inputValue.length)) {
    input.classList.remove("incorrect");
  } else {
    input.classList.add("incorrect");
  }

  // check if word is complete
  if (inputValue === quoteWordsArray[indexOfActiveWord]) {
    indexOfActiveWord += 1;
    displayQuote(indexOfActiveWord);
    input.value = "";
  }

  // check if quote is complete
  if (indexOfActiveWord === quoteWordsArray.length) {
    const time = new Date().getTime() - timer;
    const seconds = time / 1000;
    results.insertAdjacentHTML("beforeend", `You finished in ${seconds} seconds. <br>`);
    input.value = "";
    input.disabled = true;
  }
};

input.addEventListener("input", checkInput);

// buttons listeners
restart.addEventListener("click", () => {
  indexOfActiveWord = 0;
  displayQuote(indexOfActiveWord);
  restart.disabled = true;
  input.disabled = false;
  input.value = "";
  input.classList.remove("incorrect");
});

newQuote.addEventListener("click", () => {
  randomQuote();
  indexOfActiveWord = 0;
  displayQuote(indexOfActiveWord);
  input.disabled = false;
  results.textContent = "";
  input.value = "";
  input.classList.remove("incorrect");
  restart.disabled = true;
});

// initial quote
randomQuote();
displayQuote(indexOfActiveWord);
