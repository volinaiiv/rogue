(function (root) {
    "use strict";

    function Prop(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
    }

    /**
     * Возвращает CSS-класс для отображения объекта
     * @return {string} CSS-класс
     */
    Prop.prototype.getCssClass = function () {
        return this.type.css;
    };

    root.Prop = Prop;
})(window);
