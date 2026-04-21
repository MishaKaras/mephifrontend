// Adapter
class FahrenheitSensor {
    getTemperature(): number {
        return 98.6; 
    }
}

interface CelsiusSensor {
    getCelsius(): number;
}

class TemperatureAdapter implements CelsiusSensor {
    private sensor: FahrenheitSensor;

    constructor(sensor: FahrenheitSensor) {
        this.sensor = sensor;
    }

    getCelsius(): number {
        return (this.sensor.getTemperature() - 32) * (5 / 9);
    }
}

const sensor = new FahrenheitSensor();
const adapter = new TemperatureAdapter(sensor);
console.log(adapter.getCelsius());

// Strategy
interface SortStrategy {
    sort(data: number[]): number[];
}

class AscendingSort implements SortStrategy {
    sort(data: number[]): number[] {
        return [...data].sort((a, b) => a - b);
    }
}

class DescendingSort implements SortStrategy {
    sort(data: number[]): number[] {
        return [...data].sort((a, b) => b - a);
    }
}

class DataProcessor {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  process(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

const processor = new DataProcessor(new AscendingSort());
console.log(processor.process([3, 1, 4, 1, 5]));
processor.setStrategy(new DescendingSort());
console.log(processor.process([3, 1, 4, 1, 5])); 

// Observer
interface Observer {
    update(event: string): void;
}

class EventEmitter {
    private observers: Observer[] = [];

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    private notify(event: string): void {
        for (const observer of this.observers) {
        observer.update(event);
        }
    }

    triggerEvent(event: string): void {
        console.log(`[Subject] Событие: ${event}`);
        this.notify(event);
    }
}

class Logger implements Observer {
    update(event: string): void {
        console.log(`[Logger] Получено: ${event}`);
    }
}

class Auditor implements Observer {
    update(event: string): void {
        console.log(`[Auditor] Аудит события: ${event}`);
    }
}


const emitter = new EventEmitter();
const logger = new Logger();
const auditor = new Auditor();

emitter.attach(logger);
emitter.attach(auditor);
emitter.triggerEvent("user_login");

emitter.detach(auditor);
emitter.triggerEvent("user_logout");