class Inventory {
    constructor(player) {
        this.player = player;
        this.slots = new Array(36).fill(null);

        this.toggleTimer = 0;
        this.toggleDelay = 200; // milliseconds

        this.toggleDebounce = false;
        this.inventoryOpen = false;

        this.playerInventory = jsons[2].playerInventory;
        console.log(this.playerInventory);
    }

    updateSlots() {

    }

    render() {
        if (this.inventoryOpen) {
            push();
            translate(width/2 + this.player.position.x, height/2 + this.player.position.y);
            fill(50, 150);
            rectMode(CENTER);
            image(inventorySprite, 0, 0);
            this.player.renderSpriteUI(createVector(-width/11.5, -height/4.3), 4);
            pop();
        }
    }

    update() {
        if(this.toggleDebounce) {
            this.toggleTimer += deltaTime;
            if(this.toggleTimer >= this.toggleDelay) {
                this.toggleDebounce = false;
                this.toggleTimer = 0;
            }
        }

        this.updateSlots();
    }

    toggle() {
        if (!this.toggleDebounce) {
            this.toggleDebounce = true;
            this.inventoryOpen = !this.inventoryOpen;
        }
    }

}