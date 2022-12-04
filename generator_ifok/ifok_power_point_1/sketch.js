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

var dragging = false; // Is the object being dragged?
var rollover = false; // Is the mouse over the ellipse?

var x, y, w, h; // Location and size
var offsetX, offsetY; // Mouseclick offset

// Hintergrundbild und Custom Schriftart vorab laden damit es sauber ist
function preload() {
  bentonsans_regular = loadFont('font/BentonSans-Regular.ttf');
  bentonsans_bold = loadFont('font/BentonSans-Bold.ttf');
  landscape = loadImage('images/background_1.jpg');
  logo = loadImage('images/opennrw_logo_weiss.png');
}

// viele Sachen die vorab definiert werden
function setup() {
  canvas = createCanvas(1200, 675);
  canvas.position(535, 35);
  pixelDensity(2);
  background(landscape);
  landscape.resize(1200, 675);

  // Starting location
  x = 700;
  y = 200;

  // Dimensions
  w = 300;
  h = 300;

  h1 = createElement('h1', 'Überschrift:');
  inputElem1 = createElement('textarea', 'Adipiscing elit, sed do eiusmod tempor inci');
  inputElem1.input(draw);
  inputElem1.size(350, 55);

  h2 = createElement('h2', 'Titel:');
  inputElem2 = createElement('textarea', 'Eusmod tempor incididunt ut labore et dolore magna aliqua. Tempor Ut enim Adminim veniam.');
  inputElem2.input(draw);
  inputElem2.size(350, 55);

  h2 = createElement('h3', 'Subtitel:');
  inputElem3 = createInput('Tempor Ut enimincididunt. ');
  inputElem3.input(draw);
  inputElem3.size(350, 15);

  h1 = createElement('h1', 'Grafik hochladen:');
  inputElement = createFileInput(handleFile);
  inputElement.size(250, 30);

  h3 = createElement('h3', 'Hier kann die Grafik runtergeladen werden');
  button1 = createButton('Grafik runterladen');
  button1.mousePressed(saveDrawing1);
}

function draw() {
  image(landscape, 0, 0);
  noFill();
  noStroke();
  rect(0, 0, 1200, 675);

  // Datum und Event Typ
  fill("white")
  textFont(bentonsans_regular);
  textLeading(35);
  textSize(27);
  textAlign(LEFT, TOP);
  text(inputElem1.value(), 42, 42, 620);

  // Event Titel
  fill("white")
  textFont(bentonsans_bold);
  textLeading(70);
  textSize(54);
  textAlign(LEFT, CENTER);
  text(inputElem2.value(), 42, height / 2, 610);

  // Sponsoring und andere Sachen
  fill("white")
  textFont(bentonsans_regular);
  textLeading(35);
  textSize(27);
  textAlign(LEFT, BOTTOM);
  text(inputElem3.value(), 42, 611, 800);

  var scale = 0.15;
  image(logo, 950, 50, scale * width, scale * logo.height * width / logo.width);

  if (userImage != null) {
    image(userImage, x, y, w, h);
  }

  // Is mouse over object
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } else {
    rollover = false;
  }

  // Adjust location if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
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

function mousePressed() {

  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    offsetX = x - mouseX;
    offsetY = y - mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}

function saveDrawing1() {
  saveCanvas('ifok_power_point', 'png');
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