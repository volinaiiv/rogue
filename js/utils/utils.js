(function (root) {
    "use strict";

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function rectsIntersect(a, b) {
        return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        return arr;
    }

    function pickDistinctInts(count, min, max) {
        const all = [];
        for (let v = min; v <= max; v++) all.push(v);
        shuffleArray(all);
        return all.slice(0, Math.max(0, Math.min(count, all.length))).sort((a, b) => a - b);
    }

    root.utils = { randomInt, rectsIntersect, shuffleArray, pickDistinctInts };
})(window);
