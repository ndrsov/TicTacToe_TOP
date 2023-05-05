const gameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const makeMove = (index, marker) => {
    if (board[index] === '') {
      board[index] = marker;
      return true;
    }
  };

  const clearBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  return { getBoard, makeMove, clearBoard };
})();

const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const game = (() => {
  const playerOne = player('Player 1', 'X');
  const playerTwo = player('Player 2', 'O');
  let currentPlayer = playerOne;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const checkForWinner = () => {
    const board = gameBoard.getBoard();

    // Check rows
    for (let i = 0; i <= 6; i += 3) {
      if (
        board[i] !== '' &&
        board[i] === board[i + 1] &&
        board[i] === board[i + 2]
      ) {
        return board[i];
      }
    }

    // Check columns
    for (let i = 0; i <= 2; i++) {
      if (
        board[i] !== '' &&
        board[i] === board[i + 3] &&
        board[i] === board[i + 6]
      ) {
        return board[i];
      }
    }

    // Check diagonals
    if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
      return board[0];
    }
    if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
      return board[2];
    }

    // Check for tie
    if (!board.includes('')) {
      return 'tie';
    }
  };

  const restart = () => {
    gameBoard.clearBoard();
    currentPlayer = playerOne;
    playerDisplay.textContent = currentPlayer.getName();
  };

  const renderBoard = () => {
    const board = gameBoard.getBoard();
    board.forEach((el) => {
      const square = document.createElement('button');
      square.textContent = el;
      square.classList.add('square');
      mainBoard.appendChild(square);
    });
  };

  const handleSqclick = (index) => {
    const board = gameBoard.getBoard();
    if (!board[index] && !checkForWinner()) {
      const marker = currentPlayer.getMarker();
      gameBoard.makeMove(index, marker);
      squaresEvents[index].textContent = marker;
      switchPlayer();
      playerDisplay.textContent = currentPlayer.getName();
    }
  };

  return {
    playerOne,
    playerTwo,
    currentPlayer,
    switchPlayer,
    checkForWinner,
    gameOver,
    restart,
    renderBoard,
    handleSqclick,
  };
})();

// DOM Elements
const mainBoard = document.getElementById('main-board');
const resetBtn = document.getElementById('reset');
const playerDisplay = document.getElementById('player-display');
playerDisplay.textContent = game.currentPlayer.getName();

game.renderBoard();

const squaresEvents = document.querySelectorAll('.square');

squaresEvents.forEach((btns, i) => {
  btns.addEventListener('click', () => {
    game.handleSqclick(i);
    game.checkForWinner();
    const result = game.checkForWinner();
    switch (result) {
      case 'X':
        playerDisplay.textContent = 'X wins! Player 1 is the champion';
        break;
      case 'O':
        playerDisplay.textContent = '0 wins! Player 2 is the champion';
        break;
      case 'tie':
        playerDisplay.textContent = 'Draw! Nobogy winds';
        break;
      default:
        break;
    }
  });
});

resetBtn.addEventListener('click', () => {
  game.restart();
  squaresEvents.forEach((el) => (el.textContent = ''));
});
