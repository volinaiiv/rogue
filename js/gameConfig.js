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
        corridors: {
            horizontalMin: 3, // минимальное число горизонтальных коридоров
            horizontalMax: 5, // максимальное число горизонтальных коридоров
            verticalMin: 3, // минимальное число вертикальных коридоров
            verticalMax: 5, // максимальное число вертикальных коридоров
        },
        items: {
            swords: 2, // мечи
            potions: 10, // зелья
        },
        enemies: 10, // количество врагов
        player: {
            maxHealth: 100
        },
        enemy: {
            maxHealth: 100,
            attackDamage: 10
        }
    };
})(window);
