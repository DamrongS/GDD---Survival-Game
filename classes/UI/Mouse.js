class Mouse {
    constructor(camera, spriteSheet) {
        this.camera = camera;
        this.spriteSheet = spriteSheet;

        this.prevState = "idle";
        this.state = "idle";
        
        this.states = {
            "idle": {x: 0, y: 0, width: 12, height: 12},
            "clickable": {x: 12, y: 0, width: 12, height: 12},
            "draggable": {x: 24, y: 0, width: 12, height: 12},
            "dragging": {x: 36, y: 0, width: 12, height: 12}
        }

        this.position = createVector(mouseX, mouseY);
        this.clicked = false;

        noCursor();
    }

    setState(newState) {
        if(this.state === newState) return;
        if(this.clicked && this.state === "dragging") return;

        this.prevState = this.state;
        this.state = newState;
    }

    render() {
        push();

        imageMode(CORNER);

        // grade the image color, if the mouse is clicked, make it darker, otherwise normal
        if(this.clicked) {
            tint(150, 255);
            if(this.state == "draggable") {
                this.setState("dragging");
            }
        } else {
            tint(255, 255);
        }

        // If the state exists in the states object, use that, otherwise default to idle
        if(this.states[this.state]) {
            image(this.spriteSheet, (this.camera.position.x + this.position.x)-6, (this.camera.position.y + this.position.y)-6, 32, 32, this.states[this.state].x, this.states[this.state].y, this.states[this.state].width, this.states[this.state].height);
        } else {
            image(this.spriteSheet, (this.camera.position.x + this.position.x)-6, (this.camera.position.y + this.position.y)-6, 32, 32, this.states["idle"].x, this.states["idle"].y, this.states["idle"].width, this.states["idle"].height);
        }

        pop();
    }

    update() {
        this.position.set(mouseX, mouseY);
        this.clicked = mouseIsPressed;

        if(this.clicked) {
            this.setState("click");
        } else {
            this.setState("idle");
        }
    }

}