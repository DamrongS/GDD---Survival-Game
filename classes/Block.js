class Block {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.sprite = loadImage("sprites/blocks/placeholder.png")

        imageMode(CENTER);
    }

    draw() {
        image(this.sprite, this.position.x, this.position.y, 128, 128);
    }

    update() {

    }

}