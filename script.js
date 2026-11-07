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

    const play = (row, column) => {
        if (board[row][column] !== 0) {
            return;
        }

        board[row][column] = "x";
    }

    return { play, getBoard, printBoard };
}
