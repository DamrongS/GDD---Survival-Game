let myWorld;

let playerSprites = [];
let healthBarSprites = [];
let mouseSpriteSheet;
let inventorySprite;
let hotbarSprite;

let jsons = [];
let itemsRegistry;
let itemData = {};
let itemSprites = {};

function preload() {
  playerSprites.push(loadImage("sprites/Top-Down Asset Pack (Oct 2025)/idle/Sprite Sheet/idle full sprite sheet (transparent BG).png"));
  playerSprites.push(loadImage("sprites/Top-Down Asset Pack (Oct 2025)/walk/Sprite Sheet/walk complete sprite sheet (transparent BG).png"));

  healthBarSprites.push(loadImage("sprites/Health Bar Asset Pack 2 by Adwit Rahman/redblue2.png"));
  healthBarSprites.push(loadImage("sprites/Health Bar Asset Pack 2 by Adwit Rahman/redblue.png"));

  mouseSpriteSheet = loadImage("sprites/Micro Icon Pack/Sprite Sheet (10x10).png");
  inventorySprite = loadImage("sprites/GUI/Inventory.png");
  hotbarSprite = loadImage("sprites/GUI/Hotbar.png");

  jsons.push(loadJSON("Saves/playerConfigs.json"));
  jsons.push(loadJSON("Saves/playerPrefs.json"));
  jsons.push(loadJSON("Saves/playerInventory.json"));

  itemsRegistry = loadJSON("Data/Definitions/Items/Items.json");
}

function loadAllItems() {
    for (let itemName in itemsRegistry) {
        let fileName = itemsRegistry[itemName];

        let path = "Data/Definitions/Items/" + fileName;
        loadJSON(path, (data) => {
          // JSON is now fully loaded
          itemData[itemName] = data;
          if (data.texture) {
            let texturePath = "sprites/Items/" + data.texture;
            console.log("Loading item sprite:", texturePath);

            loadImage(texturePath, (img) => {
              itemSprites[data.id] = img; console.log("Sprite loaded:", data.id);
            }, (err) => {
              console.error("FAILED IMAGE:", texturePath);
            });
            
          }
        }, (err) => {
          console.error("FAILED JSON:", path);
        });
    }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  loadAllItems();

  myWorld = new World();
}

function draw() {
  background(220);

  myWorld.update();
  myWorld.physics();
  myWorld.render();
}