const PLAYER_X = 'player-x';
const PLAYER_O = 'player-o';
const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('game-board');
const messageElement = document.getElementById('gameMessage');
const messageText = document.getElementById('messageText');
const resetButton = document.getElementById('resetButton');
let isOTurn;

initializeGame();

resetButton.addEventListener('click', initializeGame);

function initializeGame() {
    isOTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(PLAYER_X);
        cell.classList.remove(PLAYER_O);
        cell.removeAttribute('data-mark');
        cell.removeEventListener('click', onCellClick);
        cell.addEventListener('click', onCellClick, { once: true });
    });
    updateBoardHoverClass();
    messageElement.style.display = 'none';
}

function onCellClick(event) {
    const cell = event.target;
    const currentClass = isOTurn ? PLAYER_O : PLAYER_X;
    placeMarker(cell, currentClass);
    if (checkWinner(currentClass)) {
        concludeGame(false);
    } else if (checkDraw()) {
        concludeGame(true);
    } else {
        toggleTurn();
        updateBoardHoverClass();
    }
}

function concludeGame(draw) {
    if (draw) {
        messageText.innerText = 'It\'s a Draw!';
    } else {
        messageText.innerText = `${isOTurn ? "O's" : "X's"} Win!`;
    }
    messageElement.style.display = 'flex';
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(PLAYER_X) || cell.classList.contains(PLAYER_O);
    });
}

function placeMarker(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.setAttribute('data-mark', currentClass === PLAYER_X ? 'X' : 'O');
}

function toggleTurn() {
    isOTurn = !isOTurn;
}

function updateBoardHoverClass() {
    gameBoard.classList.remove(PLAYER_X);
    gameBoard.classList.remove(PLAYER_O);
    if (isOTurn) {
        gameBoard.classList.add(PLAYER_O);
    } else {
        gameBoard.classList.add(PLAYER_X);
    }
}

function checkWinner(currentClass) {
    return WIN_COMBOS.some(combo => {
        return combo.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
