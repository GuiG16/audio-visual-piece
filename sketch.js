let video;
let handPose;
let hands = [];
let indexPreviousX;
let indexPreviousY;
let hue = 0;
let drawing = [];
let showVideo = true;
let sfx;

function preload() {
  sfx = loadSound('611475__jwsounddesign__woosh-long-cinematic.wav');
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function goHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  handPose.detectStart(video, goHands);

  colorMode(HSB, 360, 100, 100);

  strokeJoin(ROUND);
  strokeCap(ROUND);
}

function draw() {
    if (showVideo) {
    image(video, 0, 0);
  } else {
    background(0);
  }

  if (hands.length > 0) {

    let thumb = hands[0].thumb_tip;
    let index = hands[0].index_finger_tip;

    let d = dist(thumb.x, thumb.y, index.x, index.y);

    if (d < 20) {

      if (drawing.length == 0 ||
        dist(index.x, index.y,
          drawing[drawing.length - 1].x,
          drawing[drawing.length - 1].y) > 5) {

        drawing.push({
          x: index.x,
          y: index.y
        });

      }

      if (drawing.length > 200) {
        drawing.shift();
      }
    }
  }

  stroke(hue, 100, 100);
  strokeWeight(8);
  hue += 2;
  if (hue > 360) hue = 0;

  for (let i = 0; i < drawing.length - 1; i++) {
    line(drawing[i].x, drawing[i].y,
      drawing[i + 1].x, drawing[i + 1].y);
    }
}

function keyPressed() {
  if (key === 'v' || key === 'V') {
    showVideo = !showVideo;
    sfx.play();
  }
}