export class CaffeineStorage {
    private readonly _drink: string
    private readonly _caffeine: number
    private readonly _timestamp: Date

    constructor(drink: string, caffeine: number, timestamp: Date = new Date()) {
        this._drink = drink;
        this._caffeine = caffeine;
        this._timestamp = timestamp;
    }

    get drink(): string {
        return this._drink;
    }

    get caffeine(): number {
        return this._caffeine;
    }

    get timestamp(): Date {
        return this._timestamp;
    }
}
