// $(document).ready(function () {
    // Check to see if there are any empty spaces in the board 
    // Confirms whether or not the board has been filled out 
// Strech goals
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
        if (fullChecker(board) == true) {
            console.log("board solved successfully");
            return; 
        }

        else {
            // console.log("gong back into the else")
            // Find the first empty spot 
            loop1: for (x = 0; x < 9; x++) {
                loop2: for (y = 0; y < 9; y++) {
                    if (board[x][y] == 0) {
                        i = x;
                        j = y;
                        break loop1;
                    }

                    else { continue }
                }      
            }

            // Get an array of possibilities for [i][j]
            possibilities = entryPossibilities(board, i, j);

            loop4: for (let o = 1; o < 10; o++) {
                if (fullChecker(board) == true) {
                    break loop4;
                }
                else {
                    if (possibilities[o] !== 0) {
                        console.log(o)
                        board[i][j] = possibilities[o]
                        sudokuSolver(board)
                    }   
                }         
            }

            // Backtracking Step
            board[i][j] = 0;
            possibilities = entryPossibilities(board, i, j);

        }
    }


    // # function to print the board on to the console
    const printBoard = (SudokuBoard) => {
        // for (a = 0; a < 9; a++) {
        //     for (b = 0; b < 9; b++)
        //         console.log(`Filling out ${SudokuBoard[a][b]}`)
        //         $(`#${a}${b}`).innerHTML(`${SudokuBoard[a][b]}`) 
        // }

        console.log("fake printing board")
        return true;
    }

    const main = () => {
        // Set up a grid
        let SudokuBoard = {};


        for (c = 0; c < 9; c++) {
            SudokuBoard[c] = {};
        }

        for (x = 0; x < 9; x++) {
            for (y = 0; y < 9; y++)
                SudokuBoard[x][y] = 0;
        }

        // Build a loop which popultes the board with the table cells

        // Pseudo 
        // Loop a from the numbers 0 to 8
        // Within this loop b from 0 to 8
        // At point A B, fill out sudoku Board's object A's location B based on the table's row n child A + 1 and it's cell child B + 1
        // Put the puzzle through a validity checker once the cells have been assigned. It ensures there are no row column or subgrid duplicates before running the rest of the function
        
        // for (a = 0; a < 9; a++) {
        //     for (b = 0; b < 9; b++)
        //         if ($(`#${a}${b}`).val() !== "") {
        //             SudokuBoard[a][b] = $(`#${a}${b}`).val();
        //         }

        //         else {
        //             SudokuBoard[a][b] = 0;
        //         }
        // }

        // printBoard(SudokuBoard);
        sudokuSolver(SudokuBoard);
    }

    // $('#btn').click(function () {
        main();
    // });
// });