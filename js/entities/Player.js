(function (root) {
    "use strict";

    function Player(x, y, maxHealth) {
        this.x = x;
        this.y = y;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
    }

    Player.prototype.getCssClass = function () {
        return "tileP";
    };

    Player.prototype.move = function (map, dx, dy) {
        const nx = this.x + dx;
        const ny = this.y + dy;
        if (!map.canMoveTo(map, nx, ny)) return false;
        this.x = nx;
        this.y = ny;
        return true;
    };

    Player.prototype.attack = function (map) {
        const dirs = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 }
        ];

        let totalRemoved = 0;
        for (let i = 0; i < dirs.length; i++) {
            const nx = this.x + dirs[i].dx;
            const ny = this.y + dirs[i].dy;
            if (!map.inBounds(nx, ny)) continue;
            totalRemoved += map.removeEnemiesAt(nx, ny);
        }
        return totalRemoved > 0;
    };

    Player.prototype.takeDamage = function (amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health;
    };

    root.Player = Player;
})(window);
