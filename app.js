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
