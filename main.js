let data = [];
let spriteImage = 'sprites-50.png';
let spriteSize = 50;
let nrowsSpritesO = 13;
let nrowsSpritesX = 10;
let ncolsSprites = 4;
let N_DEFAULT = 26*14;
let NCOLS_DEFAULT = 14;
let ncols;
let dayNames = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
// let dayNames = ['S', '', '', '', '', '', ''];

// https://github.com/evanplaice/jquery-csv/
isFileAPIAvailable = function () {
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    return true;
  } else {
    // source: File API availability - http://caniuse.com/#feat=fileapi
    // source: <output> availability - http://html5doctor.com/the-output-element/
    document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
    // 6.0 File API & 13.0 <output>
    document.writeln(' - Google Chrome: 13.0 or later<br />');
    // 3.6 File API & 6.0 <output>
    document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
    // 10.0 File API & 10.0 <output>
    document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
    // ? File API & 5.1 <output>
    document.writeln(' - Safari: Not supported<br />');
    // ? File API & 9.2 <output>
    document.writeln(' - Opera: Not supported');
    return false;
  }
}

// https://github.com/evanplaice/jquery-csv/
function handleDialog(event) {
  var files = event.target.files;
  var file = files[0];

  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event){
    var csv = event.target.result;
    data = $.csv.toArrays(csv);    
    draw(data);
  }
}

function toggleClick() {

  var overlay = $(this).children('.block-item-overlay').eq(0);
  if ($(this).data('isChecked')) {
    overlay.css('background', '');
    $(this).data('isChecked', false);
  } else {
    var yIndex = nrowsSpritesO + Math.round((nrowsSpritesX-1)*Math.random()); // choose random row for X
    overlay.css('background', "url('" + spriteImage + "') -" + ($(this).data('x-index')*spriteSize).toString() + "px -" + (yIndex*spriteSize).toString() + "px");
    $(this).data('isChecked', true);
  }
}

function draw(data) {
  console.log(data);
  $('#calendar').empty();

  ncols = NCOLS_DEFAULT;
  var n = data.length;
  if (n < 1) {
    n = N_DEFAULT;
  }

  // get date from first row
  if (data.length > 0) {
    var firstDate = new Date(data[0][0]);
    var firstDayOfWeek = firstDate.getDay();
  } else {
    var firstDayOfWeek = 0;
  }

  for (var j = 0; j < ncols; j++) {
    d = document.createElement('div');
    $(d).html(dayNames[(firstDayOfWeek + j) % dayNames.length])
      .addClass('block').addClass('block-column-title')
      .appendTo('#calendar');
  }

  for (var i = 0; i < n; i++) {
    var isChecked;
    if (i < data.length) {
      isChecked = parseInt(data[i][1]) > 0;
    } else {
      isChecked = false;
    }

    var yIndex;
    var yIndex = Math.round((nrowsSpritesO-1)*Math.random());
    var xIndex = Math.round((ncolsSprites-1)*Math.random());
    
    var d = document.createElement('div');
    $(d).html('&nbsp;')
      .css('background', "url('" + spriteImage + "') -" + (xIndex*spriteSize).toString() + "px -" + (yIndex*spriteSize).toString() + "px")
      .data('x-index', xIndex)
      .data('y-index', yIndex)
      .data('isChecked', isChecked)
      .addClass('block').addClass('block-item')
      .click(toggleClick)
      .appendTo('#calendar');
    var overlay = document.createElement('div');
    $(overlay).html('&nbsp;')
      .addClass('block-item-overlay').appendTo(d);

    if (isChecked) {
      var yIndexX = nrowsSpritesO + Math.round((nrowsSpritesX-1)*Math.random());
      $(overlay).css('background', "url('" + spriteImage + "') -" + (xIndex*spriteSize).toString() + "px -" + (yIndexX*spriteSize).toString() + "px");
    }
  }
}

function main() {

  draw(data);
  if(isFileAPIAvailable()) {
    $('#files').bind('change', handleDialog);
  }

}

$(document).ready(main);
