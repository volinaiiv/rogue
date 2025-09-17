(function (root) {
    "use strict";
    root.PropType = {
        wall: {
            css: 'tileW'
        },
        floor: {
            css: 'tile'
        },
        sword:  {
            css: 'tileSW',
            attackBonus: 10,
        },
        potion: {
            css: 'tileHP',
            heal: 30
        },
    };
})(window);
