(function (root) {
    "use strict";

    const cfg = root.gameConfig;

    function GameMap(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = [];
    }

    GameMap.prototype.init = function () {
        let y, x;
        this.tiles = new Array(this.height);
        for (y = 0; y < this.height; y++) {
            this.tiles[y] = new Array(this.width);
            for (x = 0; x < this.width; x++) {
                this.tiles[y][x] = 'W';
            }
        }
    };

    GameMap.prototype.generate = function () {
        this.init();
    };

    root.GameMap = GameMap;
})(window);
