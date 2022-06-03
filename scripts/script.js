// GAMEBOARD MODULE
const Gameboard = (function() {
  const squares = ["", "", "", "", "", "", "", "", ""];

  // Display the updated board
  const displayBoard = function() {
    const board = document.querySelector(".board");

    let i = 0;
    for (const square of squares) {
      const div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("data-index", i)
      // if square is empty, add a click event listener
      if (square === "") {
        div.addEventListener('click', () => {
          gameController.playerMove(div.dataset.index);
        });
      }
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
      i += 1;
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
    if (_turn === true) {
      Gameboard.markBoard(index, _marker)
    }
    _turn = !_turn;  // finish the player's turn
  }

  return {makeMove};
};

// ------------------------------------------ //

// GAME CONTROL FLOW MODULE
const gameController = (function () {

  let _playerOne = Player("X", true);
  let _playerTwo = Player("O", false);


  const startGame = function() {
    // Starts the game, spawning the board and players
    Gameboard.displayBoard();
  }

    // this function is called when a square is clicked
  const playerMove = function(index) {
    _playerOne.makeMove(index);
    _playerTwo.makeMove(index);
  }

  return {startGame, playerMove};
})();


gameController.startGame();


// checkForWinner()
// - Checks for any winning solutions for either "X" or "O"