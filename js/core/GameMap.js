(function (root) {
    "use strict";

    const cfg = root.gameConfig;
    const PropType = root.PropType;
    const Prop = root.Prop;
    const { randomInt, rectsIntersect, shuffleArray } = root.utils;

    function GameMap(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = [];
        this.rooms = [];
    }

    GameMap.prototype.init = function () {
        let y, x;
        this.tiles = new Array(this.height);
        for (y = 0; y < this.height; y++) {
            this.tiles[y] = new Array(this.width);
            for (x = 0; x < this.width; x++) {
                this.tiles[y][x] = new Prop(PropType.wall, x, y);
            }
        }

        this.rooms = [];
    };

    GameMap.prototype.inBounds = function (x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    GameMap.prototype.carveRect = function (x, y, w, h) {
        for (let j = y; j < y + h; j++) {
            for (let i = x; i < x + w; i++) {
                if (this.inBounds(i, j)) {
                    this.tiles[j][i] = new Prop(PropType.floor, i, j);
                }
            }
        }
    };

    GameMap.prototype.placeRooms = function () {
        const targetCount = randomInt(cfg.room.countMin, cfg.room.countMax);

        const candidates = [];
        for (let w = cfg.room.sizeMin; w <= cfg.room.sizeMax; w++) {
            for (let h = cfg.room.sizeMin; h <= cfg.room.sizeMax; h++) {
                for (let x = 0; x <= this.width - w; x++) {
                    for (let y = 0; y <= this.height - h; y++) {
                        candidates.push({ x, y, w, h });
                    }
                }
            }
        }

        shuffleArray(candidates);

        for (let k = 0; k < candidates.length && this.rooms.length < targetCount; k++) {
            const room = candidates[k];

            let overlaps = false;
            for (let i = 0; i < this.rooms.length; i++) {
                if (rectsIntersect(room, this.rooms[i])) { overlaps = true; break; }
            }
            if (overlaps) continue;

            this.carveRect(room.x, room.y, room.w, room.h);
            this.rooms.push(room);
        }
    };

    GameMap.prototype.generate = function () {
        this.init();
        this.placeRooms();
    };

    root.GameMap = GameMap;
})(window);
