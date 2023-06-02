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

const player = (name, marker, score) => {
  const getName = () => name;
  const getMarker = () => marker;
  const getScore = () => score;
  const increaseScore = () => score++;
  const resetScore = () => (score = 0);
  return { getName, getMarker, getScore, increaseScore, resetScore };
};

const game = (() => {
  const playerOne = player('Player 1', 'X', 0);
  const playerTwo = player('Player 2', 'O', 0);
  let currentPlayer = playerOne;
  let gameOver = false;
  let rounds = 0;

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
    playerOne.resetScore();
    playerTwo.resetScore();
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

  const updateScore = (winner) => {
    if (winner === 'X') {
      score.playerX++;
    } else if (winner === 'O') {
      score.playerO++;
    }
  };

  const incrementRounds = () => {
    rounds++;
  };

  return {
    playerOne,
    playerTwo,
    currentPlayer,
    switchPlayer,
    checkForWinner,
    gameOver,
    rounds,
    restart,
    renderBoard,
    handleSqclick,
    incrementRounds,
    updateScore,
  };
})();

// DOM Elements
const mainBoard = document.getElementById('main-board');
const resetBtn = document.getElementById('reset');
const playerDisplay = document.getElementById('player-display');
playerDisplay.textContent = game.currentPlayer.getName();
const player1Score = document.querySelector('.p1-score+span');

const player2Score = document.querySelector('.p2-score+span');

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
        playerDisplay.textContent = 'O wins! Player 2 is the champion';
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
