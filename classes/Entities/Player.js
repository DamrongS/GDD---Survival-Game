class Player extends Entity {
    constructor(x, y, sprites) {
        super(x, y);

        this.playerConfigs = jsons[0];
        this.playerPrefs = jsons[1];

        this.idleSprite = sprites[0];
        this.walkSprite = sprites[1];

        this.sprite = this.idleSprite;
        this.itemSprite;

        this.state = "idle";
        this.frame = 0;
        this.frameWidth = 128;
        this.frameHeight = 128;

        this.animationFrameCount = 12;
        this.animationSpeed = 0.1;

        this.directionAngle = 3;
        this.speed = this.playerConfigs.playerSpeed;

        this.health = this.playerConfigs.playerHealth;
        this.maxHealth = this.playerConfigs.playerHealth;

        this.hunger = this.playerConfigs.playerHunger;
        this.maxHunger = this.playerConfigs.playerHunger;

        this.interacting = false;

        this.openInventory = false;
        this.inventoryOpen = false;

        this.selectedSlot = 0;
        this.holdingItem;

        this.healthBar = new Bar(healthBarSprites, this, createVector(width/2 + this.position.x, height/2 + this.position.y - 50));

        this.inventory = new Inventory(this);
        this.hotbar = new Hotbar(this, this.inventory);
    }

    render() {
        push();
        translate(width/2 + this.position.x, height/2 + this.position.y);

        let row = floor(this.directionAngle);
        let frameIndex = floor(this.frame);

        // Determine if item should be behind player
        let renderItemBehind = this.lookDirection.y < 0;

        if(this.itemSprite && renderItemBehind) {
            // Draw item behind the player
            image(this.itemSprite, this.lookDirection.x * 20, this.lookDirection.y * 20, 16, 16);
        }

        // Draw player sprite
        image(
            this.sprite, 
            0, 0, 
            this.frameWidth, this.frameHeight, 
            frameIndex * 64, row * 64, 64, 64
        );

        if(this.itemSprite && !renderItemBehind) {
            // Draw item in front of the player
            image(this.itemSprite, this.lookDirection.x * 20, this.lookDirection.y * 20, 16, 16);
        }

        pop();

        this.renderUI();
    }

    // For rendering the player in the world (e.g., in the minimap or inventory)
    renderSpriteUI(position, scale=1) {
        push()
        translate(position.x, position.y)
        let row = floor(this.directionAngle);
        let frameIndex = floor(this.frame);
        image(this.sprite, 0, 0, this.frameWidth * scale, this.frameHeight * scale, frameIndex * 64, row * 64, 64, 64);
        pop()
    }

    // health bar, hunger bar, inventory, etc.
    renderUI() {
        // Health bar
        this.healthBar.reposition(createVector(width/2 + this.position.x, height/2 + this.position.y - 50));
        this.healthBar.render();

        // Inventory
        this.inventory.render();
        this.hotbar.render();
    }

    update() {
        // Input handling
        // Inventory slot selection
        if (keyIsDown(this.playerPrefs.controls.slot1)) {
            this.selectedSlot = 0;
        } else if (keyIsDown(this.playerPrefs.controls.slot2)) {
            this.selectedSlot = 1;
        } else if (keyIsDown(this.playerPrefs.controls.slot3)) {
            this.selectedSlot = 2;
        } else if (keyIsDown(this.playerPrefs.controls.slot4)) {
            this.selectedSlot = 3;
        } else if (keyIsDown(this.playerPrefs.controls.slot5)) {
            this.selectedSlot = 4;
        } else if (keyIsDown(this.playerPrefs.controls.slot6)) {
            this.selectedSlot = 5;
        } else if (keyIsDown(this.playerPrefs.controls.slot7)) {
            this.selectedSlot = 6;
        } else if (keyIsDown(this.playerPrefs.controls.slot8)) {
            this.selectedSlot = 7;
        } else if (keyIsDown(this.playerPrefs.controls.slot9)) {
            this.selectedSlot = 8;
        }

        this.holdingItem = this.inventory.getItemFromHotbar(this.selectedSlot);

        this.itemSprite = itemSprites[this.holdingItem.id];

        // movement input
        let x = (keyIsDown(this.playerPrefs.controls.moveRight) || 0) - (keyIsDown(this.playerPrefs.controls.moveLeft) || 0);
        let y = (keyIsDown(this.playerPrefs.controls.moveDown) || 0) - (keyIsDown(this.playerPrefs.controls.moveUp) || 0);
        
        //interaction input
        this.interacting = keyIsDown(this.playerPrefs.controls.interact);
        console.log("Interacting: " + this.interacting);

        //inventory input
        if(keyIsDown(this.playerPrefs.controls.inventory)) {
            this.inventory.toggle();
        }

        this.moveDirection = createVector(x, y);
        if(this.moveDirection.mag() > 0) {
            this.lookDirection = this.moveDirection.copy().normalize();
        }

        if(this.moveDirection.mag() > 0) {
            this.animationFrameCount = 8;
            this.sprite = this.walkSprite;
            let angle = (atan2(this.moveDirection.y, -this.moveDirection.x) * 180 / PI);
            if(angle < 0) {
                angle += 360;
            }
            this.directionAngle = (round((angle+45) / 45) % 8);
        } else {
            this.animationFrameCount = 12;
            this.sprite = this.idleSprite;
        }

        if (this.moveDirection.mag() > 0) {
            this.moveDirection.normalize();
            this.position.add(this.moveDirection.copy().mult(this.speed));
        }

        this.frame = (this.frame + this.animationSpeed) % this.animationFrameCount;

        //UI
        this.healthBar.update();
        this.inventory.update(this.camera);
        this.hotbar.update(this.camera);
    }
}