const gameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const makeMove = (index, marker) => {
    if (board[index] === '') {
      board[index] = marker;
      return true;
    }
    return false;
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

    return false;
  };

  const restart = () => {
    gameBoard.clearBoard();
    currentPlayer = playerOne;
    gameOver = false;
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

  return {
    playerOne,
    playerTwo,
    currentPlayer,
    switchPlayer,
    checkForWinner,
    gameOver,
    restart,
    renderBoard,
  };
})();
