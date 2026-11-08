function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    const winConditions = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];


    for (let i = 0; i < rows; i++) {
        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i][j] = 0;
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        console.log(getBoard());
    }

    const play = (row, column, symbol) => {
        if (board[row][column] !== 0) {
            return false;
        }

        board[row][column] = symbol;
        return true;
    }

    const checkWin = (symbol) => {
        return winConditions.some(line =>
            line.every(([r, c]) => board[r][c] === symbol));
    }

    const checkTie = () => board.every((r) => r.every((c) => c !== 0));

    return { play, getBoard, printBoard, checkWin, checkTie };
}

function Player(name, symbol) {
    const getPlayerName = () => name;
    const getPlayerSymbol = () => symbol;

    return { getPlayerName, getPlayerSymbol }
}

function Game() {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";
    const gameBoard = Gameboard();

    const players = [
        Player(playerOneName, "x"),
        Player(playerTwoName, "o")
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const playRound = (row, column) => {
        const validPlay = gameBoard.play(row, column, activePlayer.getPlayerSymbol());

        if (!validPlay) {
            console.log("Invalid play. Try again...");
            return;
        }

        if (gameBoard.checkWin(activePlayer.getPlayerSymbol())) {
            console.log(`${activePlayer.getPlayerName()} WIN!`);
            return;
        }

        if (gameBoard.checkTie()) {
            console.log("It's a TIE!");
            return;
        }

        // TODO: create method to reset game

        switchPlayerTurn();
        gameBoard.printBoard();
    }

    return { playRound }
}


