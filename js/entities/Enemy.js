(function (root) {
    "use strict";

    function Enemy(x, y) {
        this.x = x;
        this.y = y;
    }

    Enemy.prototype.getCssClass = function () {
        return "tileE";
    };

    root.Enemy = Enemy;
})(window);