let facemesh;
let video;
let predictions = [];
const pointsToConnect = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];

// 左眼與右眼的索引
const leftEyeIndices = [33, 160, 158, 133, 153, 144, 145, 153];
const rightEyeIndices = [263, 387, 385, 362, 380, 373, 374, 380];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    stroke(128, 0, 128); // 紫色
    strokeWeight(5); // 線條粗細為 5
    noFill();

    const keypoints = predictions[0].scaledMesh;

    // 繪製嘴巴
    beginShape();
    for (let i = 0; i < pointsToConnect.length; i++) {
      const index = pointsToConnect[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 繪製左眼（橘色）
    fill(255, 165, 0); // 橘色
    noStroke();
    for (let i = 0; i < leftEyeIndices.length; i++) {
      const index = leftEyeIndices[i];
      const [x, y] = keypoints[index];
      ellipse(x, y, 5, 5); // 實體圓形，直徑為 5
    }

    // 繪製右眼（藍色）
    fill(0, 0, 255); // 藍色
    noStroke();
    for (let i = 0; i < rightEyeIndices.length; i++) {
      const index = rightEyeIndices[i];
      const [x, y] = keypoints[index];
      ellipse(x, y, 5, 5); // 實體圓形，直徑為 5
    }
  }
}



