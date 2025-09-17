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

    root.Enemy = Enemy;
})(window);