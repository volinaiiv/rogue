(function (root) {
    "use strict";

    function Enemy(x, y, maxHealth) {
        this.x = x;
        this.y = y;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
    }

    Enemy.prototype.getCssClass = function () {
        return "tileE";
    };

    Enemy.prototype.tryAttack = function (map, damage) {
        if (!map.player) return false;
        const dx = Math.abs(this.x - map.player.x);
        const dy = Math.abs(this.y - map.player.y);
        if (dx + dy === 1) {
            map.player.takeDamage(damage);
            return true;
        }
        return false;
    };

    Enemy.prototype.tryMoveRandom = function (map) {
        const dirs = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 }
        ];

        const start = Math.floor(Math.random() * dirs.length);
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[(start + i) % dirs.length];
            const nx = this.x + dir.dx;
            const ny = this.y + dir.dy;
            if (!map.canMoveTo(map, nx, ny)) return false;
            this.x = nx;
            this.y = ny;
            return true;
        }
        return false;
    };

    root.Enemy = Enemy;
})(window);