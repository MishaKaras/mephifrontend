function task1() {
    const input = prompt("Введите натуральные числа через запятую:");
    if (input === null || input === "") return;

    const numbers = input.split(",").map(Number);
    const isValid = numbers.every(n => Number.isInteger(n) && n > 0);
    if (!isValid) {
        alert("Все введенные значения должны быть натуральными числами!");
        return;
    }
    const sorted = numbers.sort((a, b) => a - b);
    alert(sorted.join(", "));
}

function task2() {
    const input = prompt("Введите натуральные числа через запятую:");
    if (input === null || input === "") return;

    const numbers = input.split(",").map(Number);
    const isValid = numbers.every(n => Number.isInteger(n) && n > 0);
    if (!isValid) {
        alert("Все введенные значения должны быть натуральными числами!");
        return;
    }
    const remainders = numbers.map(n => n % 5);
    alert(remainders.join(", "));
}

function median(...args) {
    const sorted = [...args].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
        return sorted[mid];
    }
}

function task3() {
    const input = prompt("Введите числа через запятую:");
    if (input === null || input === "") return;

    const numbers = input.split(",").map(Number);
    if (numbers.some(n => isNaN(n))) {
        alert("Все введенные значения должны быть числовыми!");
        return;
    }
    const result1 = median(1, 2, 3, 4, 5);

    const result2 = median(...numbers);

    alert(
    `Способ 1 (фиксированные аргументы 1,2,3,4,5): ${result1}
    Способ 2 (из введённого массива): ${result2}`
    );
}

function task4() {
    const input = prompt("Введите скобочную строку, например: (())()\nДопустимы только символы ( и )");
    if (input === null || input === "") return;

    const stack = [];

    for (const char of input) {
        if (char === "(") {
            stack.push(char);
        } else if (char === ")") {
            if (stack.length === 0) {
                alert("Неправильная");
                return;
            }
            stack.pop();
        }
        else {
            alert("Неверный ввод: строка должна содержать только символы ( и )");
            return;
        }
    }
    alert(stack.length === 0 ? "Правильная" : "Неправильная");
}

function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        const newArray = [];
        for (let i = 0; i < obj.length; i++) {
            newArray[i] = deepCopy(obj[i]);
        }
        return newArray;
    }

    const copy = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}

function task5() {
    const original = {
        name: "Иван",
        age: 20,
        address: {
            street: "Б. Якиманка",
            building: "10"
        },
        hobbies: ["чтение", "программирование", ["шахматы", "шашки"]]
    };

    const copy = deepCopy(original);

    const isDeepCopied = original !== copy &&
    original.address !== copy.address &&
    original.hobbies !== copy.hobbies &&
    original.hobbies[2] !== copy.hobbies[2];
    alert(isDeepCopied === true ? "Скопирован полностью" : "Неправильно скопирован");
    
    copy.name = "Пётр";
    copy.address.street = "Тверская";
    copy.hobbies[0] = "музыка";
    copy.hobbies[2][0] = "го";
    alert(
    `Оригинал:\n${JSON.stringify(original, null, 0)}
    Копия (изменённая):\n${JSON.stringify(copy, null, 0)}`
    );
}
