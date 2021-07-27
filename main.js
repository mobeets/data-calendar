
let spriteImage = 'sprites-50.png';
let spriteSize = 50;
let nrowsSpritesO = 13;
let nrowsSpritesX = 10;
let ncolsSprites = 4;
let nrows = 26;
let ncols = 14;
let d;
let dayNames = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

function toggleClick() {

  if ($(this).data('isChecked')) {
    $(this).css('background', "url('" + spriteImage + "') -" + $(this).data('y-index')*spriteSize.toString() + "px -" + $(this).data('x-index')*spriteSize + "px");
    $(this).data('isChecked', false);
  } else {
    var yRand = Math.round(nrowsSpritesX*Math.random());
    var yIndex = nrowsSpritesO + yRand;
    console.log([yRand, yIndex]);

    $(this).css('background', "url('" + spriteImage + "') -" + yIndex*spriteSize.toString() + "px -" + $(this).data('x-index')*spriteSize.toString() + "px");
    $(this).data('isChecked', true);
  }
}

function main() {

  for (var j = 0; j < ncols; j++) {
    d = document.createElement('div');
    $(d).html(dayNames[j % dayNames.length])
      .addClass('block').addClass('block-column-title')
      .appendTo('#calendar');
  }

  for (var i = 0; i < nrows; i++) {
    for (var j = 0; j < ncols; j++) {

      var yIndex = Math.round(nrowsSpritesO*Math.random());
      var xIndex = Math.round(ncolsSprites*Math.random());

      d = document.createElement('div');
      $(d).html('&nbsp;')
        .css('background', "url('" + spriteImage + "') -" + yIndex*spriteSize.toString() + "px -" + xIndex*spriteSize.toString() + "px")
        .data('x-index', xIndex)
        .data('y-index', yIndex)
        .data('isChecked', false)
        .addClass('block').addClass('block-item')
        .click(toggleClick)
        .appendTo('#calendar');
    }
	}
}

$(document).ready(main);
