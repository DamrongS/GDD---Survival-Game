class World {
    constructor() {
        this.entityManager = new EntityManager();
        this.player = new Player(0, 0, playerSprites);
        this.camera = new Camera2D(this.player);

        this.entityManager.addEntity(this.player);

        this.renderables = [];
        for (let entity of this.entityManager.entities) {
            if (entity.render) {
                this.renderables.push(entity);
            }
        }
    }

    sortByYCoordinate() {
        this.renderables.sort(
            (a, b) =>
                (a.position.y + a.height) -
                (b.position.y + b.height)
        );
    }

    collectRenderables() {
        this.renderables = this.entityManager.entities.filter(
            entity => entity.render
        );
    }

    render() {
        this.camera.anchor(this.player);

        this.renderables.forEach(entity => {
            entity.render();
        });

        text("center", width / 2, height / 2);
    }

    physics() {
        
    }

    update() {
    this.entityManager.update();

    this.collectRenderables();
    this.sortByYCoordinate();

    this.camera.update(this.player);
}

}