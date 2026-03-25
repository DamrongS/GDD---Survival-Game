class Player extends Entity {
    constructor(x, y, sprites) {
        super(x, y);

        this.playerConfigs = jsons[0];
        this.playerPrefs = jsons[1];

        this.idleSprite = sprites[0];
        this.walkSprite = sprites[1];

        this.sprite = this.idleSprite;

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

        this.healthBar = new Bar(healthBarSprites, this, createVector(width/2 + this.position.x, height/2 + this.position.y - 50));
    }

    render() {
        push()
        translate(width/2 + this.position.x, height/2 + this.position.y)

        let row = floor(this.directionAngle);
        let frameIndex = floor(this.frame);
        image(this.sprite, 0, 0, this.frameWidth, this.frameHeight, frameIndex * 64, row * 64, 64, 64);
        
        pop()

        this.renderUI();
    }

    // For rendering the player in the world (e.g., in the minimap or inventory)
    renderSpriteUI(position) {
        push()
        translate(position.x, position.y)
        let row = floor(this.directionAngle);
        let frameIndex = floor(this.frame);
        image(this.sprite, 0, 0, this.frameWidth, this.frameHeight, frameIndex * 64, row * 64, 64, 64);
        pop()
    }

    // health bar, hunger bar, inventory, etc.
    renderUI() {
        // Health bar
        this.healthBar.reposition(createVector(width/2 + this.position.x, height/2 + this.position.y - 50));
        this.healthBar.render();

        // Hunger bar
        push();

        pop();
    }

    update() {
        let x = (keyIsDown(this.playerPrefs.controls.moveRight) || 0) - (keyIsDown(this.playerPrefs.controls.moveLeft) || 0);
        let y = (keyIsDown(this.playerPrefs.controls.moveDown) || 0) - (keyIsDown(this.playerPrefs.controls.moveUp) || 0);
        this.moveDirection = createVector(x, y);

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
    }
}