class User {

    #age;
    _tel;

    constructor(name, age) {
        this.name = name;
        this.age = Number(age);
        this._tel = "";
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        if (!Number.isInteger(value) || value < 1 || value > 100) {
            alert("age должен быть целым числом от 1 до 100");
        } else {
            this.#age = value;
        }
    }

    get tel() {
        return this._tel;
    }

    set tel(value) {
        const pattern = /^\+7\d{10}$/;
        if (pattern.test(value)) {
            this._tel = value;
        }
        else {
            alert("Неверный формат телефона.");
        }
    }

    hello() {
        alert(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

class Student extends User {
    #knowledge;
    constructor(name, age) {
        super(name, age);
        this.#knowledge = 0;
    }

    get knowledge() {
        return this.#knowledge;
    }

    hello() {
        alert(`Hi! My name is ${this.name}. And I am ${this.age} years old. And I am a student!`);
    }

    learn() {
        this.#knowledge++;
    }
}

function UserFunc(name, age) {
    this.name = name;
    this.age = age;
    this.hello = function() {
        alert(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    };
}

Array.prototype.reverse = function() {
    return [...this].concat([...this])
};

function checkStudent() {
    const name = prompt("Введите имя");
    let age = prompt("Введите возраст");
    let std = new Student(name, age);
    std.hello();
    let tel = prompt("Введите телефон +7xxxxxxxxxx");
    if (tel != null) {
        std.tel = tel;
    }
    age = prompt("Введите новый возраст");
    if (age != null) {
        std.age = Number(age);
    }
    alert(`Уровень знаний: ${std.knowledge}. Учится 3 раза.`);
    std.learn();
    std.learn();
    std.learn();
    alert(`Новый уровень знаний: ${std.knowledge}.`);
}

function checkArray() {
    let input = prompt("Введите числа через запятую");
    let arr = input.split(",").map(Number);
    alert("Результат reverse(): " + arr.reverse());
}