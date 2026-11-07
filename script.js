function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

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

    const play = (row, column, player) => {
        if (board[row][column] !== 0) {
            return;
        }

        board[row][column] = player.getPlayerSymbol();
    }

    return { play, getBoard, printBoard };
}

function Player(name, symbol) {
    const getPlayerName = () => name;
    const getPlayerSymbol = () => symbol;

    return { getPlayerName, getPlayerSymbol }
}

function Game() {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";
    const board = Gameboard();

    const players = [
        Player(playerOneName, "x"),
        Player(playerTwoName, "o")
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const playRound = (row, column) => {
        board.play(row, column, activePlayer);
        switchPlayerTurn();
        board.printBoard();
    }

    return { playRound }
}
