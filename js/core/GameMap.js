(function (root) {
    "use strict";

    const cfg = root.gameConfig;
    const PropType = root.PropType;
    const Prop = root.Prop;
    const { randomInt, rectsIntersect, shuffleArray, pickDistinctInts } = root.utils;

    function GameMap(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = [];
        this.rooms = [];
        this.items = [];
        this.player = null;
        this.enemies = [];
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
        this.items = [];
        this.player = null;
        this.enemies = [];
    };

    GameMap.prototype.inBounds = function (x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    GameMap.prototype.isFloor = function (x, y) {
        return this.inBounds(x, y) && this.tiles[y][x].type === PropType.floor;
    };

    GameMap.prototype.itemAt = function (x, y) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].x === x && this.items[i].y === y) return this.items[i];
        }
        return null;
    };

    GameMap.prototype.enemyAt = function (x, y) {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].x === x && this.enemies[i].y === y) return this.enemies[i];
        }
        return null;
    };

    GameMap.prototype.isOccupied = function (x, y) {
        if (this.itemAt(x, y)) return true;
        else if (this.enemyAt(x, y)) return true;
        else if (this.player && this.player.x === x && this.player.y === y) return true;
        return false;
    };

    GameMap.prototype.canMoveTo = function (map, x, y) {
        return map.inBounds(x, y) && map.isFloor(x, y) && !map.enemyAt(x, y);
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

    GameMap.prototype.findEmptyFloorCell = function () {
        const total = this.width * this.height;
        const start = randomInt(0, total - 1);
        for (let step = 0; step < total; step++) {
            const idx = (start + step) % total;
            const x = idx % this.width;
            const y = Math.floor(idx / this.width);
            if (this.isFloor(x, y) && !this.isOccupied(x, y)) {
                return { x, y };
            }
        }
        return null;
    };

    GameMap.prototype.placeCorridors = function () {
        const hCount = randomInt(cfg.corridors.horizontalMin, cfg.corridors.horizontalMax);
        const vCount = randomInt(cfg.corridors.verticalMin, cfg.corridors.verticalMax);

        const rows = pickDistinctInts(hCount, 0, this.height - 1);
        const cols = pickDistinctInts(vCount, 0, this.width - 1);

        for (let i = 0; i < rows.length; i++) {
            for (let x = 0; x < this.width; x++) {
                this.tiles[rows[i]][x] = new Prop(PropType.floor, x, rows[i]);
            }
        }

        for (let j = 0; j < cols.length; j++) {
            for (let y = 0; y < this.height; y++) {
                this.tiles[y][cols[j]] = new Prop(PropType.floor, cols[j], y);
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

    GameMap.prototype.placeItems = function () {
        for (let i = 0; i < cfg.items.swords; i++) {
            const cell = this.findEmptyFloorCell();
            if (!cell) break;
            this.items.push(new Prop(PropType.sword, cell.x, cell.y));
        }

        for (let i = 0; i < cfg.items.potions; i++) {
            const cell = this.findEmptyFloorCell();
            if (!cell) break;
            this.items.push(new Prop(PropType.potion, cell.x, cell.y));
        }
    };

    GameMap.prototype.placePlayer = function () {
        const cell = this.findEmptyFloorCell();
        if (cell) {
            this.player = new Player(cell.x, cell.y, cfg.player.maxHealth, cfg.player.attackDamage);
        }
    };

    GameMap.prototype.placeEnemies = function () {
        this.enemies = [];
        const count = cfg.enemies;
        for (let i = 0; i < count; i++) {
            const cell = this.findEmptyFloorCell();
            if (!cell) break;
            this.enemies.push(new Enemy(cell.x, cell.y, cfg.enemy.maxHealth, cfg.enemy.attackDamage));
        }
    };

    GameMap.prototype.removeEnemiesAt = function (x, y) {
        let removed = 0;
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            if (this.enemies[i].x === x && this.enemies[i].y === y) {
                this.enemies.splice(i, 1);
                removed++;
            }
        }
        return removed;
    };

    GameMap.prototype.removeItemAt = function (x, y) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].x === x && this.items[i].y === y) {
                return this.items.splice(i, 1)[0];
            }
        }
        return null;
    };

    GameMap.prototype.generate = function () {
        this.init();
        this.placeCorridors();
        this.placeRooms();
        this.placeItems();
        this.placePlayer();
        this.placeEnemies();
    };

    root.GameMap = GameMap;
})(window);
