class Hotbar {
    constructor(player, inventory) {
        this.player = player;
        this.inventory = inventory;

        this.playerInventory = this.inventory.playerInventory;

        this.dimensions = {
            width: 145*6,
            height: 16*6,
        }

        this.slotSize = 96.5;
        this.cols = 9;
        this.rows = 4;

        this.startX = this.player.position.x - width/3.85;
        this.startY = this.player.position.y + height/2.9;
    }

    render() {
        if(this.inventory.inventoryOpen) return;
        image(hotbarSprite, width/2 + this.player.camera.position.x, height/2 + this.player.camera.position.y + width/4.5, this.dimensions.width, this.dimensions.height);

        //render items inventory
            push();
            translate(width/2 + this.player.camera.position.x, height/2 + this.player.camera.position.y);
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
                image(sprite, x, y, 128/1.2, 128/1.2);

                if (quantity > 0) {
                    fill(255);
                    textSize(16);
                    textAlign(RIGHT, BOTTOM);
                    text(quantity, x + this.slotSize, y + this.slotSize);
                }
            }
            pop();

            push();
            translate(width/2 + this.player.camera.position.x, height/2 + this.player.camera.position.y);
            rectMode(CORNER);
            noFill();
            strokeWeight(10);
            stroke(255, 255, 0);
            rect(14+this.startX + this.player.selectedSlot * this.slotSize, 13+this.startY, this.slotSize-6, this.slotSize-6);
            pop();
    }

    update() {

    }

}