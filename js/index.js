(function () {
    "use strict";

    /**
     * Загружает скрипты последовательно и вызывает колбэк по завершении
     * @param {string[]} files массив путей к скриптам
     * @param {Function} done колбэк после загрузки всех скриптов
     */
    function loadScriptsInOrder(files, done) {
        let i = 0;
        function next() {
            if (i >= files.length) return done();
            const s = document.createElement('script');
            s.src = files[i++];
            s.onload = next;
            s.onerror = function () { console.error('Ошибка загрузки', s.src); };
            document.head.appendChild(s);
        }
        next();
    }

    document.addEventListener('DOMContentLoaded', function () {
        loadScriptsInOrder([
            'js/gameConfig.js',
            'js/enums/PropType.js',
            'js/entities/Prop.js',
            "js/entities/Player.js",
            "js/entities/Enemy.js",
            'js/utils/utils.js',
            'js/core/GameMap.js',
            'js/core/Game.js'
        ], function () {
            var game = new Game();
            game.init();
            window.game = game;
        });
    });
})();
