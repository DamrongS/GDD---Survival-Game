class Inventory {
    constructor(player) {
        this.player = player;
        this.slots = new Array(20).fill(null);

        this.toggleTimer = 0;
        this.toggleDelay = 200; // milliseconds

        this.toggleDebounce = false;
        this.inventoryOpen = false;
    }

    render() {
        if (this.inventoryOpen) {
            push();
            translate(width/2 + this.player.position.x, height/2 + this.player.position.y);
            fill(50, 150);
            rectMode(CENTER);
            rect(0, 0, 400, 400);
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