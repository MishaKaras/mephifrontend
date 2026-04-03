function task2() {
    const months = [
    "Январь", "Февраль", "Март", "Апрель",
    "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const input = prompt("Введите номер месяца (1-12):");

    if (input === null) return;

    const monthN = Number(input);

    if (monthN >= 1 && monthN <= 12) {
        alert(months[monthN - 1]);
    } else {
        alert("Некорректный номер месяца");
    }
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function task3() {
    const input = prompt("Введите количество простых чисел:");
    if (input === null) return;
    const n = Number(input);
    if (n > 0) {
        const primes = [];
        let i = 2;
        while (primes.length < n) {
            if (isPrime(i)) primes.push(i);
            i++;
        }
        alert(primes.join(" "));
    } else {
        alert("Некорректное число");
    }
}

function task4() {
    const Counter = {
        count: 0,
        add(value) { this.count += value; },
        sub(value) { this.count -= value; }
    };

    while (true) {
        const action = prompt(
            `Текущий count: ${Counter.count}
            Введите операцию:
            +число (например: +5)
            -число (например: -3)
            или нажмите Отмена для завершения`
        );

        if (action === null) break;
        if (action === "") continue;

        const operator = action[0];
        const value = Number(action.slice(1));

        if (isNaN(value)) {
            alert("Некорректный ввод. Попробуйте ещё раз.");
            continue;
        }

        if (operator === "+") {
            Counter.add(value);
        } else if (operator === "-") {
            Counter.sub(value);
        } else {
            alert("Некорректный ввод. Попробуйте ещё раз.");
            continue;
        }
    }
    alert("Результат: " + Counter.count);
}

function task5() {
    const input = prompt("Введите слова через запятую:");
    const result = input.split(",").join(".");
    alert(result);
}

function task6() {
    const input = prompt("Введите строку:");
    if (input === "" || input === null) return;
    const lower = input.toLowerCase();
    const reversed = lower.split("").reverse().join("");
    alert(lower === reversed ? "Да" : "Нет");
}
