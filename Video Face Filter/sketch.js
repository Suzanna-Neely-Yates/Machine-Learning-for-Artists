let faceapi;
let img;
let detections;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
};


function preload() {
    // img = loadImage("assets/jojosiwa.jpg");
    img = loadImage("https://yt3.ggpht.com/ytc/AKedOLR-qZGb0dXFeNRrJn2vPCAEncm1N4aaj24hg2YdVA=s900-c-k-c0x00ffffff-no-rj")
    // img = loadImage("assets/lee-miller.jpg");
}

function setup() {
    createCanvas(600, 600);
    img.resize(width, height);

    faceapi = ml5.faceApi(detection_options, modelReady);
    textAlign(RIGHT);
}

function modelReady() {
    console.log("ready!");
    console.log(faceapi);
    faceapi.detectSingle(img, gotResults);
}

function gotResults(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    // console.log(result)
    detections = result;

    // background(220);
    background(255);
    tint(255, 126);
    image(img, 0, 0, width, height);
    if (detections) {
        // console.log(detections)
        // drawBox(detections)
        drawLandmarks(detections);
    }
}

// function drawBox(detections) {
//   const alignedRect = detections.alignedRect;
//   const { _x, _y, _width, _height } = alignedRect._box;
//   noFill();
//   stroke(161, 95, 251);
//   strokeWeight(2);
//   rect(_x, _y, _width, _height);
// }

function drawGoogly(cx, cy) {
    var tx = 0;
    var ty = 0;
    for (var i = 0; i < cx.length; i++) {
        tx += cx[i];
        ty += cy[i];
    }
    var cy = ty / cy.length;
    var cx = tx / cx.length;
    // draw a googly eye
    stroke(0);
    fill(255);
    circle(cx + random(-11, 11), cy + random(-10, 10), 55);
    fill(0);
    circle(cx, cy, 33);
}

function drawLandmarks(detections) {
    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);

    push();
    // mouth
    // beginShape();
    // detections.parts.mouth.forEach(item => {
    //     vertex(item._x, item._y)
    // })
    // endShape(CLOSE);

    // nose
    // beginShape();
    // detections.parts.nose.forEach(item => {
    //     vertex(item._x, item._y)
    // })
    // endShape(CLOSE);

    // left eye
    cx = [];
    cy = [];
    beginShape();
    detections.parts.leftEye.forEach((item) => {
        vertex(item._x, item._y);
        cx.push(item._x),
            cy.push(item._y)
    });
    endShape(CLOSE);
    drawGoogly(cx, cy);

    // right eye
    cx = [];
    cy = [];
    beginShape();
    detections.parts.rightEye.forEach((item) => {
        vertex(item._x, item._y),
            cx.push(item._x),
            cy.push(item._y)
    });
    endShape(CLOSE)
    drawGoogly(cx, cy);

    // right eyebrow
    // beginShape();
    // detections.parts.rightEyeBrow.forEach(item => {
    //     vertex(item._x, item._y)
    // })
    // endShape();

    // left eyebrow
    // beginShape();
    // detections.parts.leftEyeBrow.forEach(item => {
    //     vertex(item._x, item._y)
    // })
    // endShape();

    pop();
}