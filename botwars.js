var botwarsStarkillerMenace = function(board) {
    // console.log(grid[grid.length - 1]);
    this.player1 = 1; // ToDo :  board.slice(board.length - 1).toString()
    this.player2 = 2; // ToDO : Set min max players according to input.
    this.board = board.slice(0, board.length - 1);
    this.boardLength = this.board.length;
    this.currentPlayer = this.player1;
}

botwarsStarkillerMenace.prototype.swapCurrentPlayer = function() {
    this.currentPlayer == this.player1 ? this.player2 : this.player1;
}

botwarsStarkillerMenace.prototype.checkBoardFilled = function(board) {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) { //ToDo : boundary check
            if (board[i][j] >= 15) {
                if (i == 4 && j == 4) {
                    return true;
                } else {
                    continue;
                }
            } else {
                return false;
            }
        }
    }
}

botwarsStarkillerMenace.prototype.cloneBoard = function(board) {
    return board.slice(0);
};

botwarsStarkillerMenace.prototype.checkPointScored = function(board) {
    for (var i = 0; i < 5; i++) {//toDo: boundary should be board.length-1 to avoid the last row
        for (var j = 0; j < 5; j++) {
            if ((board[i][j] == 6 || board[i][j] == 7 || board[i][j] == 14 || board[i][j] == 15) &&
                (board[i][j + 1] == 12 || board[i][j + 1] == 13 || board[i][j + 1] == 14 || board[i][j + 1] == 15) &&
                (board[i + 1][j] == 3 || board[i + 1][j] == 7 || board[i + 1][j] == 11 || board[i + 1][j] == 15) &&
                (board[i + 1][j + 1] == 9 || board[i + 1][j + 1] == 11 || board[i + 1][j + 1] == 13 || board[i + 1][j + 1] == 15) &&
                (i + 1) < 5 && (j + 1) < 5
            ) {
                return true;
            } else {
                return false;
            }
        }
    }
}

//botwarsStarkillerMenace.prototype.validateMove = function(row, col, move, board) {
	//validArray=[[8,4,2,1],[8,4,2],[8,4,2]]
//} toDo: create validmove function.

botwarsStarkillerMenace.prototype.makeMove = function(row, col, move) {
    var newBoard = this.cloneBoard(this.board);
    // console.log(Number(newBoard[row][col]) + Number(move));

    if ((Number(newBoard[row][col]) + Number(move)) < 15) {
        newBoard[row][col] += move; //toDo: Cast both the operands
        // console.log("getting called", row, col, "\n", newBoard);

        if (!this.checkPointScored(newBoard)) {
            this.swapCurrentPlayer();
        }

        return newBoard;
    } else {
        return null;
    }
}

botwarsStarkillerMenace.prototype.findMove = function() {
    var bestMoveValue = -100;
    var move = 0,
        row = 0,
        col = 0;
    var possibleMoves = [1, 2, 4, 8]; //0:Top 1:Right 2:Down 3:Left
    for (var i = 0; i < this.boardLength; i++) {
        for (var j = 0; j < this.boardLength; j++) {
            for (var k = 0; k < possibleMoves.length; k++) {

                if (j == 0 && k == 3) {
                    continue;
                }
                if (j == this.boardLength - 1 && k == 1) {
                    continue;
                }
                if (i == 0 && k == 0) {
                    continue;
                }
                if (i == this.boardLength - 1 && k == 2) {
                    continue;
                }

                var newBoard = this.makeMove(i, j, possibleMoves[k]);

                if (newBoard) {
                    var predictedMoveValue = this.minValue(newBoard);
                    if (predictedMoveValue > bestMoveValue) {
                        bestMoveValue = predictedMoveValue;
                        move = possibleMoves[k];
                        row = i;
                        col = j;
                    }
                }
            }
        }
    }
    return [move, row, col]
}

botwarsStarkillerMenace.prototype.minValue = function(board) {
    if (this.checkPointScored(board) && this.currentPlayer == player1) {
        return 1;
    } else if (this.checkPointScored(board) && this.currentPlayer == player2) {
        return -1;
    } else if (this.checkBoardFilled(board)) {
        return 0;
    } else {
        bestMoveValue = 100;
        var move = 0;
        row = 0, col = 0;
        var possibleMoves = [1, 2, 4, 8] //0:Top 1:Right 2:Down 3:Left
        for (var i = 0; i < this.boardLength; i++) {
            for (var j = 0; j < this.boardLength; j++) {
                for (var k = 0; k < possibleMoves.length; k++) {

                    if (j == 0 && k == 3) {
                        continue;
                    }
                    if (j == this.boardLength - 1 && k == 1) {
                        continue;
                    }
                    if (i == 0 && k == 0) {
                        continue;
                    }
                    if (i == this.boardLength - 1 && k == 2) {
                        continue;
                    }

                    var newBoard = this.makeMove(i, j, possibleMoves[k]);

                    if (newBoard) {
                        var predictedMoveValue = this.maxValue(newBoard);
                        if (predictedMoveValue > bestMoveValue) {
                            bestMoveValue = predictedMoveValue;
                            move = possibleMoves[k];
                            row = i;
                            col = j;
                        }
                    }
                }
            }
        }
        return bestMoveValue;
    }
}

botwarsStarkillerMenace.prototype.maxValue = function(board) {
    if (this.checkPointScored(board) && this.currentPlayer == player1) {
        return 1;
    } else if (this.checkPointScored(board) && this.currentPlayer == player2) {
        return -1;
    } else if (this.checkBoardFilled(board)) {
        return 0;
    } else {
        bestMoveValue = -100;
        var move = 0;
        row = 0, col = 0;
        var possibleMoves = [1, 2, 4, 8] //0:Top 1:Right 2:Down 3:Left
        for (var i = 0; i < this.boardLength; i++) {
            for (var j = 0; j < this.boardLength; j++) {
                for (var k = 0; k < possibleMoves.length; k++) {

                    if (j == 0 && k == 3) {
                        continue;
                    }
                    if (j == this.boardLength - 1 && k == 1) {
                        continue;
                    }
                    if (i == 0 && k == 0) {
                        continue;
                    }
                    if (i == this.boardLength - 1 && k == 2) {
                        continue;
                    }

                    var newBoard = this.makeMove(i, j, possibleMoves[k]);

                    if (newBoard) {
                        var predictedMoveValue = this.minValue(newBoard);
                        if (predictedMoveValue > bestMoveValue) {
                            bestMoveValue = predictedMoveValue;
                            move = possibleMoves[k];
                            row = i;
                            col = j;
                        }
                    }
                }
            }
        }
        return bestMoveValue;
    }
}

function main(input) {
    board = input.split(" ").join("").split("\n");
    var botwars = new botwarsStarkillerMenace(board);

    var move = botwars.findMove();
    console.log(move);
}

process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";

process.stdin.on("data", function(input) {
    stdin_input += input;
});

process.stdin.on("end", function() {
    main(stdin_input);
});
