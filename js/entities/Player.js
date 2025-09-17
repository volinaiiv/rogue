(function (root) {
    "use strict";

    const PropType = root.PropType;

    function Player(x, y, maxHealth, damage) {
        this.x = x;
        this.y = y;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.attackDamage = damage;
    }

    /**
     * CSS-класс для отображения игрока
     * @returns {string}
     */
    Player.prototype.getCssClass = function () {
        return "tileP";
    };

    /**
     * Двигает игрока по карте и обрабатывает предметы
     * @param {GameMap} map карта
     * @param {number} dx смещение по X
     * @param {number} dy смещение по Y
     * @returns {boolean} успешно ли переместился
     */
    Player.prototype.move = function (map, dx, dy) {
        const nx = this.x + dx;
        const ny = this.y + dy;
        if (!map.canMoveTo(map, nx, ny)) return false;
        this.x = nx;
        this.y = ny;

        const item = map.itemAt(this.x, this.y);
        if (item) {
            if (item.type === PropType.potion) {
                const heal = item.type.heal || 0;
                this.health = Math.min(this.maxHealth, this.health + heal);
                map.removeItemAt(this.x, this.y);
            } else if (item.type === PropType.sword) {
                const bonus = item.type.attackBonus || 0;
                this.attackDamage += bonus;
                map.removeItemAt(this.x, this.y);
            }
        }

        return true;
    };

    /**
     * Атака по соседним клеткам
     * @param {GameMap} map карта
     * @returns {boolean} был ли нанесён удар
     */
    Player.prototype.attack = function (map) {
        const dirs = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 }
        ];
        let hitSomeone = false;

        for (let i = 0; i < dirs.length; i++) {
            const nx = this.x + dirs[i].dx;
            const ny = this.y + dirs[i].dy;
            if (!map.inBounds(nx, ny)) continue;

            const enemy = map.enemyAt(nx, ny);
            if (!enemy) continue;

            enemy.takeDamage(this.attackDamage);
            if (enemy.health <= 0) {
                map.removeEnemiesAt(nx, ny);
            }
            hitSomeone = true;
        }

        return hitSomeone;
    };

    /**
     * Получение урона
     * @param {number} amount величина урона
     * @returns {number} текущее здоровье
     */
    Player.prototype.takeDamage = function (amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health;
    };

    root.Player = Player;
})(window);
