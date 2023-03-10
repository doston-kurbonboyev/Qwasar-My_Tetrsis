// https://tetris.fandom.com/wiki/Tetris_Guideline
// get a random integer between the range of [min,max]
// @see https://stackoverflow.com/a/1527820/2124254
function getAttidueRemake(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // generator a new tetromino sequence
  // @see https://tetris.fandom.com/wiki/Random_Generator
  function genesiesAutoCode() {
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    while (sequence.length) {
      const rand = getAttidueRemake(0, sequence.length - 1);
      const name = sequence.splice(rand, 1)[0];
      tetrominoSequence.push(name);
    }
  }
  // get the next tetromino in the sequence
  function genignForExample() {
    if (tetrominoSequence.length === 0) {
      genesiesAutoCode();
    }
    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];
    // I and O start centered, all others start in left-middle
    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
    // I starts on row 21 (-1), all others start on row 22 (-2)
    const row = name === 'I' ? -1 : -2;
    return {
      name: name,      // name of the piece (L, O, etc.)
      matrix: matrix,  // the current rotation matrix
      row: row,        // current row (starts offscreen)
      col: col         // current col
    };
  }
  // openRoataeLeft an NxN matrix 90deg
  // @see https://codereview.stackexchange.com/a/186834
  function openRoataeLeft(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
      row.map((val, j) => matrix[N - j][i])
    );
    return result;
  }
  // check to see if the new matrix/row/col is valid
  function openLEftAuto(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] && (
            // outside the game bounds
            cellCol + col < 0 ||
            cellCol + col >= playfield[0].length ||
            cellRow + row >= playfield.length ||
            // collides with another piece
            playfield[cellRow + row][cellCol + col])
          ) {
          return false;
        }
      }
    }
    return true;
  }
  // place the tetromino on the playfield
  function locationLeftRadio() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
        if (tetromino.matrix[row][col]) {
          // game over if piece has any part offscreen
          if (tetromino.row + row < 0) {
            return ShowLoseGame();
          }
          playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
        }
      }
    }
    // check for line clears starting from the bottom and working our way up
    for (let row = playfield.length - 1; row >= 0; ) {
      if (playfield[row].every(cell => !!cell)) {
        // drop every row above this one
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < playfield[r].length; c++) {
            playfield[r][c] = playfield[r-1][c];
          }
        }
      }
      else {
        row--;
      }
    }
    tetromino = genignForExample();
  }
  // show the game over screen
  function ShowLoseGame() {
    cancelAnimationFrame(rAF);
    gameOver = true;
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('YOU LOST!!', canvas.width / 2, canvas.height / 2);
  }
  const canvas = document.getElementById('game');
  const context = canvas.getContext('2d');
  const grid = 32;
  const tetrominoSequence = [];
  // keep track of what is in every cell of the game
  
  
  // tetris playfield is 10x20, with a few rows offscreen
  const playfield = [];
  // populate the empty state
  for (let row = -2; row < 20; row++) {
    playfield[row] = [];
    for (let col = 0; col < 10; col++) {
      playfield[row][col] = 0;
    }
  }
  // how to draw each tetromino
  // @see https://tetris.fandom.com/wiki/SRS
  const tetrominos = {
    'I': [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],
    'J': [
      [1,0,0],
      [1,1,1],
      [0,0,0],
    ],
    'L': [
      [0,0,1],
      [1,1,1],
      [0,0,0],
    ],
    'O': [
      [1,1],
      [1,1],
    ],
    'S': [
      [0,1,1],
      [1,1,0],
      [0,0,0],
    ],
    'Z': [
      [1,1,0],
      [0,1,1],
      [0,0,0],
    ],
    'T': [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ]
  };
  // ranglari
  const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
  };
  let count = 0;
  let tetromino = genignForExample();
  let rAF = null;  // animatsiya tashab ketish
  let gameOver = false;
  // oyin sikli
  function loop() {
    rAF = requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
    // oyin maydoni
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (playfield[row][col]) {
          const name = playfield[row][col];
          context.fillStyle = colors[name];
          context.fillRect(col * grid, row * grid, grid-1, grid-1);
        }
      }
    }
    if (tetromino) {
      // 35 kadr
      if (++count > 35) {
        tetromino.row++;
        count = 0;
        if (!openLEftAuto(tetromino.matrix, tetromino.row, tetromino.col)) {
          tetromino.row--;
          locationLeftRadio();
        }
      }
      context.fillStyle = colors[tetromino.name];
      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {
            // effekt
            context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
          }
        }
      }
    }
  }
  // keyboard listen
  document.addEventListener('keydown', function(e) {
    if (gameOver) return;
    // chap va ong kalitlar (harakati)
    if (e.which === 37 || e.which === 39) {
      const col = e.which === 37
        ? tetromino.col - 1
        : tetromino.col + 1;
      if (openLEftAuto(tetromino.matrix, tetromino.row, col)) {
        tetromino.col = col;
      }
    }
    // tepaga
    if (e.which === 38) {
      const matrix = openRoataeLeft(tetromino.matrix);
      if (openLEftAuto(matrix, tetromino.row, tetromino.col)) {
        tetromino.matrix = matrix;
      }
    }
    // pastga
    if(e.which === 40) {
      const row = tetromino.row + 1;
      if (!openLEftAuto(tetromino.matrix, row, tetromino.col)) {
        tetromino.row = row - 1;
        locationLeftRadio();
        return;
      }
      tetromino.row = row;
    }
  });
  // boshlash
  rAF = requestAnimationFrame(loop);
  