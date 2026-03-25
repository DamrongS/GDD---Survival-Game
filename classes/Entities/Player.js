class Player extends Entity {
    constructor(x, y, sprites) {
        super(x, y);

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
        this.speed = 2;
    }

    render() {
        push()
        translate(width/2, height/2)

        let row = floor(this.directionAngle);
        let frameIndex = floor(this.frame);
        image(this.sprite, 0, 0, this.frameWidth, this.frameHeight, frameIndex * 64, row * 64, 64, 64);
        
        pop()
    }

    renderUI(position) {
        push()
        translate(position.x, position.y)
        let row = floor(this.directionAngle);
        let frameIndex = floor(this.frame);
        image(this.sprite, 0, 0, this.frameWidth, this.frameHeight, frameIndex * 64, row * 64, 64, 64);
        pop()
    }

    update() {
        let x = (keyIsDown(RIGHT_ARROW) || 0) - (keyIsDown(LEFT_ARROW) || 0);
        let y = (keyIsDown(DOWN_ARROW) || 0) - (keyIsDown(UP_ARROW) || 0);
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
    }
}