const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameState[cellIndex] !== '' || !gameActive || currentPlayer !== 'X') {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameActive && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500);
    }
}

function makeAIMove() {
    let availableCells = [];
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            availableCells.push(i);
        }
    }

    if (availableCells.length > 0) {
        const aiMove = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameState[aiMove] = 'O';
        cells[aiMove].textContent = 'O';
        checkResult();
        currentPlayer = 'X';
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        alert(`Player ${currentPlayer} has won!`);
        return;
    }

    if (!gameState.includes('')) {
        gameActive = false;
        alert('Game ended in a draw!');
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
