(function (root) {
    "use strict";

    const cfg = root.gameConfig;

    function Game() {
        this.fieldElement = null;
        this.map = null;
        this.tileSize = 0;
    }

    Game.prototype.init = function () {
        this.fieldElement = document.querySelector('.field');

        this.map = new root.GameMap(cfg.mapWidth, cfg.mapHeight);
        this.map.generate();

        this.tileSize = this.calculateTileSize(cfg.mapWidth, cfg.mapHeight);

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
            frag.appendChild(node);
        }
        this.fieldElement.appendChild(frag);
    };

    Game.prototype.render = function () {
        this.clearField();

        this.renderGridLayer((x, y) => this.map.tiles[y][x].getCssClass());
        this.renderSpriteLayer(this.map.items);
        if (this.map.player) {
            this.renderSpriteLayer([this.map.player]);
        }
    };

    root.Game = Game;
})(window);
