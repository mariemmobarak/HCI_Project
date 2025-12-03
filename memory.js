document.addEventListener('DOMContentLoaded', () => {
    const avatarLink = document.querySelector('.avatar-link');
    if (avatarLink) {
        avatarLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }
});

const images = [
  "/assets/memory/apple.png",
  "/assets/memory/monkey.png",
  "/assets/memory/star.png",
  "/assets/memory/dog.png",
  "/assets/memory/balloon.png",
  "/assets/memory/rocket.png",
  "/assets/memory/elf.png",
];


const gameEl = document.getElementById("game");
const movesEl = document.getElementById("moves");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlaySub = document.getElementById("overlay-sub");
const overlayMoves = document.getElementById("overlay-moves");
const overlayTime = document.getElementById("overlay-time");
const playAgain = document.getElementById("playAgain");

let deck = [];            
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;
let moves = 0;
let startTime = null;
let timerInterval = null;

function initGame() {
  resetState();
  buildDeck();
  renderDeck();
  startTimer(); // timer starts immediately when page loads; you can change to start on first flip
}

function resetState() {
  clearInterval(timerInterval);
  timerEl.textContent = "00:00";
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedCount = 0;
  moves = 0;
  movesEl.textContent = moves;
  overlay.classList.add("hidden");
}

function buildDeck() {
  // duplicate images to create pairs, then shuffle
  const pairs = images.slice(); // copy
  deck = pairs.concat(pairs).map((src, idx) => ({
    id: idx + "-" + Math.random().toString(36).slice(2,7),
    src
  }));
  deck = shuffle(deck);
}

function shuffle(array) {
  // Fisher-Yates
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderDeck() {
  gameEl.innerHTML = "";
  deck.forEach((card, index) => {
    const cardEl = document.createElement("button");
    cardEl.className = "card";
    cardEl.setAttribute("type", "button");
    cardEl.setAttribute("data-id", card.id);
    cardEl.setAttribute("aria-label", "Memory card");
    cardEl.setAttribute("role", "gridcell");

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-face card-front";
    const imgFront = document.createElement("img");
    imgFront.src = card.src;
    imgFront.alt = "card";
    front.appendChild(imgFront);

    const back = document.createElement("div");
    back.className = "card-face card-back";
    const backLogo = document.createElement("img");
    backLogo.src = "/assets/HClogo.png"; // small logo or pattern
    backLogo.alt = "card back";
    back.appendChild(backLogo);

    inner.appendChild(front);
    inner.appendChild(back);
    cardEl.appendChild(inner);

    // click handler
    cardEl.addEventListener("click", () => onCardClick(cardEl, card));
    gameEl.appendChild(cardEl);
  });
}

function onCardClick(cardEl, card) {
  if (lockBoard) return;
  if (cardEl.classList.contains("flipped")) return;

  flipCard(cardEl);

  if (!firstCard) {
    firstCard = { cardEl, card };
    return;
  }

  secondCard = { cardEl, card };
  moves++;
  movesEl.textContent = moves;
  checkForMatch();

}

function flipCard(cardEl) {
  cardEl.classList.add("flipped");
  cardEl.setAttribute("aria-pressed", "true");
}

function unflipCards(a, b) {
  lockBoard = true;
  setTimeout(() => {
    a.classList.remove("flipped");
    b.classList.remove("flipped");
    a.setAttribute("aria-pressed", "false");
    b.setAttribute("aria-pressed", "false");
    resetTurn();
  }, 900);
}

function checkForMatch() {

  const isMatch = firstCard.card.src === secondCard.card.src;
  if (isMatch) {
    setTimeout(() => {
        markMatched(firstCard.cardEl);
        markMatched(secondCard.cardEl);
        matchedCount += 2;
        resetTurn();
        checkEnd();
    }, 500);
  } else {
    unflipCards(firstCard.cardEl, secondCard.cardEl);
  }
}

function markMatched(el) {
  el.classList.add("matched");
  flipCard(el);
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkEnd() {
  if (matchedCount === deck.length) {
    setTimeout(showOverlay, 600);
  }
}

function showOverlay() {
  clearInterval(timerInterval);
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  overlayTitle.textContent = "Fantastic!";
  overlaySub.textContent = "You matched all the cards!";
  overlayMoves.textContent = moves;
  overlayTime.textContent = timerEl.textContent;
}

function startTimer() {
  clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const diff = Math.floor((Date.now() - startTime) / 1000);
  const mm = String(Math.floor(diff / 60)).padStart(2, "0");
  const ss = String(diff % 60).padStart(2, "0");
  timerEl.textContent = `${mm}:${ss}`;
}

restartBtn.addEventListener("click", () => {
  initGame();
});

playAgain.addEventListener("click", () => {
  initGame();
});

// Initialize on load
initGame();
