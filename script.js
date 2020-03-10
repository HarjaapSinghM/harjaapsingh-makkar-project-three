// $(document).ready(function () {
    // Check to see if there are any empty spaces in the board 
    // Confirms whether or not the board has been filled out 

// Confirmed functional
const fullChecker = (board) => {
    for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++) {
            if (board[x][y] === 0) {
                // console.log(`board not yet complete`)
                return false
            }
        }
    }

    return true

    // Note - true should only be returned if there isn't a single blank cell left in the table
}

// Confirmed Functional
const entryPossibilities = (board, i, j) => {
    let possibilityArray = {};

    //Activating the key value pair in the object
    for (x = 1; x < 10; x++) {
        possibilityArray[x] = 0;
    }

    // Filling in horizontal values from left to right.
    // If the board already has a value at a particular index, this function will give it a value of 1
    // The final object will tell us which indices have values and which don't
    for (y = 0; y < 9; y++){
        if (board[i][y] !==0) {
            possibilityArray[board[i][y]] = 1
        } 
    }

    // Filling in vertical entries from top to bottom
    for (x = 0; x < 9; x++) {
        if (board[x][j] !== 0) {
            possibilityArray[board[x][j]] = 1
        }
    }

    // Filling in subGrids
    let k = 0;
    let l = 0;

    // Set up a logic to set k and l to always be the top left of the given subgrid
    if (i >= 0 && i <= 2) {
        k = 0;
    }

    else if (i >= 3 && i <= 5) {
        k = 3;
    }

    else {
        k = 6;
    }

    if (j >= 0 && j <= 2) {
        l = 0;
    }

    else if (j >= 3 && j <= 5) {
        l = 3;
    }

    else { 
        l = 6;
    }

    for (x = k; x < (k + 3); x++) {
        for (y = l; y < (l + 3); y++) {
            if (board [x][y] !== 0) {
                possibilityArray[board[x][y]] = 1;
            }
        }
    }

    for (x = 1; x < 10; x++) {
        if (possibilityArray[x] == 0) {
            possibilityArray[x] = x;
        }

        else {
            possibilityArray[x] = 0;
        }
    }
    // console.log(possibilityArray)
    return possibilityArray
}

const sudokuSolver = (board) => {

    let i = 0;
    let j = 0;

    let possibilities = {};

    // Check if the board is already full - means we're done
    // This is the base case of the recursive function
    if (fullChecker(board)) {
        console.log("board solved successfully")
        console.log(board);
        printBoard(board);
        return
    }

    else {
        // Find the first empty spot 
        loop1: for (x = 0; x < 9; x++) {
            loop2: for (y = 0; y < 9; y++) {
                if (board[x][y] == 0) {
                    i = x;
                    j = y;
                    // console.log(`breaking at ${i} and ${j}`)
                    break loop1;
                }

                else { continue }
            }      
        }
        // console.log(`successfully left the loop`)

        // Get an array of possibilities for [i][j]
        possibilities = entryPossibilities(board, i, j);

        for (let x = 1; x < 10; x++) {
            if (possibilities[x] !== 0) {
                board[i][j] = possibilities[x]
                // console.log(`I'm about to fill out ${possibilities[x]} because it is not Zero`)
                // console.log(`Filling out ${i} and ${j} with ${possibilities[x]}`)
                sudokuSolver(board)
            }            
        }

        // Backtracking Step
        board[i][j] = 0;
        possibilities = entryPossibilities(board, i, j);

    }
}


// # function to print the board on to a file.
// # returns a string variable with the board info

// const printFileBoard = (board) => {
//     let string = ""
//     string = string + "*********************\n"
//     for (x = 0; x < 10; x++) {
//         if (x == 3 || x == 6) {
//             string = string + "*********************\n"
//         }

//         for (y = 0; y < 10; y++) {
//             if (y == 3 || y == 6) {
//                 string = string + " * ";
//             }
//             string = string + toString(board[x][y]) + " ";
//         }

//         string = string + "\n"
//     }

//     string = string + "*********************\n"
//     return string
// }

// # function to print the board on to the console
const printBoard = (board) => {
    console.log("*********************");

    for (x = 0; x < 9; x++) {
        if (x == 3 || x == 6) {
            console.log("*********************\n");
        }

        for (y = 0; y < 9; y++) {
            if (y == 3 || y == 6) {
                console.log("*" + " ");
            }
            console.log(board[x][y] + " ")
        }
        console.log()
        console.log("*********************")
    }
    console.log(Object.values(board));
    // console.log(board);

}

const main = () => {
    // Set up a grid
    let SudokuBoard = {};

    for (x = 0; x < 9; x++) {
        SudokuBoard[x] = {};
    }


    for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++)
            SudokuBoard[x][y] = 0;
    }


SudokuBoard[0][0] = 0
    SudokuBoard[0][1] = 0
    SudokuBoard[0][2] = 0
    SudokuBoard[0][3] = 3
    SudokuBoard[0][4] = 0
    SudokuBoard[0][5] = 0
    SudokuBoard[0][6] = 2
    SudokuBoard[0][7] = 0
    SudokuBoard[0][8] = 0
    SudokuBoard[1][0] = 0
    SudokuBoard[1][1] = 0
    SudokuBoard[1][2] = 0
    SudokuBoard[1][3] = 0
    SudokuBoard[1][4] = 0
    SudokuBoard[1][5] = 8
    SudokuBoard[1][6] = 0
    SudokuBoard[1][7] = 0
    SudokuBoard[1][8] = 0
    SudokuBoard[2][0] = 0
    SudokuBoard[2][1] = 7
    SudokuBoard[2][2] = 8
    SudokuBoard[2][3] = 0
    SudokuBoard[2][4] = 6
    SudokuBoard[2][5] = 0
    SudokuBoard[2][6] = 3
    SudokuBoard[2][7] = 4
    SudokuBoard[2][8] = 0
    SudokuBoard[3][0] = 0
    SudokuBoard[3][1] = 4
    SudokuBoard[3][2] = 2
    SudokuBoard[3][3] = 5
    SudokuBoard[3][4] = 1
    SudokuBoard[3][5] = 0
    SudokuBoard[3][6] = 0
    SudokuBoard[3][7] = 0
    SudokuBoard[3][8] = 0
    SudokuBoard[4][0] = 1
    SudokuBoard[4][1] = 0
    SudokuBoard[4][2] = 6
    SudokuBoard[4][3] = 0
    SudokuBoard[4][4] = 0
    SudokuBoard[4][5] = 0
    SudokuBoard[4][6] = 4
    SudokuBoard[4][7] = 0
    SudokuBoard[4][8] = 9
    SudokuBoard[5][0] = 0
    SudokuBoard[5][1] = 0
    SudokuBoard[5][2] = 0
    SudokuBoard[5][3] = 0
    SudokuBoard[5][4] = 8
    SudokuBoard[5][5] = 6
    SudokuBoard[5][6] = 1
    SudokuBoard[5][7] = 5
    SudokuBoard[5][8] = 0
    SudokuBoard[6][0] = 0
    SudokuBoard[6][1] = 3
    SudokuBoard[6][2] = 5
    SudokuBoard[6][3] = 0
    SudokuBoard[6][4] = 9
    SudokuBoard[6][5] = 0
    SudokuBoard[6][6] = 7
    SudokuBoard[6][7] = 6
    SudokuBoard[6][8] = 0
    SudokuBoard[7][0] = 0
    SudokuBoard[7][1] = 0
    SudokuBoard[7][2] = 0
    SudokuBoard[7][3] = 7
    SudokuBoard[7][4] = 0
    SudokuBoard[7][5] = 0
    SudokuBoard[7][6] = 0
    SudokuBoard[7][7] = 0
    SudokuBoard[7][8] = 0
    SudokuBoard[8][0] = 0
    SudokuBoard[8][1] = 0
    SudokuBoard[8][2] = 9
    SudokuBoard[8][3] = 0
    SudokuBoard[8][4] = 0
    SudokuBoard[8][5] = 5
    SudokuBoard[8][6] = 0
    SudokuBoard[8][7] = 0
    SudokuBoard[8][8] = 0
    printBoard(SudokuBoard);
    sudokuSolver(SudokuBoard);
}

main();
// });