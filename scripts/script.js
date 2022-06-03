// GAMEBOARD MODULE
const Gameboard = (function() {
  const squares = ["X", "X", "O", "O", "O", "", "X", "O", "O"];

  // Display the updated board
  const displayBoard = function() {
    const board = document.querySelector(".board");
    for (const square of squares) {
      const div = document.createElement("div");
      div.classList.add("square");
      const img = document.createElement("img");
      let imgSource;
      if (square !== "") {
        if (square === "X") {
          imgSource = "images/x-svgrepo-com.svg";
        } else if (square === "O") {
          imgSource = "images/checkbox-blank-circle-outline.svg";
        }
        img.setAttribute("src", imgSource);
        div.appendChild(img);
      }
      board.appendChild(div);
    }
  }

  const eraseBoard = function() {
    const board = document.querySelector(".board");
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }
  }

  // Edit one square on the board
  const markBoard = function(index, marker) {
    if (squares[index] !== "") {
      // run invalid square function
      return;
    }
    squares[index] = marker;
    eraseBoard();
    displayBoard();
  }

  return {squares, displayBoard, markBoard, eraseBoard};

})();

// ------------------------------------------ //

// PLAYER FACTORY FUNCTION
const Player = function(marker, turn) {
  // Sets initial score, and which marker the player uses
  const _marker = marker;
  let _turn = turn;

  // Make a move, and mark the board using markBoard function
  const makeMove = function(index) {
    Gameboard.markBoard(index, _marker)
    _turn = !_turn;  // finish the player's turn
  }

  return {getMarker};
};

// ------------------------------------------ //

// GAME CONTROL FLOW MODULE
const  gameController = (function () {

  const startGame = function() {
    // Starts the game, spawning the board and players
    Gameboard.displayBoard();
    const playerOne = Player("X", true);
    const playerTwo = Player("O", false);

    console.log(playerOne.getMarker());
  }

  return {startGame};
})();


gameController.startGame();


// checkForWinner()
// - Checks for any winning solutions for either "X" or "O"