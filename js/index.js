(function () {
    "use strict";

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
            'js/Game.js'
        ], function () {
            var game = new Game();
            game.init();
            window.game = game;
        });
    });
})();
