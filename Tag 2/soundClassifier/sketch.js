let classifier;
let predictedWord = "";
let speed = 3;
let x;
let y;

function preload() {
  let options = { probabilityThreshold: 0.8 };
  classifier = ml5.soundClassifier("SpeechCommands18w", options);
}

function setup() {
  createCanvas(800,800);
  classifier.classifyStart(gotResult);
  x = width/2;
  y = height/2
}

function draw() {
  background(0);
  if (predictedWord !== "") {
    fill(211, 107, 255);
    textAlign(CENTER, CENTER);
    textSize(64);
    text(predictedWord, width / 2, 90);
  }
  //create a ball and control it with voice
  if (predictedWord === "up") {
    y -= speed;
  }else if (predictedWord === "down") {
    y += speed;
  }else if (predictedWord === "left") {
    x -= speed;
  }else if (predictedWord === "right") {
    x += speed;
  }else if (predictedWord === "stop") {
   //keep the ball at the same position
    x = x;
    y = y;
  }
  fill(255);
  circle(x,y,100);

}

function gotResult(results) {
  console.log(results);
  predictedWord = results[0].label;
}
