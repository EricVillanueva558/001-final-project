// Define variables to track the game state
let currentPlayer = "X"; // X always starts
let gameState = Array(9).fill(null); // Array to track the board state
let scores = { X: 0, O: 0 }; // Scores for both players
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Select DOM elements
const squares = document.querySelectorAll(".game-square");
const turnTracker = document.getElementById("turn");
const scoreboardX = document.getElementById("scoreboard-x");
const scoreboardO = document.getElementById("scoreboard-o");
const playAgainButton = document.getElementById("button-play-again");

// Initialize the game
function initializeGame() {
  updateTurnTracker(); // Display the current turn
  updateScoreboard(); // Display initial scores
  addEventListenersToSquares(); // Add click handlers to the game squares
  playAgainButton.addEventListener("click", resetGame); // Add reset functionality
}

// Update the turn tracker display
function updateTurnTracker() {
  turnTracker.textContent = `Player ${currentPlayer}`;
}

// Update the scoreboard display
function updateScoreboard() {
  scoreboardX.textContent = scores.X;
  scoreboardO.textContent = scores.O;
}

// Add event listeners to all squares
function addEventListenersToSquares() {
  squares.forEach((square, index) => {
    square.addEventListener("click", () => handleSquareClick(index));
  });
}

// Handle square clicks
function handleSquareClick(index) {
  if (gameState[index] || checkGameOver()) {
    // Ignore clicks on filled squares or if the game is over
    return;
  }

  gameState[index] = currentPlayer; // Update game state
  squares[index].textContent = currentPlayer; // Display current player's move
  if (checkWinner()) {
    // Check for a winner
    alert(`Congratulations! Player ${currentPlayer} wins!`);
    scores[currentPlayer] += 1; // Update score
    updateScoreboard(); // Reflect the updated scores
    return;
  }

  if (checkTie()) {
    // Check for a tie
    alert("It's a tie!");
    return;
  }

  switchTurn(); // Switch turns
}

// Switch the current player's turn
function switchTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnTracker(); // Reflect the new turn
}

// Check if there is a winner
function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => gameState[index] === currentPlayer);
  });
}

// Check if the game is a tie
function checkTie() {
  return gameState.every((square) => square !== null);
}

// Check if the game is over
function checkGameOver() {
  return checkWinner() || checkTie();
}

// Reset the game to its initial state
function resetGame() {
  gameState.fill(null); // Clear the game state
  squares.forEach((square) => (square.textContent = "")); // Clear square displays
  currentPlayer = "X"; // Reset the current player
  updateTurnTracker(); // Reset turn tracker
}

// Save scores to local storage
function saveScores() {
  localStorage.setItem("scores", JSON.stringify(scores));
}

// Load scores from local storage
function loadScores() {
  const savedScores = localStorage.getItem("scores");
  if (savedScores) {
    scores = JSON.parse(savedScores);
  }
}

// Initialize the application
function init() {
  loadScores(); // Load previous scores
  initializeGame(); // Set up the game
}

// Save scores before the user leaves
window.addEventListener("beforeunload", saveScores);

// Run the game initialization
init();
