

var playerDarkPurple = "D";
var playerLightPurple = "L";

var currPlayer = playerDarkPurple;
var gameOver = false;

var board;
var currColumns;

// game board
var rows = 6;
var columns = 7;

// default settings when page loads
window.onload = function() {
    setGame();
}

// game board tiles as a grid
function setGame () {
     board = [];
     currColumns = [5, 5, 5, 5, 5, 5, 5];

     for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //JS
            row.push('');

            //HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");

            // click to setPiece (aka change circle color)
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
     }
}


function setPiece() {
    if (gameOver) {
        return;
    }
    // coordinates of each space and chip
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // if column is full, return. no more chips to add
    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerDarkPurple) {
        tile.classList.add("dark-piece");
        currPlayer = playerLightPurple
    }
    else {
        tile.classList.add("light-piece");
        currPlayer = playerDarkPurple;
    }

    // for pieces to land with gravity. not just where clicked
    // updates row height
    r -= 1;

    // updates array
    currColumns[c] = r;

    checkWinner();
}

//horizontal check
function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for(let c = 0; c < columns - 3; c++) {
            if (board[r][c] != '') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //vertical check
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++ )
        if (board[r][c] != '') {
            if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                setWinner (r, c);
                return;
            }
        }
    }

    //diagonal check
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
        if (board[r][c] != '') {
            if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}

    //reverse diagonal check
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != '') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
            }
        }
    }
}

}


// announce who wins

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerDarkPurple) {
        winner.innerText = "Player 1 WINS!";
    } else {
        winner.innerText = "Player 2 WINS!";
    }

    gameOver = true;

}

// scoreboard


