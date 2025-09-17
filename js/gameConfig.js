(function (root) {
    "use strict";
    root.gameConfig = {
        mapWidth: 40, // ширина карты в клетках
        mapHeight: 24, // высота карты в клетках
        room: {
            countMin: 5, // минимум комнат
            countMax: 10, // максимум комнат
            sizeMin: 3, // минимальная длина стороны
            sizeMax: 8, // максимальная длина стороны
        },
    };
})(window);
