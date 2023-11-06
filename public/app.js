//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on('connect', () => {
    console.log("Connected");
});

// p5 code------------------------------------------------------------------
let imgW;
let imgH;
let myR;
let myG;
let myB;

function preload() {
    sec1 = loadImage('templates/Section1_temp.png');
    sec2 = loadImage('templates/Section2_temp.png');
    sec3 = loadImage('templates/Section3_temp.png');
}

function setup() {

    imgW = 500;
    imgH = 600;
    let canvas = createCanvas(imgW, imgH);
    canvas.parent('canvasForHTML');

    // createCanvas(window.innerWidth,window.innerHeight);
    myR = random(255);
    myG = random(255);
    myB = random(255);

    //without connection to dom-- templates shown altogether
    image(sec1, 0, 0, 500, 200);

    image(sec2, 0, 200 , 500, 200);

    image(sec3, 0, 400, 500, 200);

    // // image url -> dom --- error undefined:1 GET http://localhost:3000/undefined 404 (Not Found)
    // let dispSec1 = document.getElementById('img1');
    // dispSec1.src = image(sec1, 0, 0, 500, 200);

    // let dispSec2 = document.getElementById('img2');
    // dispSec2.src = image(sec2, 0, 200 , 500, 200);

    // let dispSec3 = document.getElementById('img3');
    // sec3.resize(500,200);
    // dispSec3.src = image(sec3, 0, 400, 500, 200);


    // // image url -> dom
    // let dispSec1 = document.getElementById('img1');
    // dispSec1.src = sec1;

    // let dispSec2 = document.getElementById('img2');
    // dispSec2.src = sec2;

    // let dispSec3 = document.getElementById('img3');
    // dispSec3.src = sec3;

    //inside setup is a good place
    //Listen for a message named 'data' from the server
    socket.on('dataAll', (obj) => {
        console.log(obj);
        drawPos(obj);
    });

}

function mouseDragged() {
    //grab mouse position
    let mousePos = { x1: pmouseX, y1: pmouseY, x2: mouseX, y2: mouseY, r: myR, g: myG, b: myB };
    socket.emit('data', mousePos);
}

function keyPressed() {
    if (key === '1') {
        imgW = 500;
        imgH = 200;
        resizeCanvas(imgW, imgH);
        image(sec1, 0, 0, imgW, imgH);
    }
    if (key === '2') {
        imgW = 500;
        imgH = 200;
        resizeCanvas(imgW, imgH);
        image(sec2, 0, 0, imgW, imgH);
    }
    if (key === '3') {
        imgW = 500;
        imgH = 200;
        resizeCanvas(imgW, imgH);
        image(sec3, 0, 0, imgW, imgH);
    }
}



//Expects an object with x and y properties
function drawPos(pos) {
    line(pos.x1, pos.y1, pos.x2, pos.y2);
    stroke(pos.r, pos.g, pos.b);
    strokeWeight(4);
}

// function windowResized() {
//     imgW = document.getElementById('img').width;
//     imgH = document.getElementById('img').height;
//     resizeCanvas(imgW, imgH)
//     // background(0, 199, 40, 30)
// }