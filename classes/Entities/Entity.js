class Entity {
    constructor(x, y) {
        this.position = createVector(x, y);

        this.rotation = 0;
        this.rotationTarget = 0;
        this.moveDirection = createVector(0, 0);
        this.speed = 1;

        this.sprite;

        rectMode(CENTER);
    }

    render() {
        push()
        translate(x, y)
        if(this.moveDirection.mag() > 0) {
            this.rotationTarget = atan2(this.moveDirection.y, this.moveDirection.x);
        }

        let diff = this.rotationTarget - this.rotation;

        diff = atan2(sin(diff), cos(diff));

        this.rotation += diff * 0.1;

        rotate(this.rotation);

        if(this.sprite) {
            image(this.sprite, 0, 0)
        } else {
            rect(0, 0, 32, 32);
        }
        
        pop()
    }

    update() {
        this.moveDirection = createVector(x, y);
        this.position.add(this.moveDirection.normalize().mult(this.speed));
    }

    setSprite(sprite) {
        this.sprite = loadImage(sprite);
    }

}