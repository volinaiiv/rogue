(function (root) {
    "use strict";

    function Player(x, y) {
        this.x = x;
        this.y = y;
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

    root.Player = Player;
})(window);
