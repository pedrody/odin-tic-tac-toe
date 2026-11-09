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
    let wins = 0;

    const getPlayerName = () => name;
    const getPlayerSymbol = () => symbol;
    const getWins = () => wins;
    const incrementWins = () => wins++;

    return { getPlayerName, getPlayerSymbol, getWins, incrementWins }
}

function Game() {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";
    let gameBoard = Gameboard();
    let gameOver = false;
    let winner = null;

    const players = [
        Player(playerOneName, "x"),
        Player(playerTwoName, "o")
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer;

    const getPlayers = () => players;

    const getWinner = () => winner;

    const isGameOver = () => gameOver;

    const playRound = (row, column) => {
        if (gameOver) {
            return;
        }

        const validPlay = gameBoard.play(row, column, activePlayer.getPlayerSymbol());

        if (!validPlay) {
            return;
        }

        if (gameBoard.checkWin(activePlayer.getPlayerSymbol())) {
            gameOver = true;
            winner = activePlayer;
            activePlayer.incrementWins();
            return;
        }

        if (gameBoard.checkTie()) {
            gameOver = true;
            return;
        }

        switchPlayerTurn();
    }

    const resetGame = () => {
        gameBoard = Gameboard();
        activePlayer = players[0];
        gameOver = false;
        winner = null;
    }

    return {
        playRound,
        resetGame,
        getBoard: () => gameBoard.getBoard(),
        getActivePlayer,
        getWinner,
        isGameOver,
        getPlayers
    }
}

function ScreenController() {
    const game = Game();
    const boardDiv = document.getElementById("board");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("reset");
    const p1WinsPara = document.getElementById("p1-wins");
    const p2WinsPara = document.getElementById("p2-wins");

    const updateScreen = () => {
        const board = game.getBoard();

        // clear the board div
        boardDiv.textContent = "";

        const player = game.getActivePlayer();
        if (game.isGameOver()) {
            const winner = game.getWinner();

            if (winner) {
                status.textContent = `${winner.getPlayerName()} WINS!`;
                const [p1, p2] = game.getPlayers();
                p1WinsPara.textContent = `Wins: ${p1.getWins()}`;
                p2WinsPara.textContent = `Wins: ${p2.getWins()}`;
            } else {
                status.textContent = "It's a TIE!";
            }
        } else {
            status.textContent = `${player.getPlayerName()}'s turn...`;
        }

        board.forEach((row, rIndex) => {
            row.forEach((cel, cIndex) => {
                const cellBtn = document.createElement("button");
                cellBtn.className = "cell";
                cellBtn.dataset.row = rIndex;
                cellBtn.dataset.column = cIndex;
                cellBtn.textContent = board[rIndex][cIndex] === 0 ? "" : board[rIndex][cIndex];

                boardDiv.append(cellBtn);
            });
        });
    }

    const clickHandlerBoard = (e) => {
        const row = e.target.dataset.row;
        const col = e.target.dataset.column;

        if (!row || !col) {
            return;
        }

        game.playRound(row, col);

        updateScreen();
    }

    boardDiv.addEventListener("click", (e) => clickHandlerBoard(e));
    updateScreen();

    resetBtn.addEventListener("click", () => {
        game.resetGame();
        updateScreen();
    });
}

ScreenController();

