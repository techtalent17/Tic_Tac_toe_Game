const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let cells = Array(9).fill(null);

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return cells.includes(null) ? null : "Draw";
}

function handleClick(index, cell) {
    if (!cells[index]) {
        cells[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");
        let winner = checkWinner();
        if (winner) {
            status.textContent = winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`;
            document.querySelectorAll(".cell").forEach(c => c.classList.add("taken"));
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function resetGame() {
    cells.fill(null);
    board.innerHTML = "";
    status.textContent = "Player X's turn";
    currentPlayer = "X";
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleClick(i, cell));
        board.appendChild(cell);
    }
}

createBoard();
resetButton.addEventListener("click", resetGame);
