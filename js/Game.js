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

    Game.prototype.render = function () {
        const field = this.fieldElement;
        let y, x, tile;

        while (field.firstChild) { field.removeChild(field.firstChild); }

        for (y = 0; y < this.map.height; y++) {
            for (x = 0; x < this.map.width; x++) {
                tile = document.createElement('div');
                tile.className = 'tile tileW';
                tile.style.width = this.tileSize + 'px';
                tile.style.height = this.tileSize + 'px';
                tile.style.left = (x * this.tileSize) + 'px';
                tile.style.top  = (y * this.tileSize) + 'px';
                field.appendChild(tile);
            }
        }
    };

    root.Game = Game;
})(window);
