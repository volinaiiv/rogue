(function (root) {
    "use strict";

    function Enemy(x, y, maxHealth, damage) {
        this.x = x;
        this.y = y;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.attackDamage = damage;
    }

    Enemy.prototype.getCssClass = function () {
        return "tileE";
    };

    Enemy.prototype.takeDamage = function (amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health;
    };

    Enemy.prototype.tryAttack = function (map) {
        if (!map.player) return false;
        const dx = Math.abs(this.x - map.player.x);
        const dy = Math.abs(this.y - map.player.y);
        if (dx + dy === 1) {
            map.player.takeDamage(this.attackDamage);
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