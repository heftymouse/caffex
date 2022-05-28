export type CaffeineStorage = {
    drink: string;
    caffeine: number;
    timestamp: Date;
}

const THIRTY_SIX_HOURS: number = 129600000
const TWENTY_FOUR_HOURS: number = 86400000
const MINUTE_COMMON_RATIO: number = 0.9976921765
const HOUR_COMMON_RATIO: number = 0.8714786601

export function clearOldData(data: CaffeineStorage[]): CaffeineStorage[] {
    return clearData(data, THIRTY_SIX_HOURS);
}

export function clearData(data: CaffeineStorage[], olderThanMs: number): CaffeineStorage[] {
    const ms: number = new Date().getUTCMilliseconds()
    return data.filter((value) => ms - value.timestamp.getUTCMilliseconds() <= olderThanMs);
}

export function getLast24HoursTotalCaffeine(data: CaffeineStorage[]): number {
    return clearData(data, TWENTY_FOUR_HOURS).reduce((total, datum) => datum.caffeine + total, 0);
}

export function getCaffeineAtAll(data: CaffeineStorage[], at: Date): number {
    return data.reduce((total, datum) => getCaffeineAt(datum, at), 0);
}

export function getCaffeineAt(datum: CaffeineStorage, at: Date): number {
    const diff = at.getUTCMilliseconds() - datum.timestamp.getUTCMilliseconds();
    const diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    const caffeine = datum.caffeine * Math.pow(HOUR_COMMON_RATIO, diffHrs) * Math.pow(MINUTE_COMMON_RATIO, diffMins);
    if (caffeine < 3) {
        return 0;
    }
}
