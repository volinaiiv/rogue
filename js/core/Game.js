(function (root) {
    "use strict";

    const cfg = root.gameConfig;

    function Game() {
        this.fieldElement = null;
        this.map = null;
        this.tileSize = 0;
        this._onKeyDown = null;
    }

    Game.prototype.init = function () {
        this.fieldElement = document.querySelector('.field');

        this.map = new root.GameMap(cfg.mapWidth, cfg.mapHeight);
        this.map.generate();

        this.tileSize = this.calculateTileSize(cfg.mapWidth, cfg.mapHeight);
        this.bindControls();
        this.render();
    };

    Game.prototype.calculateTileSize = function (width, height) {
        const field = this.fieldElement;
        const tileWidth = Math.floor(field.clientWidth / width);
        const tileHeight = Math.floor(field.clientHeight / height);
        const tile = Math.max(1, Math.min(tileWidth, tileHeight));
        field.style.width = (tile * width) + 'px';
        field.style.height = (tile * height) + 'px';
        return tile;
    };

    Game.prototype.clearField = function () {
        const field = this.fieldElement;
        while (field.firstChild) field.removeChild(field.firstChild);
    };

    Game.prototype.createTileNode = function (x, y, cssClass) {
        const node = document.createElement('div');
        node.classList.add('tile');
        if (cssClass && cssClass !== 'tile') node.classList.add(cssClass);

        node.style.width = this.tileSize + 'px';
        node.style.height = this.tileSize + 'px';
        node.style.left = (x * this.tileSize) + 'px';
        node.style.top = (y * this.tileSize) + 'px';
        return node;
    };

    Game.prototype.renderGridLayer = function (getCssClassAt) {
        const frag = document.createDocumentFragment();
        for (let y = 0; y < this.map.height; y++) {
            for (let x = 0; x < this.map.width; x++) {
                const css = getCssClassAt(x, y);
                const node = this.createTileNode(x, y, css);
                frag.appendChild(node);
            }
        }
        this.fieldElement.appendChild(frag);
    };

    Game.prototype.renderSpriteLayer = function (list) {
        if (!list || !list.length) return;
        const frag = document.createDocumentFragment();
        for (let i = 0; i < list.length; i++) {
            const obj = list[i];
            const node = this.createTileNode(obj.x, obj.y, obj.getCssClass());
            if (typeof obj.health === 'number' && typeof obj.maxHealth === 'number' && obj.maxHealth > 0) {
                const bar = document.createElement('div');
                bar.className = 'health';
                const pct = Math.max(0, Math.min(100, Math.round((obj.health / obj.maxHealth) * 100)));
                bar.style.width = pct + '%';
                node.appendChild(bar);
            }
            frag.appendChild(node);
        }
        this.fieldElement.appendChild(frag);
    };

    Game.prototype.enemiesAct = function () {
        for (let i = 0; i < this.map.enemies.length; i++) {
            const e = this.map.enemies[i];
            const hitBefore = e.tryAttack(this.map);
            if (!hitBefore) {
                e.tryMoveRandom(this.map);
                e.tryAttack(this.map);
            }
        }
    };

    Game.prototype.render = function () {
        this.clearField();

        this.renderGridLayer((x, y) => this.map.tiles[y][x].getCssClass());
        this.renderSpriteLayer(this.map.items);
        this.renderSpriteLayer(this.map.enemies);
        if (this.map.player) {
            this.renderSpriteLayer([this.map.player]);
        }
    };

    Game.prototype.bindControls = function () {
        if (this._onKeyDown) return;
        this._onKeyDown = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this._onKeyDown);
    };

    Game.prototype.onKeyDown = function (e) {
        if (!this.map.player) return;
        let dx = 0, dy = 0;
        switch (e.code) {
            case 'KeyW': dy = -1; break;
            case 'KeyA': dx = -1; break;
            case 'KeyS': dy = 1;  break;
            case 'KeyD': dx = 1;  break;
            case 'Space':
                e.preventDefault();
                if (this.map.player.attack(this.map)) this.render();
                return;
            default: return;
        }
        const moved = this.map.player.move(this.map, dx, dy);
        if (moved) {
            this.enemiesAct();
            this.render();
        }
    };

    root.Game = Game;
})(window);
