let myWorld;

let playerSprites = [];
let healthBarSprites = [];
let mouseSpriteSheet;
let inventorySprite;
let hotbarSprite;

let jsons = [];

function preload() {
  playerSprites.push(loadImage("sprites/Top-Down Asset Pack (Oct 2025)/idle/Sprite Sheet/idle full sprite sheet (transparent BG).png"));
  playerSprites.push(loadImage("sprites/Top-Down Asset Pack (Oct 2025)/walk/Sprite Sheet/walk complete sprite sheet (transparent BG).png"));

  healthBarSprites.push(loadImage("sprites/Health Bar Asset Pack 2 by Adwit Rahman/redblue2.png"));
  healthBarSprites.push(loadImage("sprites/Health Bar Asset Pack 2 by Adwit Rahman/redblue.png"));

  mouseSpriteSheet = loadImage("sprites/Micro Icon Pack/Sprite Sheet (10x10).png");
  inventorySprite = loadImage("sprites/GUI/Inventory.png");
  hotbarSprite = loadImage("sprites/GUI/Hotbar.png");

  jsons.push(loadJSON("Data/playerConfigs.json"));
  jsons.push(loadJSON("Data/playerPrefs.json"));
  jsons.push(loadJSON("Data/playerInventory.json"));
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