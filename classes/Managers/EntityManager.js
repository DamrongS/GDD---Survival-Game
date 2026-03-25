class EntityManager {
    constructor() {
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    update() {
        for (const entity of this.entities) {
            entity.update();
        }
    }

    render() {
        for (const entity of this.entities) {
            entity.render();
        }
    }

}