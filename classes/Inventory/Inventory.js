class Inventory {
    constructor(player) {
        this.player = player;
        this.playerInventory = jsons[2].playerInventory;

        this.selectedSlot = player.selectedSlot;

        this.toggleTimer = 0;
        this.toggleDelay = 200; // milliseconds

        this.toggleDebounce = false;
        this.inventoryOpen = false;

        this.slotSize = 71.5;
        this.cols = 9;
        this.rows = 4;

        this.startX = this.player.position.x - width/5.3;
        this.startY = this.player.position.y + height/6;

        console.log(this.playerInventory);
    }

    getItemFromHotbar(slot) {
        if (slot < 0 || slot >= 9) return null;
        return this.playerInventory[slot];
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

            //render items inventory
            push();
            translate(width/2 + this.player.position.x, height/2 + this.player.position.y);
            for(let i = 0; i < 9; i++) {
                let id = this.playerInventory[i].id;
                let sprite = itemSprites[id];
                let quantity = this.playerInventory[i].quantity;
                
                // Skip if sprite not loaded yet
                if (!sprite) continue;
                let col = i % this.cols;
                let row = floor(i / this.cols);
                
                let x = this.startX + col * this.slotSize;
                
                let y = this.startY + row * this.slotSize;

                imageMode(CORNER);
                image(sprite, x, y, 64, 64);

                if (quantity > 0) {
                    fill(255);
                    textSize(16);
                    textAlign(RIGHT, BOTTOM);
                    text(quantity, x + this.slotSize - 10, y + this.slotSize-10);
                }

            }
            pop();

            push();
            translate(width/2 + this.player.position.x, height/2 + this.player.position.y);
            for(let i = 9; i < 36; i++) {
                let id = this.playerInventory[i].id;
                let sprite = itemSprites[id];
                let quantity = this.playerInventory[i].quantity;
                
                // Skip if sprite not loaded yet
                if (!sprite) continue;
                let col = i % this.cols;
                let row = floor(i / this.cols);
                
                let x = this.startX + col * this.slotSize;
                
                let y = (this.startY + row * this.slotSize) - height/3.1;

                imageMode(CORNER);
                image(sprite, x, y, 64, 64);

                if (quantity > 0) {
                    fill(255);
                    textSize(16);
                    textAlign(RIGHT, BOTTOM);
                    text(quantity, x + this.slotSize - 10, y + this.slotSize-10);
                }

            }
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
    }

    toggle() {
        if (!this.toggleDebounce) {
            this.toggleDebounce = true;
            this.inventoryOpen = !this.inventoryOpen;
        }
    }

}