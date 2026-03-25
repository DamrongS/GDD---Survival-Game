class Bar {
    constructor(sprites, entity, position) {
        this.entity = entity;
        this.position = position;

        this.emptySprite = sprites[0];
        this.healthSprite = sprites[1];

        this.pixels = {x: 0, y: 0, width: 111, height: 15/2};
        this.newSize = {width: 111, height: 15/2};

        this.healthPercentage = 0.1;
    }

    reposition(newPosition) {
        this.position = newPosition;
    }

    render() {
        push();
        translate(this.position.x, this.position.y);

        imageMode(CORNER);
        image(this.healthSprite, -111/2, -this.newSize.height/2, this.newSize.width * this.healthPercentage, this.newSize.height, this.pixels.x, this.pixels.y, this.pixels.width * this.healthPercentage, this.pixels.height);

        imageMode(CENTER);
        image(this.emptySprite, 0, 0, this.newSize.width, this.newSize.height, this.pixels.x, this.pixels.y, this.pixels.width, this.pixels.height);
        pop();
    }

    update() {
        this.healthPercentage = lerp(this.healthPercentage, this.entity.health / this.entity.maxHealth, 0.01 * deltaTime);
    }

}