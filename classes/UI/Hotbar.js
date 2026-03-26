class Hotbar {
    constructor(player, inventory) {
        this.player = player;
        this.inventory = inventory;

        this.hotbar = new Array(9).fill(null);
        for(let i = 0; i < 9; i++) {
            this.hotbar[i] = this.inventory.slots[i];
        }

        this.dimensions = {
            width: 145*6,
            height: 16*6,
        }
    }

    render() {
        if(this.inventory.inventoryOpen) return;
        image(hotbarSprite, width/2 + this.player.camera.position.x, height/2 + this.player.camera.position.y + width/4.5, this.dimensions.width, this.dimensions.height);
    }

    update() {
        for(let i = 0; i < 9; i++) {
            this.hotbar[i] = this.inventory.slots[i];
        }
    }

}