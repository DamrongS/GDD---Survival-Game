class Button {
    constructor(x, y, width, height, label, onClick) {
        this.position = createVector(x, y);
        this.width = width;
        this.height = height;
        this.label = label;
        this.onClick = onClick;
        this.hovered = false;
    }

    render() {
        push();
        translate(this.position.x, this.position.y);
        rectMode(CENTER);
        fill(this.hovered ? 200 : 255);
        rect(0, 0, this.width, this.height, 5);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(16);
        text(this.label, 0, 0);
        pop();
    }

    update() {
        this.hovered = mouseX > this.position.x - this.width / 2 &&
                       mouseX < this.position.x + this.width / 2 &&
                       mouseY > this.position.y - this.height / 2 &&
                       mouseY < this.position.y + this.height / 2;
        if (this.hovered && mouseIsPressed) {
            this.onClick();
        }
    }
}