console.log('it\'s working, it\'s working!');
console.log(document);

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
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

  // function to check for any winning combinations - could probably optimize this
  var tableChecker = function() {
    // diagonal one
    if ((document.getElementById('one-one').innerHTML !== '') &&
      (document.getElementById('one-one').innerHTML === document.getElementById('two-two').innerHTML &&
      document.getElementById('two-two').innerHTML === document.getElementById('three-three').innerHTML)) {
        return true;
    }
    // diagonal two
    if ((document.getElementById('one-three').innerHTML !== '') &&
      (document.getElementById('one-three').innerHTML === document.getElementById('two-two').innerHTML &&
      document.getElementById('two-two').innerHTML === document.getElementById('three-one').innerHTML)) {
        return true;
    }
    // each row
    if ((document.getElementById('one-one').innerHTML !== '') &&
      (document.getElementById('one-one').innerHTML === document.getElementById('one-two').innerHTML &&
      document.getElementById('one-two').innerHTML === document.getElementById('one-three').innerHTML)) {
        return true;
    }
    if ((document.getElementById('two-one').innerHTML !== '') &&
      (document.getElementById('two-one').innerHTML === document.getElementById('two-two').innerHTML &&
      document.getElementById('two-two').innerHTML === document.getElementById('two-three').innerHTML)) {
        return true;
    }
    if ((document.getElementById('three-one').innerHTML !== '') &&
      (document.getElementById('three-one').innerHTML === document.getElementById('three-two').innerHTML &&
      document.getElementById('three-two').innerHTML === document.getElementById('three-three').innerHTML)) {
        return true;
    }
    // each column
    if ((document.getElementById('one-one').innerHTML !== '') &&
      (document.getElementById('one-one').innerHTML === document.getElementById('two-one').innerHTML &&
      document.getElementById('two-one').innerHTML === document.getElementById('three-one').innerHTML)) {
        return true;
    }
    if ((document.getElementById('one-two').innerHTML !== '') &&
      (document.getElementById('one-two').innerHTML === document.getElementById('two-two').innerHTML &&
      document.getElementById('two-two').innerHTML === document.getElementById('three-two').innerHTML)) {
        return true;
    }
    if ((document.getElementById('one-three').innerHTML !== '') &&
      (document.getElementById('one-three').innerHTML === document.getElementById('two-three').innerHTML &&
      document.getElementById('two-three').innerHTML === document.getElementById('three-three').innerHTML)) {
        return true;
    }
    return false;
    //
  };

  // click handler for filling rows
  var rowFiller = function(e) {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.id);
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

  let allCells = document.getElementsByClassName('cell');

  var resetTable = function(e) {
    e.preventDefault();
    // set value of every cell to ''
    for (let i = 0; i < allCells.length; i++) {
      allCells[i].innerHTML = '';
    }
    //clear banner
    document.getElementById('banner').innerHTML = '';
    // clear local storage
    gameStorage.clear();
    // set player to x
    gameStorage.setItem('playerTurn', 'x');
  }

  // add event listener to all cells for togglings pieces
  for (let i=0; i < allCells.length; i++) {
    allCells[i].addEventListener('click', rowFiller);
  }

  // add event listener for reset button to clear the board
  document.getElementById('reset').addEventListener('click', resetTable);

});