
const firstPlayer = "X";
const secondPlayer = "O";
let nextTurn = false;
const tiles = document.querySelectorAll("td");
const mainArr = [[tiles[0], tiles[1], tiles[2]], [tiles[3], tiles[4], tiles[5]], [tiles[6], tiles[7], tiles[8]]];
const gameStatus = document.querySelector(".game_status h1");
const restartBtn = document.querySelector(".game_restart");

tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        if (!nextTurn) {
            if (tile.textContent === "") {
                if (!statusCheck()) {
                    tile.textContent = "X";
                    tile.classList.add('X');
                }
                if (!statusCheck()) {
                    nextTurn = true;
                }
            }
        } else {
            if (tile.textContent === "") {
                if (!statusCheck()) {
                    tile.textContent = "O";
                    tile.classList.add('O');
                }
                if (!statusCheck()) {
                    nextTurn = false;
                }
            }
        }
    })
})
function statusCheck() {
    // checking if rows are the same
    for (let i = 0; i < mainArr.length; i++) {
        const row = mainArr[i];
        if (row.every((tile) => tile.textContent === 'X')) {
            gameStatus.textContent = "Player X wins!";
            restartBtn.style.display = "inline-block";
            return true;
        } else if (row.every((tile) => tile.textContent === 'O')) {
            gameStatus.textContent = "Player O wins!";
            restartBtn.style.display = "inline-block";
            return true;
        }
    }
    // checking if columns are the same
    for (let i = 0; i < mainArr.length; i++) {
        const column = [mainArr[0][i], mainArr[1][i], mainArr[2][i]];
        if (column.every((tile) => tile.textContent === "X")) {
            gameStatus.textContent = "Player X wins!";
            restartBtn.style.display = "inline-block";
            return true;
        } else if (column.every((tile) => tile.textContent === "O")) {
            gameStatus.textContent = "Player O wins!";
            restartBtn.style.display = "inline-block";
            return true;
        }
    }
    // checking the diagonals
    const diagonal1 = [mainArr[0][0], mainArr[1][1], mainArr[2][2]];
    const diagonal2 = [mainArr[0][2], mainArr[1][1], mainArr[2][0]];
    if (diagonal1.every((tile) => tile.textContent === "X") || diagonal2.every((tile) => tile.textContent === "X")) {
        gameStatus.textContent = "Player X wins!";
        restartBtn.style.display = "inline-block";
        return true;
    } else if (diagonal1.every((tile) => tile.textContent === "O") || diagonal2.every((tile) => tile.textContent === "O")) {
        gameStatus.textContent = "Player O wins!";
        restartBtn.style.display = "inline-block";
        return true;
    }
    // checking for ties
    if ([...tiles].every(tile => tile.textContent !== "")) {
        gameStatus.textContent = "It's a tie!";
        restartBtn.style.display = "inline-block";
        return true;
    }
    // No winners yet
    return false;
}
restartBtn.addEventListener('click', () => {
    tiles.forEach((tile) => {
        tile.textContent = "";
        nextTurn = false;
        gameStatus.textContent = "";
        restartBtn.style.display = 'none';
        tiles.forEach((tile) => {
            tile.textContent = "";
            tile.classList.remove('X', 'O'); // Remove X and O classes
        });
    })
})