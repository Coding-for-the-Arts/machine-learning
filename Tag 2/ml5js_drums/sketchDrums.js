let drumSamples = [];
let sounds = [];
let handPose;
let hands = [];
let video;
let clash;
let hihat;
let kick;
let snare;
let splash;
let tom;
let angle;
let diameter = 500;

let options = {
  maxHands: 2,
  flipped: true,
};

function preload() {
  handPose = ml5.handPose(options);
  clash = loadSound("./drums/Clash.wav");
  hihat = loadSound("./drums/Hi-Hat.wav");
  kick = loadSound("./drums/Kick.wav");
  snare = loadSound("./drums/Snare.wav");
  splash = loadSound("./drums/Splash.wav");
  tom = loadSound("./drums/Tom.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  handPose.detectStart(video, gotHands);
  userStartAudio();

  sounds = [clash, hihat, kick, snare, splash, tom]; 
  for (let i = 0; i < sounds.length; i++) {
    drumSamples.push(new DrumKey(0,0, 200, sounds[i]));
  }
  angle = PI;
}

function draw() {
  background(0);

  for (let j = 0; j < drumSamples.length; j++) {
    let i = angle + (TWO_PI / sounds.length) * j;
    let x = diameter / 2 * Math.cos(i) + width / 2;
    let y = diameter / 2 * Math.sin(i) + height / 2;
    drumSamples[j].updatePosition(x, y);
  }
  
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);

      // Check if the fingertip is pressing on any drumy
      if (keypoint.name === "index_finger_tip") {
        for (let k = 0; k < drumSamples.length; k++) {
          console.log(drumSamples[k]);
          if (drumSamples[k].isHovered(keypoint.x, keypoint.y)) {
            drumSamples[k].playSound(); 
          }
        }
      }
    }
  }
}

function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
