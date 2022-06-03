// GAMEBOARD MODULE
const Gameboard = (function() {
  const _squares = ["", "", "", "", "", "", "", "", ""];

  // Display the updated board
  const displayBoard = function() {
    const board = document.querySelector(".board");

    let i = 0;
    for (const square of _squares) {
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
    if (_squares[index] !== "") {
      // run invalid square function
      return;
    }
    _squares[index] = marker;
    eraseBoard();
    displayBoard();
  }

  // Get function for the board, to determine winner
  const getBoard = function() {
    return _squares;
  }

  return {displayBoard, markBoard, eraseBoard, getBoard};

})();

// ------------------------------------------ //
// ------------------------------------------ //

// PLAYER FACTORY FUNCTION
const Player = function(marker, turn, playerName) {
  // Sets initial score, and which marker the player uses
  const _marker = marker;
  let _name = playerName;
  let _turn = turn;

  // Make a move, and mark the board using markBoard function
  const makeMove = function(index) {
    if (_turn === true) {
      Gameboard.markBoard(index, _marker)
    }
    _turn = !_turn;  // finish the player's turn
    if (gameController.checkWinner(_marker)) { // then check if player won
      gameController.declareWinner(_name);
    }
  }

  const displayName = function() {
    let player;
    if (marker === "X") {
      player = ".playerOne-box";
    } else {
      player = ".playerTwo-box";
    }
    const nameBox = document.querySelector(player);
    const nameInfo = document.createElement("h2");
    nameInfo.textContent = playerName;
    nameBox.appendChild(nameInfo);

  }

  return {makeMove, displayName};
};

// ------------------------------------------ //
// ------------------------------------------ //

// GAME CONTROL FLOW MODULE
const gameController = (function () {

  let _playerOne;
  let _playerTwo;
  let _gameRunning = true;

  // object containing all 8 win patterns
  // here we can see that the corner squares have 3 possible
  // winning patterns, the side squares have 2 patterns, and the
  /// middle square the most with 4, useful for smart AI later
  const _winningPatterns = {
    a: [0,1,2],
    b: [0,4,8],
    c: [0,3,6],
    d: [1,4,7],
    e: [2,5,8],
    f: [2,4,6],
    g: [3,4,5],
    h: [6,7,8],
  }

  const setPlayerNames = function(playerOne, playerTwo) {
    _playerOne = Player("X", true, playerOne);
    _playerTwo = Player("O", false, playerTwo);
  }

  const startGame = function() {
    // Starts the game, spawning the board and players
    Gameboard.displayBoard();
    _playerOne.displayName();
    _playerTwo.displayName();
  }

    // this function is called when a square is clicked
  const playerMove = function(index) {
    // if game has ended, don't let players make any moves
    if (_gameRunning === false) {
      return;
    }
    _playerOne.makeMove(index);
    _playerTwo.makeMove(index);
  }

  const checkWinner = function(marker) {
    const squares = Gameboard.getBoard();

    for (let pattern in _winningPatterns) {
      let winIndicator = true;
      // for each pattern containing array indices, check the
      // indices and see if all three have the same marker, if so,
      // then there is a winning pattern
      for (const index of _winningPatterns[pattern]) {
        if (squares[index] !== marker) {
          winIndicator = false;
          break;
        }
      }
      if (winIndicator === true) {
        return true;
      }
    }
    return false;
  }

  const declareWinner = function(playerName) {
    const info = document.querySelector(".info-box h1");
    info.textContent = `${playerName} wins!`;
    _gameRunning = false;
  }

  return {startGame, playerMove, checkWinner, setPlayerNames, declareWinner};
})();


// ------------------------------------------ //
// ------------------------------------------ //

const startScreen = (function () {

  const _screen = document.querySelector(".startScreen");
  const _start = document.querySelector("#start-button");

  _start.addEventListener('click', (e) => {
    e.preventDefault();
    const playerOne = document.querySelector("#playerOne").value;
    const playerTwo = document.querySelector("#playerTwo").value;
    hideStartScreen();
    gameController.setPlayerNames(playerOne, playerTwo)
    gameController.startGame();
  });

  const showStartScreen = function () {
    _screen.style.display = "auto";
  }

  const hideStartScreen = function () {
    _screen.style.display = "none";
  }

  return {showStartScreen, hideStartScreen};
})();
