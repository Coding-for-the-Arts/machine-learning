let bodyPose;
let poses = []
let connections;

function preload() {
  video = createVideo("./assets/street_540_960_25fps.mp4")
  video.hide()

  bodyPose = ml5.bodyPose(modelLoaded)
}

function setup() {
  createCanvas(540, 960);
  video.volume(0);
  video.play();
  video.loop();

  bodyPose.detectStart(video, gotPoses)
  connections = bodyPose.getSkeleton()
}

function draw() {
  background(0, 150)
  tint(255,127)
  image(video, 0, 0, width, height)
  filter(GRAY)
  push()
  translate(0, -height/2)
  scale(1.5)
  drawKeypoints()
  pop()
}

function modelLoaded() {
  console.log("Body Pose model loaded!")
}

function gotPoses(results) {
  poses = results
 // console.log(poses)
}

function drawKeypoints(){
  for (let i = 0; i<poses.length; i++){
    let pose = poses[i]
      if (pose.confidence > 0.45) {
      stroke("#34eb49")
      noFill()
      text("human", pose.box.xMin, pose.box.yMin - 20)
      text(nf(pose.confidence, 1, 4), pose.box.xMax -20 , pose.box.yMin -20)
      rect(pose.box.xMin, pose.box.yMin, pose.box.width, pose.box.height)
    }
    for (let j = 0; j< pose.keypoints.length; j++){
      let keypoint = pose.keypoints[j]
      let bodyPoint = new BodyPoint(keypoint.x, keypoint.y, keypoint.confidence, j)
      bodyPoint.drawKeypoint()
    }

    for (let j = 0; j< connections.length; j++){
      let pointAIndex = connections[j][0]
      let pointBIndex = connections[j][1]
      let pointA = pose.keypoints[pointAIndex]
      let pointB = pose.keypoints[pointBIndex]
      BodyPoint.drawSkeleton(pointA, pointB)
    }


  }
}
