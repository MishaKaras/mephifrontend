"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function distance(a, b, c, d) {
    if (typeof a === 'number' && typeof b === 'number' && c !== undefined && d !== undefined) {
        return Math.sqrt((c - a) ** 2 + (d - b) ** 2);
    }
    else if (typeof a === 'object' && typeof b === 'object') {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }
    throw new Error('Неверные аргументы');
}
//# sourceMappingURL=task4.js.map