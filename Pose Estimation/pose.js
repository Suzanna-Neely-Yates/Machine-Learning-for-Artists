let video;
let poseNet;
let pose;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function modelLoaded() {
    console.log('poseNet ready')
}

function draw() {
    image(video, 0, 0);
    if (pose) {

        // Nose
        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, 50);

        // Left Eye
        fill(49, 57, 171)
        rect(pose.leftEye.x - 12, pose.rightEye.y - 20, 40, 40);

        // Right Eye
        fill(196, 82, 177)
        translate(pose.rightEye.x, pose.rightEye.y);
        noStroke();
        for (let i = 0; i < 10; i++) {
            ellipse(0, 10, 10, 40);
            rotate(PI / 5);
        }
    }
}

