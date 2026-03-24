class World {
    constructor() {
        this.player = new Player(0, 0, [idleSprite, walkSprite]);
        this.camera = new Camera2D(this.player);

        this.entities = [];
        this.entities.push(this.player);
    }

    render() {
        for(let thisEntity of this.entities) {
            thisEntity.draw();
        }

        this.camera.anchor(this.player);
        text("gg", width/2, height/2);
    }

    physics() {
        
    }

    update() {
        for(let thisEntity of this.entities) {
            thisEntity.update();
        }

        this.camera.update(this.player);
    }

}