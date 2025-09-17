(function (root) {
    "use strict";

    function Player(x, y) {
        this.x = x;
        this.y = y;
    }

    Player.prototype.getCssClass = function () {
        return "tileP";
    };

    root.Player = Player;
})(window);
