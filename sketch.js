let myWorld;

let idleSprite;
let walkSprite;

function preload() {
    idleSprite = loadImage("sprites/Top-Down Asset Pack (Oct 2025)/idle/Sprite Sheet/idle full sprite sheet (transparent BG).png");
    walkSprite = loadImage("sprites/Top-Down Asset Pack (Oct 2025)/walk/Sprite Sheet/walk complete sprite sheet (transparent BG).png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  myWorld = new World();

}

function draw() {
  background(220);

  myWorld.update();
  myWorld.physics();
  myWorld.render();
}