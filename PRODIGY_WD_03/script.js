const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const modeSelect = document.getElementById('mode'); 

let currentPlayer = 'X'; 
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', '']; 

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6] 
];


function handleCellClick(e) {
  const cellIndex = e.target.getAttribute('data-index');

  if (gameState[cellIndex] !== '' || !gameActive) return;


  gameState[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;


  checkForResult();

  if (gameActive && currentPlayer === 'O' && modeSelect.value === 'AI') {
    setTimeout(aiMove, 500); 
  }
}

function aiMove() {
  let emptyCells = gameState
    .map((state, index) => (state === '' ? index : null))
    .filter(index => index !== null);

  if (emptyCells.length === 0) return; 


  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameState[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';


  checkForResult();
}


function checkForResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') continue; 
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}


function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => (cell.textContent = '')); 
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
modeSelect.addEventListener('change', resetGame);