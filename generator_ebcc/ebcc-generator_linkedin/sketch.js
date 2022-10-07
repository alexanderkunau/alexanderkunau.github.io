// verschiedene Variablen deklarieren zum späteren benutzen
var landscape;
let logo;
let garnett;
let inputElement;
let userImage;
var canvas;

let inputElem1;
let inputElem2;
let inputElem3;
let inputElem4;


// Hintergrundbild und Custom Schriftart vorab laden damit es sauber ist
function preload() {
  garnett = loadFont('font/Garnett-Regular.ttf');
  landscape = loadImage('images/banner.jpg');
  logo = loadImage('images/ebc_logo.png');
}

// viele Sachen die vorab definiert werden
function setup() {
  canvas = createCanvas(1200, 675);
  canvas.position(535, 35);
  pixelDensity(3);
  background(landscape);
  landscape.resize(1200, 675);

  h1 = createElement('h1', 'Type of Event:');
  inputElem1 = createElement('textarea', 'Monday March  21st: From 15:00-15:45 Webinar');
  inputElem1.input(draw);
  inputElem1.size(350, 55);

  h2 = createElement('h2', 'Title:');
  inputElem2 = createElement('textarea', 'Guidelines for Blockchain and DLT Governance');
  inputElem2.input(draw);
  inputElem2.size(350, 55);

  h2 = createElement('h3', 'Subtitle:');
  inputElem3 = createInput('- the new standard explained');
  inputElem3.input(draw);
  inputElem3.size(350, 15);

  h2 = createElement('h3', 'Sponsoring:');
  inputElem4 = createInput('');
  inputElem4.input(draw);
  inputElem4.size(350, 15);

  h1 = createElement('h1', 'Upload Sponsor Logo (PNG)');
  inputElement = createFileInput(handleFile);
  inputElement.size(250, 30);

  h3 = createElement('h3', 'Here you can download the image as PNG');
  button1 = createButton('Download Image');
  button1.mousePressed(saveDrawing1);
}

function draw() {
  // Custom Schriftart
  textFont(garnett);

  image(landscape, 0, 0);
  noFill();
  rect(0, 0, 1200, 675);

  // Datum und Event Typ
  fill("white")
  textLeading(40);
  textSize(32);
  textAlign(LEFT, TOP);
  text(inputElem1.value(), 42, 42, 620);

  // Event Titel
  fill("white")
  textLeading(99);
  textSize(96);
  textAlign(LEFT, CENTER);
  text(inputElem2.value(), 42, height / 2, 1170);

  // Sponsoring und andere Sachen
  fill("white")
  textSize(54);
  textAlign(LEFT, BOTTOM);
  text(inputElem3.value(), 42, 611, 800);

  fill("white")
  textSize(20);
  textAlign(LEFT, BOTTOM);
  text(inputElem4.value(), 42, 633, 600);

  var scale = 0.22;
  image(logo, 886, 51, scale * width, scale * logo.height * width / logo.width);

  if (userImage != null) {
    var scale = 0.2;
    image(userImage, 190, 594, scale * width, scale * userImage.height * width / userImage.width);
  }
}


function handleFile(file) {
  print(file);

  if (file.type === 'image') {
    userImage = createImg(file.data, '');
    userImage.hide();
  } else {
    userImage = null;
  }
}

function saveDrawing1() {
  saveCanvas('ebcc-event-linkedin', 'png');
}

// function saveDrawing2() {
//   saveCanvas('ebcc-veranstaltung', 'jpg');
// }

// Speicher Methode durch einen Tastendruck
//function keyTyped() {
//  if (key === '-') {
//    saveCanvas('ebcc-veranstaltung', 'jpg');
//  }
//}