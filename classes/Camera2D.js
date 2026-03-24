class Camera2D {
    constructor(target) {
        this.target = target;

        this.position = createVector(0, 0);

        this.boundaries = {
            x: [-100, 100],
            y: [-100, 100],
        };
    }

    update() {
        let targetPosition = this.target.position;

        this.position.x = lerp(
            this.position.x,
            targetPosition.x,
            0.1
        );

        this.position.y = lerp(
            this.position.y,
            targetPosition.y,
            0.1
        );
    }

    anchor() {
        translate(
            -this.position.x,
            -this.position.y
        );
    }

    getCameraPosition() {
        return this.position.copy();
    }
}