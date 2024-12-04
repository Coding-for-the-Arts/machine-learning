let keys = [];
let notes = ["C", "D", "E", "F", "G", "A", "B"];
let synth;
let handPose;
let video;
let hands = [];

let options = {
  maxHands: 2,
  flipped: true,
};

function preload() {
  handPose = ml5.handPose(options);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  handPose.detectStart(video, gotHands);

  synth = new p5.PolySynth();
  userStartAudio();

  // Create piano keys
  let keyWidth = (width - (notes.length - 1) * 50) / notes.length;
  for (let i = 0; i < notes.length; i++) {
    keys.push(
      new PianoKey(i * (keyWidth + 50), height / 4, keyWidth, height / 2, notes[i])
    );
  }
}

function draw() {
  background(0);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
      // Check if the fingertip is pressing on any key
      console.log(keypoint.name);
      if (keypoint.name === "middle_finger_tip" || keypoint.name === "index_finger_tip"
        || keypoint.name === "ring_finger_tip" || keypoint.name === "pinky_tip") {
       
        for (let k = 0; k < keys.length; k++) {
          if (keys[k].isHovered(keypoint.x, keypoint.y)) {
            keys[k].playNote(); 
          }
        }
      }
    }
  }
  for (let i = 0; i < keys.length; i++) {
    keys[i].display();
  }
}
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
