
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
  console.log($(this));

  var overlay = $(this).children('.block-item-overlay').eq(0);
  if ($(this).data('isChecked')) {
    // $(this).css('background', "url('" + spriteImage + "') -" + ($(this).data('x-index')*spriteSize).toString() + "px -" + ($(this).data('y-index')*spriteSize).toString() + "px");
    overlay.css('background', '');
    $(this).data('isChecked', false);
  } else {
    var yIndex = nrowsSpritesO + Math.round((nrowsSpritesX-1)*Math.random()); // choose random row for X
    overlay.css('background', "url('" + spriteImage + "') -" + ($(this).data('x-index')*spriteSize).toString() + "px -" + (yIndex*spriteSize).toString() + "px");
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

      var yIndex = Math.round((nrowsSpritesO-1)*Math.random());
      var xIndex = Math.round((ncolsSprites-1)*Math.random());

      d = document.createElement('div');
      $(d).html('&nbsp;')
        .css('background', "url('" + spriteImage + "') -" + (xIndex*spriteSize).toString() + "px -" + (yIndex*spriteSize).toString() + "px")
        .data('x-index', xIndex)
        .data('y-index', yIndex)
        .data('isChecked', false)
        .addClass('block').addClass('block-item')
        .click(toggleClick)
        .appendTo('#calendar');
      d2 = document.createElement('div');
      $(d2).html('&nbsp;')
        .addClass('block-item-overlay').appendTo(d);
    }
	}
}

$(document).ready(main);
