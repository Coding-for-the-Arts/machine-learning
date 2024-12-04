let classifier;
let predictedClass = "";
let speed = 3;
let x;
let y;
let t = 0;

function preload() {
  classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/sjTtk16FD/");
}

function setup() {
  createCanvas(800,800);
  classifier.classifyStart(gotResult);
  textAlign(CENTER, CENTER);
  textSize(264);
}

function draw() {
  background(0);
  noStroke();
  if (predictedClass == "Background Noise") {
    for (var x = 0; x < width; x+=10) {
      for (var y = 0; y < height; y+=10) {
        var c = 255 * noise(0.01 * x, 0.01 * y, t) ;
        fill(c);
        rect(x, y, 10, 10);
      }		
    }
  t += 0.01;
  }else if (predictedClass == "Knock") {
    text("🪓", width / 2, height/2);
  }else if (predictedClass == "Goat") {
    text("🐐", width / 2, height/2);
  }

}

function gotResult(results) {
  console.log(results);
  predictedClass = results[0].label;
}
