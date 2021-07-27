let sprites;
let squareSize = 20;
let spriteSize = 150;
let nRowsSprites = 23;
let nColsSprites = 4;
let spriteRowIndex;
let spriteColIndex;
let nrows;
let canvasWidth = 800;
let canvasHeight = 1000;
let fontSize = 10;
let interReg;
let yMargin = 30;
let dayNames = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

function preload() {
  // interReg = loadFont('Inter-Regular.ttf');
  sprites = loadImage('sprites.png');
}

function setup() {
  // drawSprites(); return;

  nrows = 26;
  ncols = 14;

  canvasWidth = ncols*squareSize + 100;
  canvasHeight = nrows*squareSize + 100;
  createCanvas(canvasWidth, canvasHeight);

  // textFont(interReg);
  textSize(fontSize);

  for (var i = 0; i < nrows; i++) {
    for (var j = 0; j < ncols; j++) {
      spriteRowIndex = Math.floor(random(nRowsSprites));
      spriteColIndex = Math.floor(random(nColsSprites));

      image(sprites, squareSize*j, squareSize*i + yMargin, squareSize, squareSize, spriteColIndex*spriteSize, spriteRowIndex*spriteSize, spriteSize, spriteSize);
    }
  }
}

function labelCalendar() {
  textAlign(CENTER, BOTTOM);
  fill(0);
  rotate(PI/2);
  for (var i = 0; i < nrows; i++) {
    // note: x,y pos are swapped because of rotate
    text((2*(i+1)).toString(), i*squareSize + squareSize/2 + yMargin, -ncols*squareSize - 2);
  }

  rotate(-PI/2);
  resetMatrix();
  textAlign(CENTER, CENTER);
  for (var j = 0; j < ncols; j++) {
    text(dayNames[j % dayNames.length], j*squareSize + squareSize/2, 0.9*yMargin);
  }
}

function draw() {
  labelCalendar();
}

// function drawSprites() {
//   nrows = 23;
//   ncols = 4;

//   canvasWidth = ncols*squareSize;
//   canvasHeight = nrows*squareSize;
//   createCanvas(canvasWidth, canvasHeight);

//   for (var i = 0; i < nrows; i++) {    
//     for (var j = 0; j < ncols; j++) {
//       spriteRowIndex = Math.floor(random(nRowsSprites));
//       spriteColIndex = Math.floor(random(nColsSprites));
      
//       spriteRowIndex = i;
//       spriteColIndex = j;

//       console.log([i, j, spriteRowIndex, spriteColIndex, spriteRowIndex*spriteSize, spriteColIndex*spriteSize]);

//       image(sprites, squareSize*j, squareSize*i, squareSize, squareSize, spriteColIndex*spriteSize, spriteRowIndex*spriteSize, spriteSize, spriteSize);
//       noFill();
//       square(squareSize*j, squareSize*i, squareSize);
//     }
//   }
// }
