class World {
    constructor() {
        this.entityManager = new EntityManager();
        this.player = new Player(0, 0, [idleSprite, walkSprite]);
        this.camera = new Camera2D(this.player);

        this.entityManager.addEntity(this.player);
    }

    render() {
        this.entityManager.render();

        this.camera.anchor(this.player);
        text("center", width/2, height/2);
    }

    physics() {
        
    }

    update() {
        this.entityManager.update();

        this.camera.update(this.player);
    }

}