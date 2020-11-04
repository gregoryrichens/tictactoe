console.log('it\'s working, it\'s working!');

// Model

// initialize localStorage
  // load stored values or empty string into html table
  // display or set player whose turn it is - x by default

var gameStorage = window.localStorage;

document.getElementById('one-one').innerHTML = gameStorage.getItem('one-one') || '';
document.getElementById('one-two').innerHTML = gameStorage.getItem('one-two') || '';
document.getElementById('one-three').innerHTML = gameStorage.getItem('one-three') || '';
document.getElementById('two-one').innerHTML = gameStorage.getItem('two-one') || '';
document.getElementById('two-two').innerHTML = gameStorage.getItem('two-two') || '';
document.getElementById('two-three').innerHTML = gameStorage.getItem('two-three') || '';
document.getElementById('three-one').innerHTML = gameStorage.getItem('three-one') || '';
document.getElementById('three-two').innerHTML = gameStorage.getItem('three-two') || '';
document.getElementById('three-three').innerHTML = gameStorage.getItem('three-three') || '';

gameStorage.getItem('playerTurn') ?
  console.log(`your move ${gameStorage.getItem('playerTurn')}`) :
  gameStorage.setItem('playerTurn', 'x');


// Controller

const tableChecker = function() {
  // diagonal one
  // if (gameStorage.getItem)
  // diagonal two
  // each row
  // each column
  //
};
  // row filler
    // if row is empty fill row based on turn
    // if row is filled send message 'please select an empty cell'
const rowFiller = function(e) {
  e.preventDefault();
  var cellNumber = e.target.id; //???????
  var cell = document.getElementById(cellNumber)
  var currentPlayer = gameStorage.getItem('playerTurn');
  if(cell.innerHTML === '') {
    // set element value equal to current player
    cell.innerHTML = currentPlayer;
    // add value to local storage
    gameStorage.setItem(cellNumber, currentPlayer);
    // if table checker is true
    if (tableChecker()) {
      document.getElementById('banner').innerHTML = `${currentPlayer} wins!`;
    } else {
      // else change current player in localStorage
      var nextPlayer = (currentPlayer === 'x' ? 'o' : 'x');
      gameStorage.setItem('playerTurn', nextPlayer);
    }
  } else {
    console.error('please select an empty cell');
  }
};

const resetTable = function(e) {
  e.preventDefault();
  // set value of every cell to ''
  document.getElementsByClassName('cell').innerHTML = '';
  // clear local storage
  gameStorage.clear();
  // set player to x
  gameStorage.setItem('playerTurn', 'x');
}

document.getElementsByClassName('cell').addEventListener('click', rowFiller(e));
document.getElementById('reset').addEventListener('click', resetTable(e));