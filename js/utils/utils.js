(function (root) {
    "use strict";

    /**
     * Случайное целое в диапазоне [min, max]
     * @param {number} min минимальное значение
     * @param {number} max максимальное значение
     * @return {number} случайное число
     */
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Проверка пересечения прямоугольников (касание рёбрами — false)
     * @param {{x:number,y:number,w:number,h:number}} a первый прямоугольник
     * @param {{x:number,y:number,w:number,h:number}} b второй прямоугольник
     * @return {boolean} true если пересекаются
     */
    function rectsIntersect(a, b) {
        return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
    }

    /**
     * Перемешивает массив
     * @param {Array} arr массив для перемешивания
     * @return {Array} тот же массив, перемешанный
     */
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        return arr;
    }

    /**
     * Уникальные случайные числа в диапазоне
     * @param {number} count количество чисел
     * @param {number} min минимальное значение
     * @param {number} max максимальное значение
     * @return {number[]} массив уникальных чисел
     */
    function pickDistinctInts(count, min, max) {
        const all = [];
        for (let v = min; v <= max; v++) all.push(v);
        shuffleArray(all);
        return all.slice(0, Math.max(0, Math.min(count, all.length))).sort((a, b) => a - b);
    }

    root.utils = { randomInt, rectsIntersect, shuffleArray, pickDistinctInts };
})(window);
