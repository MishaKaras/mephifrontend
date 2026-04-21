"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Adapter
class FahrenheitSensor {
    getTemperature() {
        return 98.6;
    }
}
class TemperatureAdapter {
    sensor;
    constructor(sensor) {
        this.sensor = sensor;
    }
    getCelsius() {
        return (this.sensor.getTemperature() - 32) * (5 / 9);
    }
}
const sensor = new FahrenheitSensor();
const adapter = new TemperatureAdapter(sensor);
console.log(adapter.getCelsius());
class AscendingSort {
    sort(data) {
        return [...data].sort((a, b) => a - b);
    }
}
class DescendingSort {
    sort(data) {
        return [...data].sort((a, b) => b - a);
    }
}
class DataProcessor {
    strategy;
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    process(data) {
        return this.strategy.sort(data);
    }
}
const processor = new DataProcessor(new AscendingSort());
console.log(processor.process([3, 1, 4, 1, 5]));
processor.setStrategy(new DescendingSort());
console.log(processor.process([3, 1, 4, 1, 5]));
class EventEmitter {
    observers = [];
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }
    notify(event) {
        for (const observer of this.observers) {
            observer.update(event);
        }
    }
    triggerEvent(event) {
        console.log(`[Subject] Событие: ${event}`);
        this.notify(event);
    }
}
class Logger {
    update(event) {
        console.log(`[Logger] Получено: ${event}`);
    }
}
class Auditor {
    update(event) {
        console.log(`[Auditor] Аудит события: ${event}`);
    }
}
// Пример
const emitter = new EventEmitter();
const logger = new Logger();
const auditor = new Auditor();
emitter.attach(logger);
emitter.attach(auditor);
emitter.triggerEvent("user_login");
// [Subject] Событие: user_login
// [Logger] Получено: user_login
// [Auditor] Аудит события: user_login
emitter.detach(auditor);
emitter.triggerEvent("user_logout");
// [Logger] Получено: user_logout (auditor отписан)
//# sourceMappingURL=task6.js.map